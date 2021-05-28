import requests
import json

cmd = 'example'

if cmd == 'dog':
    response = requests.request('GET', 'https://dog.ceo/api/breeds/image/random')
    dog = json.loads(response.text)['message']
    
    print(dog)
if cmd == 'whois':
    name = 'example'
    response = requests.request('GET', 'https://api.genderize.io/?name='+name.capitalize())
    gender = json.loads(response.text)['gender']
    response = requests.request('GET', 'https://api.nationalize.io/?name='+name.capitalize())
    country = json.loads(response.text)['country'][0]['country_id']
    
    print(name.capitalize()+' would probably be a person of '+gender+' gender from/in '+country)
if cmd == 'yoda':
    text = 'example'
    response = requests.request('GET', 'https://api.funtranslations.com/translate/yoda.json?text='+text)
    yodaspeak = json.loads(response.text)['contents']['translated']
    
    print(yodaspeak)
