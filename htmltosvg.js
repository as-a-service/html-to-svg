import puppeteer from 'puppeteer';

let browser;
let page;

async function htmltosvg (req, res) {
    const url = req.query.url;
      if (!url) {
      return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>');
    }

    if(!browser) {
        browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
    }
    if(!page) {
        page = await browser.newPage();
    }

    await page.goto(url);
    const pdf = await page.pdf({ format: 'A4' });

    res.set('Content-Type', 'application/pdf');
    res.send(pdf);
  };

export {htmltosvg};
  