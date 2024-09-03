# Equity_Short_Interest_Downloader

# What it can do ::
This code will extract the updated equity Short Interests from  "https://otce.finra.org" and structure the response for desired output.

# preRequesties::
1. node.js if u dont had node.js installed in your machine download it from here ("https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi")
2. globally installed pm2 package  (run this cmd in windows cmd prompt "npm i -g pm2" to install pm2 package globally)
3. chrome browser.

# initial setup ::
1. delete "cached_date.json" in cache folder 
2. run "npm i"

# to run code manually after initial setup ::
1. "npm run start" to run code on that instant manually on node env
2. "npm run scheduler" to run cronjob manually on node env

# Note ::
1. on first run it will gets the response from the site and downloads it. after first run it will only grab the response and download it, if the data is updated on thier site [looks for date change at the date link/]
2. to re-fecth equity short interests after first run delete the "cached_date.json" in cache folder "run the code again".
3. change the download path and chrome path if needed in .env file.
4. change run time for cronjobs in /scheduler.js in /src if needed.

# running code on background::
$ this project is initialized with cron-jobs which is config to run on every month on 2nd, 15th, 28th, 30th date at 8AM and 8PM local time(time avail in ur machine)
1. to run this code on background open the folder directory "Equity_short_interest_Downloader" in file explorer.
2. once ur inside the "Equity_short_interest_Downloader" folder click the file path box shows on top of the window in file explorer. and type "cmd" click enter.
3. after the windows cmd prompt appears enter this code 'pm2 start src/scheduler.js --name "scheduler"' and "pm2 startup" it will starts the background process forever it will automatically awakes on every time when windows bootups
4. to check status "pm2 status"
5. to get logs for this code "pm2 logs scheduler"
6. to stop back ground process for this code "pm2 stop scheduler"
7. for more info on pm2 click this link "https://pm2.keymetrics.io/docs/usage/quick-start/" 
