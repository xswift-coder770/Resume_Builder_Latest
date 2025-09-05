const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const ejs = require("ejs");
const User = require("../models/User");

const router = express.Router();

router.post("/download/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { colorScheme, fontFamily, fontSize, cardStyle } = req.body;

    // Fetch user from DB
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).send("User not found");

    const __dirname = path.resolve();

    // ✅ Use values from DB if not provided in request body
    const selectedColor = colorScheme || user.selectedTheme || "purple";
    const selectedFont = fontFamily || user.fontFamily || "font-sans";
    const selectedFontSize = fontSize || user.fontSize || "text-base";
    const selectedCardStyle = cardStyle || user.cardStyle || "rounded-xl shadow-lg";

    // Render EJS with user + styles
    const html = await ejs.renderFile(
      path.join(__dirname, "views", "resume.ejs"),
      {
        user,
        colorScheme: selectedColor,
        fontFamily: selectedFont,
        fontSize: selectedFontSize,
        cardStyle: selectedCardStyle,
      }
    );

    // Generate PDF with Puppeteer
    const browser = await puppeteer.launch({
      headless: "new", // newer puppeteer versions
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${user.name || "resume"}.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});

module.exports = router;
