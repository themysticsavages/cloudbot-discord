import requests
import json
import sys

user = sys.argv[1]
res = requests.request('GET', 'https://api.scratch.mit.edu/users/'+user+'/')
JSON = json.loads(res.text)
results = []

join = str(JSON['history']['joined']).split('T', 1)[0]
image = str(JSON['profile']['images']['50x50'])
stats = str(JSON['profile']['bio']).replace('\n\n', '')

results.append(join)
results.append(image)
results.append(stats)

results = str(results).replace('[', '').replace(']', '').replace("'", '').rstrip('\n')

print(results)
sys.stdout.flush()