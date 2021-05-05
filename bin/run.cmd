@echo off

echo Replaces text in bot.js and runs it. Continue?
pause

cls

cd etc
py replace.py

cls

pause
cls

cd ..
node bot.js
