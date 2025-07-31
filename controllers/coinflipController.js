import asyncHandler from "express-async-handler";

export const getCoinflipPage = asyncHandler(async (req, res) => {
  res.render("pages/coinflip", {
    siteTitle: "Casino App",
    pageTitle: "Coinflip Page",
    user: req.session.user || null, // add this line

  });
});
