import requests
import json
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))

with open('../../config.json', 'r') as fh:
    keys = json.loads(fh.read())
    class auth:
        api_key = keys['api']['godaddy']['KEY']
        secret_key = keys['api']['godaddy']['secret_key']

headers = {"Authorization": "sso-key {}:{}".format(auth.api_key, auth.secret_key)}
url = "https://api.ote-godaddy.com/v1/domains/available"
res = requests.get(url, params={'domain':sys.argv[1]}, headers=headers).text

if '403' in res.rstrip():
    print("`Failed to get stats for that domain. Maybe you don't need the protocol.`")
else:
    if json.loads(res.rstrip())['available'] == False:
        print("`That domain is not availble.`")
    else:
        print("`That domain is indeed availible!`")
