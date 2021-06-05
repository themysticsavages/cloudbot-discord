import requests as rq
import json as JSON
import sys

res = JSON.loads(rq.request('GET', 'https://api.imgflip.com/get_memes').text)
obj = []
i = 0

while not i == 20:
    obj.append(res['data']['memes'][i]['name']+ ' : ' +res['data']['memes'][i]['id'])
    i += 1

print(str(obj).replace('[', '').replace(']', '').replace("'", ''))
