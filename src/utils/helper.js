'use strict';
const dayjs = require('../dao/day');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const util = {
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  saveDate: (date) => {
    const filePath = path.join(__dirname, '../../cache/cached_date.json');
    fs.writeFileSync(filePath, JSON.stringify({ date }));
  },
  getPrevDate: () => {
    const defaultDate = '01/01/1990';
    const filePath = path.join(__dirname, '../../cache', 'cached_date.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      return dayjs(JSON.parse(data).date, 'MM/DD/YYYY');
    }
    return dayjs(defaultDate, 'DD-MM-YYYY');
  },
  mapTextToCsv: (text, day) => {
    const parsedData = Papa.parse(text, {
      delimiter: '|',
      header: true,
      skipEmptyLines: true
    });
    const reMappedData = parsedData.data.map((row) => {
      return {
        issueSymbolIdentifier: row.securitiesInformationProcessorSymbolIdentifier,
        settlementDate: day,
        issueName: row.issueName,
        marketCategoryCode: 'U',
        marketCategoryDescription: row.marketClassCode === 'OTC' ? 'Other OTC' : row.marketClassCode,
        currentShortShareNumber: row.currentShortPositionQuantity,
        previousShortShareNumber: row.previousShortPositionQuantity,
        changePercent: row.changePercent,
        percentageChangefromPreviousShort: row.changePreviousNumber,
        averageShortShareNumber: row.averageDailyVolumeQuantity,
        daysToCoverNumber: row.daysToCoverQuantity
      };
    });
    const data = Papa.unparse(reMappedData);
    return data;
  }
};
module.exports = util;
