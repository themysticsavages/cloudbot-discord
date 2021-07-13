from bs4 import BeautifulSoup
import requests
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))
comicdate = sys.argv[1].split('.')

r = requests.get('https://ermel.org/garfield.php?day={}&month={}&year={}'.format(comicdate[0], comicdate[1], comicdate[2]))
soup = BeautifulSoup(r.text, 'html.parser')
img = soup.findAll('img')[0]

r = requests.get(img['src'], stream=True)
soup = BeautifulSoup(r.text, 'html.parser')

if r.status_code == 200:
    with open('comic.png', 'wb') as f:
        for chunk in r.iter_content(1024):
            f.write(chunk)
else:
    print('That comic was not found! Did you use a correct date with the DD-MM-YYYY format?')