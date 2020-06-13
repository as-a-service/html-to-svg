import puppeteer from 'puppeteer';
import * as child from 'child_process';
import {readFile} from 'fs/promises'

let browser;
let page;

const inputPDFFilename = 'input.pdf';
const outputSVGFilename = 'page.svg';

async function htmltosvg (req, res) {
    const url = req.query.url;
      if (!url) {
      return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://steren.fr">?url=https://steren.fr</a>');
    }

    const width = req.query.width ? parseInt(req.query.width, 10) : 1280;
    const height = req.query.height ? parseInt(req.query.height, 10) : 800;

    if(!browser) {
        browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
    }
    if(!page) {
        page = await browser.newPage();
    }

    console.log(`Loading (width: ${width}, height: ${height}): ${url}`);
    await page.goto(url);
    // https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagepdfoptions
    await page.emulateMedia('screen');
    let printParams = {
        path: inputPDFFilename,
        width,
        printBackground: true
    };
    if(height) {
        printParams.height = height;
    }
    await page.pdf(printParams);

    // https://inkscape.org/doc/inkscape-man.html
    // When available (Inkscape 1.0), shuld we use --pdf-poppler for better fidelity? text would be transformed to path  https://gitlab.com/inkscape/inkscape/-/issues/263
    child.exec(`inkscape --without-gui --file ${inputPDFFilename} --export-plain-svg ${outputSVGFilename}`, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500)
            return res.send(`error: ${error.message}`);
        }
        const outputSVG = await readFile(outputSVGFilename);
        res.set('Content-Type', 'image/svg+xml');
        res.send(outputSVG);
    });


  };

export {htmltosvg};
  