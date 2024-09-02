'use strict';

require('dotenv').config();
const { esi } = require('../services/equity_short_interest/esi.js');
const dayjs = require('../dao/day.js');

const date = dayjs.utc(new Date()).format('YYYYMMDD');

(async () => {
  try {
    await esi(date);
  } catch (err) {
    console.error(`local handler failed with ${err.stack}`);
  }
})();
