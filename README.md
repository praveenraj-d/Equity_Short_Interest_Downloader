# Equity_Short_Interest_Downloader

# What it can do ::
This code will extract the updated equity Short Interests from  "https://otce.finra.org" and structure the response for desired output.

# preRequesties::
1. node.js if u dont had node.js installed in your machine download it from here ("https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi")
2. globally installed pm2 package  (run this cmd in windows cmd prompt "npm i -g pm2" to install pm2 package globally)
3. chrome browser.

# initial setup::
1. delete "cached_date.json" in cache folder 
2. run "npm i"

# after initial setup / to run code ::
1. "npm run start"

# Note::
1. on first run it will gets the response from the site and downloads it. after first run it will only grab the response and download it, if the data is updated on thier site [which is the date link]
2. to re-fecth equity short interests after first run delete the "cached_date.json" in cache folder "run the code again".
3. change the download path and chrome path if needed in .env file.

# running code on background::
$ this project is initialized with cron-jobs which is config to run on every month on 15th, 28th, 2nd, 30th date at 8AM and 8PM local time(/time avail in ur machine)
1. to run this code on background open the folder directory "Equity_short_interest_Downloader" in file explorer.
2. once ur in the "Equity_short_interest_Downloader" click the file path shows above. and type "cmd" click enter.
3. after the windows cmd prompt appears enter this code "pm2 start npm --name "scheduler" -- run scheduler" it will starts the background process forever it will automatically awakes on every time when windows bootups
4. to check status "pm2 status"
5. to get logs "pm2 logs scheduler"
6. to stop back ground process "pm2 stop scheduler"
7. to restart background process "pm2 restart scheduler" 
