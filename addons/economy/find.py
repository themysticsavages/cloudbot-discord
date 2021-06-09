import os.path
import json
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))
discord_username = sys.argv[1]

if os.path.isfile(f'./database/{discord_username}.json') == True:
    with open(f'./database/{discord_username}.json', 'r') as fh:
        data = json.loads(fh.read())
    fh.close()
    print(f'{discord_username}: Name: '+data['name']+', Job: '+data['job']+', Money: $'+str(data['money'])+', Items: '+str(data['items']).rsplit(',', 1)[0]+'')
    sys.stdout.flush()
else:
    print('That user does not exist!')
    sys.stdout.flush()