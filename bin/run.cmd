@echo off
echo Replaces text in bot.js and runs it. Continue?

pause
cd ..

cd etc
cls

py replace.py
pause

cls
cd ..

node bot
