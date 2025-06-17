import bcrypt from "bcrypt";
import * as userModel from "../models/usersModel.js";
import { validationResult } from "express-validator";

// Get Registration Page
export const getRegistrationPage = (req, res) => {
  res.render("pages/Registration", {
    siteTitle: "Casino App",
    pageTitle: "Registration Page",
  });
};

// Handle Registration
export const handleRegistration = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate form inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // Check if username or email already exists
  const existingUser = await userModel.findUserByEmailOrUsername(email, username);
  if (existingUser) {
    return res.status(400).json({ success: false, error: "Username or email already exists." });
  }

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await userModel.createUser(username, email, hashedPassword);
    console.log("New user registered:", { username, email });

    // Redirect to login page after successful registration
    res.json({ success: true });
  } catch (err) {
    console.error("Hashing error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get Login Page
export const getLoginPage = (req, res) => {
  res.render("pages/Login", {
    siteTitle: "Casino App",
    pageTitle: "Login Page",
    user: req.session.user || null
  });
};

// Handle Login
export const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findUserByEmailOrUsername(null, username);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid username or password.",
        field: "username", // Indicate the field causing the error
      });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        error: "Invalid username or password.",
        field: "password", // Indicate the field causing the error
      });
    }

    // Set user in session
    req.session.user = user; // Store the user in session
    console.log(`User ${username} successfully signed in at ${new Date().toLocaleString()}`);

    res.json({ success: true });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
