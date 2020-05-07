import puppeteer from 'puppeteer';
import * as child from 'child_process';
import {writeFile, readFile} from 'fs/promises'

let browser;
let page;

const inputPDFFilename = 'input.pdf';
const outputSVGFilename = 'page.svg';

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
    // https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagepdfoptions
    const pdf = await page.pdf({ format: 'A4' });

    await writeFile(inputPDFFilename, pdf);

    child.exec(`inkscape --file ${inputPDFFilename} --export-plain-svg ${outputSVGFilename}`, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500)
            return res.send(`error: ${error.message}`);
        }
        console.log(`stdout: ${stdout}`);
        const outputSVG = await readFile(outputSVGFilename);
        res.set('Content-Type', 'image/svg+xml');
        res.send(outputSVG);
    });


  };

export {htmltosvg};
  