'use strict';

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const timezone = require('dayjs/plugin/timezone');

// dayjs.extend(isBefore);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

module.exports = dayjs;
