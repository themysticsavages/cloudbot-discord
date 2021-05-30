import urllib.request
import sys
import re

html = urllib.request.urlopen('https://www.youtube.com/results?search_query='+sys.argv[1])
video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())

if not video_ids:
    print('`Failed to find '+sys.argv[1]+'. Why not go back in time and watch some cat vids?`')
    sys.stdout.flush()
else:
    print(str(video_ids).replace('[', '').replace(']', '').replace("'", '').replace(' ', ''))
    sys.stdout.flush()