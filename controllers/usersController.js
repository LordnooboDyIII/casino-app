import asyncHandler from "express-async-handler";
import * as userModel from "../models/usersModel.js";

export const getLoginPage = asyncHandler(async (req, res) => {
  res.render("pages/Login", {
    siteTitle: "Casino App",
    pageTitle: "Login Page",
  });
});

export const getRegistrationPage = asyncHandler(async (req, res) => {
  res.render("pages/Registration", {
    siteTitle: "Casino App",
    pageTitle: "Registration Page",
  });
});

export const handleRegistration = asyncHandler(async (req, res) => {
  
});


export const handleLogin = asyncHandler(async (req, res) => {
  
});