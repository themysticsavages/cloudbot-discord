#!/bin/bash

function pause() {
 read -p "$*"
}

echo 'This will replace the text in node.js and run it.'
pause 'Continue?' 

cd ..
cd setup

clear
python3 replace.py

pause 'Continue?'
cd ..

clear
node bot
