# Equity_Short_Interest_Downloader

What it can do ::
This code will extract the updated equity Short Interests from  "https://otce.finra.org" and structure the response for desired output.

initial setup::
# delete "cached_date.json" in cache folder 
# run "npm i"

after initial setup / to run code ::
# "npm run start"

Note::
# on first run it will gets the response from the site and downloads it. after first run it will only grab the response and download it, if the data is updated on thier site [which is the date link]
# to re-fecth equity short interests after first run delete the "cached_date.json" in cache folder.
# change the download path if need in .env file.


