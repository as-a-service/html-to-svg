const puppeteer = require('puppeteer');

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.screenshot = async (req, res) => {
    const url = req.query.url;
  
    if (!url) {
      return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>');
    }
  
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    const imageBuffer = await page.screenshot();
    browser.close();
  
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  };
  