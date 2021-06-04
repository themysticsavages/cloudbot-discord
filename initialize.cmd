@echo off

echo ----------------------------
echo 1. Download bot.js
echo 2. Install required packages
echo 3. Run bot.js
echo ----------------------------

set /p opt=!

if %opt% == 1 goto download
if %opt% == 2 goto install
if %opt% == 3 goto run

:download
curl --output bot.new https://raw.githubusercontent.com/themysticsavages/cloudbot-discord/main/bot.js
exit

:install
py -m pip install -r requirements.txt
npm i
exit

:run
cls
node bot
pause