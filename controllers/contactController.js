import asyncHandler from "express-async-handler";

export const getContactPage = asyncHandler(async (req, res) => {
    res.render("pages/contact", {
      siteTitle: "Casino App",
      pageTitle: "Contact Page",
    });
});