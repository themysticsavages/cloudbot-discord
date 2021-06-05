import requests as rq
import json as JSON
import sys
import os

local = '\\'.join(__file__.split('\\')[0:-1])
os.chdir(local)

with open('../.././config.json') as fh:
    json = JSON.loads(fh.read())

try:
    print(JSON.loads(rq.request('POST','https://api.imgflip.com/caption_image',params={

            'username':json['api']['imgflip']['USERNAME'],
            'password':json['api']['imgflip']['PASSWORD'],
            'template_id':sys.argv[1],
            'text0':sys.argv[2],
            'text1':sys.argv[3]

    }).text)['data']['url'])
    sys.stdout.flush()
except Exception:
    print('`Failed to generate the meme. Check if you included a proper ID or top **and** bottom text.`')
    sys.stdout.flush()
