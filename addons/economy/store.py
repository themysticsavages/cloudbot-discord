import os.path
import json
import sys
import os

os.chdir('\\'.join(__file__.split('\\')[0:-1]))

discord_username = sys.argv[1]
item = sys.argv[2]

with open(f'./database/store.json', 'r') as fh:
    itemslist = json.loads(fh.read())
fh.close()

if os.path.isfile(f'./database/{discord_username}.json') == True:
    with open(f'./database/{discord_username}.json', 'r') as fh:
        data = json.loads(fh.read())
    fh.close()

    i = 1
    for items in itemslist:
        if item in str(itemslist[str(i)]):
            obj = str(itemslist[str(i)])
            break
        else:
            i += 1
    
    try:
        if data['money'] >= int(obj.split(',')[1]):
            newmoney = data['money'] - int(obj.split(',')[1])
            print('Sucessfully purchased item',item+f'. You now have ${newmoney}')

            data['money'] -= int(obj.split(',')[1])
            data['items'] += item+', '

            with open(f'./database/{discord_username}.json', 'w') as fh:
                json.dump(data, fh)
        else:
            print('You need $'+str(int(obj.split(',')[1]) - data['money'])+' more to buy this item!')
    except NameError:
        print('This item does not exist! Please use the following:\n  - Gold Trophy\n  - Rock Concert Ticket\n  - Video Game')
else:
    print('That user does not exist! Please create one with `d?shop/add | [name] | [job]`')