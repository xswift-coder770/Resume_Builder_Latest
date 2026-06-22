 

//finall nice 

const express = require("express");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const path = require("path");
const ejs = require("ejs");
const User = require("../models/User");

const router = express.Router();

router.post("/download/:id", async (req, res) => {
  let browser = null;
  try {
    const userId = req.params.id;
    const { colorScheme, fontFamily, fontSize, cardStyle } = req.body;

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).send("User not found");

    const __dirname = path.resolve();

    const selectedColor = colorScheme || user.selectedTheme || "purple";
    const selectedFont = fontFamily || user.fontFamily || "font-sans";
    const selectedFontSize = fontSize || user.fontSize || "text-base";
    const selectedCardStyle = cardStyle || user.cardStyle || "rounded-xl shadow-lg";

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

    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process",
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${user.name || "resume"}.pdf"`,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF generation error:", error.stack || error);
    res.status(500).json({ error: "Error generating PDF", details: error.message });
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
});

module.exports = router;
