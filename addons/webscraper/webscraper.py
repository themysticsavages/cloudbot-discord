from bs4 import BeautifulSoup
import requests, sys

page = requests.get("https://bing.com/search?q="+sys.argv[1])
soup = BeautifulSoup(page.content, 'html.parser')
list(soup.children)

content = soup.find_all('p')[0].get_text()

print(content)
sys.stdout.flush()
