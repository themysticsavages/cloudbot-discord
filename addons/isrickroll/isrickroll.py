import requests
import json
import sys
import re

link = sys.argv[1]
session = requests.Session()

try:
    if 'youtube.com' not in link:
        site = session.head(link, allow_redirects=True)
        url = site.url
    else:
        url = sys.argv[1]

    res = requests.get('https://www.youtube.com/oembed?url={}&format=json'.format(url)).text
    title = str(json.loads(res)['title'])
    
    if re.search('Rickroll', title) or re.search('Never Gonna Give You Up', title) or re.search('Rick roll', title):
        print('This link is a rickroll!')
    else:
        print('This link is safe, trust me.')
    
except Exception:
    print('Failed to check this link.')