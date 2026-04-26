const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const catchAsync = require("../middleware/catchAsync");
const AppError = require("../utils/AppError");

// Helper: Sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ------------------------
// Signup Controller
// ------------------------
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Please provide name, email, and password", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = signToken(user._id);

  res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

  res.status(201).json({
    status: "success",
    token,
    data: { user: { id: user._id, name: user.name, email: user.email } },
  });
});

// ------------------------
// Login Controller
// ------------------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

   const user = await User.findOne({ email }).select('+password');

   console.log(user)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    token,
    data: { user: { id: user._id, name: user.name, email: user.email } },
  });
});

// ------------------------
// Google OAuth Controller
// ------------------------
exports.googleLogin = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Google authentication failed", 401));
  }

  const user = req.user;

  // Sign JWT
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    token,
    data: { user: { id: user._id, name: user.name, email: user.email } },
  });
});