#!/bin/bash

function pause() {
 read -p "$*"
}

echo 'This will replace the text in node.js and run it.'
pause 'Continue?' 

cd ..
cd setup

clear
py replace.py

pause 'Continue?'
cd ..

clear
node bot
