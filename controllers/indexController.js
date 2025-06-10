import asyncHandler from "express-async-handler";

export const getWelcomePage = asyncHandler(async (req, res) => {
  res.render("pages/welcome", {
    siteTitle: "Casino App",
    pageTitle: "Welcome Page",
  });
});

export const getHomePage = asyncHandler(async (req, res) => {
  res.render("pages/home", {
    siteTitle: "Casino App",
    pageTitle: "Home Page",
  });
});
