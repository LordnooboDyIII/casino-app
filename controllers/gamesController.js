import asyncHandler from "express-async-handler";

export const getDiceGamePage = asyncHandler(async (req, res) => {
  res.render("pages/games/dices", {
    siteTitle: "Casino App",
    pageTitle: "Dice Game",
  });
});