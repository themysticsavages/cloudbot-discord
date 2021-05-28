import requests
import json
import sys
import os

local = '\\'.join(__file__.split('\\')[0:-1])
os.chdir(local)

with open('../.././config.json') as f:
  data = json.load(f)
f.close()

query = sys.argv[1]
key = data['api']['GIPHY_KEY']
url = 'https://api.giphy.com/v1/gifs/search?api_key='+key+'&q='+query+'&limit=1&offset=0&rating=g&lang=en'

res = requests.request('GET', url)
JSON = json.loads(res.text)['data'][0]['url']

print(JSON)
sys.stdout.flush()