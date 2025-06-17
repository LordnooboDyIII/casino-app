import * as userModel from "../models/usersModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

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
    res.redirect("/"); // Redirect here after successful registration
  } catch (err) {
    console.error("Hashing error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
