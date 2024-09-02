'use strict';

const { equityShortInterest } = require('../../../config/config.js');
const { delay, getPrevDate, saveDate, mapTextToCsv } = require('../../utils/helper.js');
const { writeFile } = require('../file_upload/writeFiles');
const { performScraping } = require('../../dao/chromium.js');
const dayjs = require('../../dao/day.js');

const esi = async (date) => {
  try {
    console.log('Downloading Equity_Short_Interests');
    const equity = equityShortInterest();
    let fileNum = 1;
    const { browser, page } = await performScraping(equity.url);
    try {
      page.on('response', async (response) => {
        const url = response.url();
        if (url.includes(equity.apiReqUrl)) {
          const resp = await response.text();
          const data = mapTextToCsv(resp, currDate.format('DD-MM-YYYY'));
          await writeFile(data, date, fileNum, '_-Equity_Short_Intrest_');
          fileNum++;
        }
      });
      await delay('2000');
      const activeLink = await page.locator('a.archive');
      const getCurrDate = await page.$eval('a.archive', (el) => el.innerText.trim());
      const currDate = dayjs(getCurrDate, 'MM/DD/YYYY');
      const prevDate = getPrevDate();
      if (!currDate.isSame(prevDate, 'day')) {
        console.log('New Update Avail For equityShortInterest');
        saveDate(getCurrDate);
        await activeLink.click();
        await delay('5000');
        console.log('Download Completed SuccessFully');
      } else {
        console.log('No Updates Avail For EquityShortInterest/ stopping downloading Process ');
      }
    } catch (err) {
      console.error('err while getting equtiy', err.message);
      throw err;
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error('err while processing esi', err.stack);
    throw err;
  }
};

module.exports = { esi };
