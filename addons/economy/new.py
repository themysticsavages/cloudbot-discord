import os.path
import json
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))

class UserData:
    discord_username = sys.argv[1]
    inapp_name = sys.argv[2]
    inapp_job = sys.argv[3]

template = {
    "name" : '"' + UserData.inapp_name + '"',
    "job" : '"' + UserData.inapp_job + '"',
    "money" : 0,
    "items" : ""
}

if os.path.exists(f'./database/{UserData.discord_username}.json') == False:
    with open(f'./database/{UserData.discord_username}.json', 'w') as fh:
        fh.write(json.dumps(template))
    fh.close()
    print(f'Sucessfully made new account under the name of {UserData.inapp_name}.')
    sys.stdout.flush()
else:
    print('That user exists! You can remove your current account with `c.shop/remove`.')
    sys.stdout.flush()
