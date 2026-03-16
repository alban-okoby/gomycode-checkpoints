require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const globalErrorHandler = require("./middleware/errorMiddleware");

require("./config/passport");

const app = express();


// =======================
// DATABASE CONNECTION
// =======================

mongoose.connect(process.env.DATABASE_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));


// =======================
// GLOBAL MIDDLEWARE
// =======================

app.use(express.json());

app.use(cookieParser());


// Security Headers
app.use(helmet());


// Prevent NoSQL injection
app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  next();
});


// =======================
// RATE LIMITING
// =======================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later."
});

app.use("/api/auth/login", loginLimiter);


// =======================
// PASSPORT
// =======================

app.use(passport.initialize());


// =======================
// ROUTES
// =======================

app.use("/api/auth", authRoutes);

app.use("/api", taskRoutes);


// =======================
// 404 HANDLER
// =======================

app.use((req, res, next) => {
  const AppError = require("./utils/AppError");

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


// =======================
// GLOBAL ERROR HANDLER
// =======================

app.use(globalErrorHandler);


// =======================
// SERVER
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});