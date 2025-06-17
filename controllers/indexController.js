import asyncHandler from "express-async-handler";

export const getWelcomePage = asyncHandler(async (req, res) => {
 res.render("pages/Home", {
  siteTitle: "Casino App",
  pageTitle: "Home Page",
  user: req.session.user || null
});

});

export const getHomePage = asyncHandler(async (req, res) => {
 res.render("pages/Home", {
  siteTitle: "Casino App",
  pageTitle: "Home Page",
  user: req.session.user || null
});

});
