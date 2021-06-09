import os.path
import random
import json
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))
discord_username = sys.argv[1]

coins = [8, 12, 10]
result = random.choice(coins)

if os.path.isfile(f'./database/{discord_username}.json') == True:
    with open(f'./database/{discord_username}.json', 'r') as fh:
        data = json.loads(fh.read())
    fh.close()
    data['money'] += result

    with open(f'./database/{discord_username}.json', 'w') as fh:
        json.dump(data, fh)
    fh.close()
    print(f'You were given {result} bucks!')
    sys.stdout.flush()
else:
    print('That user does not exist!')
    sys.stdout.flush()