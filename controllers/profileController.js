import asyncHandler from "express-async-handler";

export const getProfilePage = asyncHandler(async (req, res) => {
  res.render("pages/profile", {
    siteTitle: "Casino App",
    pageTitle: "Profile Page",
    user: req.session.user || null, // Pass user info if available
  });
});