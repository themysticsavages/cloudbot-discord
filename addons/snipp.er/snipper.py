import requests
import json
import sys
import os

local = '\\'.join(__file__.split('\\')[0:-1])
os.chdir(local)

with open('../../config.json') as fh:
    key = json.loads(fh.read())
key = key['api']['REBRAND_KEY']

if 'https://' or 'http://' in sys.argv[1]:
    url = sys.argv[1]
else:
    url = 'https://' + sys.argv[1]

linkRequest = {
  "destination": url
  , "domain": { "fullName": "rebrand.ly" }
}

requestHeaders = {
  "Content-type": "application/json",
  "apikey": key
}

r = requests.post("https://api.rebrandly.com/v1/links", 
    data = json.dumps(linkRequest),
    headers=requestHeaders)

if (r.status_code == requests.codes.ok):
    link = r.json()
    print(str(link["shortUrl"]).replace('/\n|\r/g', ''))
    sys.stdout.flush()
else:
    print("`Failed to shorten "+url+". Maybe it's not a correct URL?`")
    sys.stdout.flush()
