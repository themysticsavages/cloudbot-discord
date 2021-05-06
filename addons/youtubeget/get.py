# YouTubeGet addon for CloudBot. Get YouTube video URLs with a simple command (c.ytg video)
import urllib.request, re, sys, os

LOCAL = '\\'.join(__file__.split('\\')[0:-1])
os.chdir(LOCAL)

SEARCH = sys.argv[1]
FILTER = 1

LIMIT = 1
CONTENT = urllib.request.urlopen('https://www.youtube.com/results?search_query='+SEARCH)

HTML = CONTENT.read().decode()
ID = re.findall(r"watch\?v=(\S{11})", HTML)

TMP = open('TMP', 'w')
for X in ID:
    TMP.write('https://www.youtube.com/watch?v='+ID[FILTER])
    FILTER = FILTER + 1

    if FILTER > LIMIT:
        print('Finished')
        exit()
