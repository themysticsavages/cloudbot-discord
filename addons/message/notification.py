from PIL import Image, ImageFont, ImageDraw 
import shutil
import sys
import os

local = '\\'.join(__file__.split('\\')[0:-1])
os.chdir(local)

shutil.copy('reference.png', 'toast.png')
toast = Image.open('toast.png')

font1 = ImageFont.truetype('arial.ttf', 18)
font2 = ImageFont.truetype('arial.ttf', 15)

edit = ImageDraw.Draw(toast)

edit.text((35, 20), sys.argv[1], (255, 255, 255), font=font1)
edit.text((35, 40), sys.argv[2], (255, 255, 255), font=font2)

toast.save("toast.png")