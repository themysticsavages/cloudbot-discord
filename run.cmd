@echo off
echo This will replace the text in bot.js and run the file. Continue?
pause
cls
py replace.py
pause
cls
node bot.js
