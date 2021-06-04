@echo off

echo ----------------------------
echo 1. Download bot.js
echo 2. Install required packages
echo 3. Run bot.js
echo ----------------------------
echo.

set /p opt='> '

if %opt%==1 goto 1
if %opt%==2 goto 2
if %opt%==3 goto 3

:1
cls
curl --output bot.new.js https://raw.githubusercontent.com/themysticsavages/cloudbot-discord/main/bot.js
exit

:2
cls
npm i
py -m pip install -r requirements.txt

:3
cls
node bot.js
pause
