import asyncHandler from "express-async-handler";

export const getDiceGamePage = asyncHandler(async (req, res) => {
  res.render("pages/games/dices", {
    siteTitle: "Casino App",
    pageTitle: "Dice Game",
    user: req.session.user || null, // add this line
  });

});