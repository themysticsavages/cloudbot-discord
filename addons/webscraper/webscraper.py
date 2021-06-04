import requests
import bs4
import sys

text = sys.argv[1]

url = 'https://search.yahoo.com/search?p='+text+'&vm=r'
request_result = requests.get( url )
  
soup = bs4.BeautifulSoup(request_result.text,
                         "html.parser")

obj = []
heading_object=soup.find_all('p', class_ = 'fz-ms lh-1_43x') 
for info in heading_object:
    obj.append(info.getText())

try:
  print(obj[0])
  sys.stdout.flush()
except IndexError:
  print("`Failed to find "+text+". There may be a good chance you just typed gibberish.`")
  sys.stdout.flush()
