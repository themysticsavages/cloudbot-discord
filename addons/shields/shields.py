from reportlab.graphics import renderPDF, renderPM
from svglib.svglib import svg2rlg
import requests
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))
url = f'https://shields.io/badge/{sys.argv[1]}-{sys.argv[2]}-{sys.argv[3]}.svg'

with open('picture.svg', 'w') as fh:
    fh.write(requests.get(url).text)
fh.close()

drawing = svg2rlg("picture.svg")
renderPM.drawToFile(drawing, "file.png", fmt="PNG")

os.remove('picture.svg')