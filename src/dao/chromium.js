'use strict';
const path = require('path');
const fsp = require('fs').promises;
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

// Optional: If you'd like to use the legacy headless mode. "new" is the default.
chromium.setHeadlessMode = true;
// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false;
//paths
const cookiesFilePath = path.join(__dirname, '../../cache/cookies.json');
//cookie logics
const saveCookies = async (page) => {
  const cookies = await page.cookies();
  await fsp.writeFile(cookiesFilePath, JSON.stringify(cookies, null, 2));
};
const loadCookies = async (page) => {
  try {
    const cookiesString = await fsp.readFile(cookiesFilePath);
    const cookies = JSON.parse(cookiesString);
    if (cookies.length) {
      await page.setCookie(...cookies);
    }
  } catch (err) {
    console.log('No cookies found, starting with a fresh session.');
  }
};

//browser setup
const browserInstance = async () => {
  try {
    //   launch a headless browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROMIUM_PATH,
      headless: chromium.headless
    });
    const agent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'; // set user agent for non blocking of IP
    const page = await browser.newPage();
    await page.setUserAgent(agent);
    // Load cookies before navigating
    await loadCookies(page);
    // Save cookies after navigation
    page.on('load', async () => {
      await saveCookies(page);
    });
    return { browser, page, agent };
  } catch (error) {
    console.log('Error while running browser instance', error.message);
    throw error;
  }
};

//Api req logic
const invokeApi = async ({ url, method = 'GET', headers = {}, payload = {}, retries = 3, retryDelay = 1000 }) => {
  const { browser, page } = await browserInstance();
  try {
    const response = await page.evaluate(
      async (url, method, headers, payload) => {
        const options = {
          method,
          headers: headers || {},
          body: method === 'POST' ? JSON.stringify(payload) : undefined
        };
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      },
      url,
      method,
      headers,
      payload
    );
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying Api req... (${retries - 1})retry's left`);
      await delay(retryDelay);
      return invokeApi({ url, method, headers, payload, retries: retries - 1, retryDelay });
    } else {
      console.error('Error during API request', error.message);
      throw error;
    }
  } finally {
    await browser.close();
  }
};

// webPage handler
const performScraping = async (link) => {
  const { browser, page } = await browserInstance();
  try {
    console.log('loading page from headless browser: ', link);
    await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });
    return { browser, page };
  } catch (error) {
    console.error('Error during scraping operation', error.message);
    await browser.close();
    throw error;
  }
};

module.exports = { invokeApi, performScraping };
