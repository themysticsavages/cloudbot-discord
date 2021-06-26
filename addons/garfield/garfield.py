import requests
import os
import re

os.chdir('\\'.join(__file__.split('\\')[0:-1]))

res = requests.get('https://www.mezzacotta.net/garfield/')
num = re.findall(r'\d+', res.text)[28]

res = requests.get(f'https://www.mezzacotta.net/garfield/comics/{num}.png')
with open('comic.png', 'wb') as png:
    png.write(res.content)