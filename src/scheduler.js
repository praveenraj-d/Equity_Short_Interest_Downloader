const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');

const script = path.resolve(__dirname, './handlers/local.js');

function runLocalScript() {
  exec(`node ${script}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing local.js: ${err}`);
      return;
    }
    console.log(`Output: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
}

cron.schedule('0 8 2,15,28,30 * *', () => {
  console.log('Running local.js at 8 AM...');
  runLocalScript();
});

cron.schedule('0 20 2,15,28,30 * *', () => {
  console.log('Running local.js at 8 PM...');
  runLocalScript();
});
