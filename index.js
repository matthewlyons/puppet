const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/", async (req, res) => {
  console.log(req.headers);
  console.log(req.headers.host);
  let { html } = req.body;

  let browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.setContent(html);
  await page.emulateMediaType("screen");

  let pdf = await page.pdf({
    format: "letter",
  });

  await browser.close();
  process.exit;
  res.contentType("application/pdf");

  // optionally:
  res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");
  res.send(pdf);
});

module.exports = app;
