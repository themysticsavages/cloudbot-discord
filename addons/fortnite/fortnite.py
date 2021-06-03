import requests
import json as JSON
import sys

"""
This is a future addon for CloudBot.
It allows you to get the news in all Fortnite gamemodes,
and get the current map for Battle Royale.
I know Fortnite is dead. That's why I included it, to be funny.
"""

query = sys.argv[1]

if query == 'news/stw':
    res = JSON.loads(requests.request('GET', 'https://fortnite-api.com/v2/news/stw').text)
    res = res['data']['messages'][0]
    print(res['title'], '\n', res['body'], '\n', res['image'])
elif query == 'news/br':
    res = JSON.loads(requests.request('GET', 'https://fortnite-api.com/v2/news/br').text)
    res = res['data']['motds'][0]
    print(res['title'], '\n', res['body'], '\n', res['image'])
elif query == 'news/c':
    res = JSON.loads(requests.request('GET', 'https://fortnite-api.com/v2/news/creative').text)
    res = res['data']['motds'][0]
    print(res['title'], '\n', res['body'], '\n', res['image'])
elif query == 'map':
    res = JSON.loads(requests.request('GET', 'https://fortnite-api.com/v1/map').text)
    print(res['data']['images'][
        'pois'])
    
else:
    print('`Unknown command. Please use the following:\n    news/stw\n    news/br\n    news/c\n   map`')
