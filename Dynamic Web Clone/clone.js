const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Website to clone
const websiteUrl = 'https://account.venmo.com/';

async function cloneWebsite(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the viewport size bc puppeteer loves to resize stuff on its own
    await page.setViewport({ width: 1500, height: 700 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    const html = await page.content();

    const outputPath = path.join(__dirname, 'clonedVenmo.html');
    fs.writeFileSync(outputPath, html);
}

cloneWebsite(websiteUrl);
