# Simple text replacer for bot thing

file = 'bot.js'
token = input('Enter your token here: ')
f = open(file, 'r')

filedata = f.read()
f.close()
newdata = filedata.replace("bot_token", token)

f = open(file, 'w')
f.write(newdata)
print('Replaced text with token sucessfully.')

f.close()