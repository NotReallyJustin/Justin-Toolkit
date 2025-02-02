const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


async function cloneWebsite() {

    // Connect to an existing browser instance running on port 9222
    // Usually we Chrome for this
    const browser = await puppeteer.connect({
        browserURL: 'http://localhost:9222'
    });
    
    // Clone first website page
    const page = (await browser.pages())[0];

    // Set the viewport size to 1500x700 bc puppeter loves to shrunk things
    await page.setViewport({ width: 2000, height: 700 });

    const html = await page.content();

    const outputPath = path.join(__dirname, 'clonedVenmo2.html');
    fs.writeFileSync(outputPath, html);
}

cloneWebsite(websiteUrl);
