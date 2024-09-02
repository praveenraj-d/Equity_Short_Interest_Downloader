'use strict';

const fs = require('fs');
const path = require('path');

exports.writeFile = async (data, day, nos = '', filename) => {
  try {
    const filePath = path.join(__dirname, process.env.DOWNLOAD_DIR, `${nos}${filename}${day}.csv`);
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.log('error while writing file', error.message);
    throw error;
  }
};
