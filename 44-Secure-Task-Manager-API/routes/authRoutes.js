const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");

const router = express.Router();


// JWT Authentication
router.post("/signup", authController.signup);

router.post("/login", authController.login);


// Google OAuth Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  authController.googleLogin
);

module.exports = router;