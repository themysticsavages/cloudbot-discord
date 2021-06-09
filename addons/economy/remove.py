import os.path
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))
discord_username = sys.argv[1]

if os.path.exists(f'./database/{discord_username}.json') == True:
    os.remove(f'./database/{discord_username}.json')
    print(f"Sucessfully removed {discord_username}'s account.")
    sys.stdout.flush()
else:
    print('That user does not exist.')
    sys.stdout.flush()