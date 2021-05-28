<h1 align="center">
  <br>
  <b>CloudBot - a file server for Discord</b>
</h1>

<p align="center">
  <a href="https://codeload.github.com/themysticsavages/cloudbot-discord/zip/refs/heads/main">
  <img src="http://shields.io/badge/source--code-ZIP-blue?style=plastic">
    
  <a href="https://codeload.github.com/themysticsavages/cloudbot-discord/tar.gz/refs/heads/main">
  <img src="http://shields.io/badge/source--code-TARGZ-green?style=plastic">
  
  <a href="https://discord.com/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68612">
  <img src="https://img.shields.io/badge/%20-Put%20me%20in%20your%20server-blue?style=plastic">
  
  <a href="about:blank">
  <img src="https://img.shields.io/badge/channel-release-orange?style=plastic">
  
  <a href="https://github.com/themysticsavages/cloudbot-discord/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/license-mit-yellow?style=plastic">
  
  <a href="https://github.com/themysticsavages/cloudbot-discord/blob/main/setup/readme.md">
</p>

#

![running](https://github.com/ajskateboarder/stuff/blob/main/cloudbot-discord-running.PNG)

###### Running cloudbot in a channel in a Discord server
# Information

cloudbot-discord is a file server for Discord. It is best used in a __private Discord server__ since they are usually more responsible than public ones. But you can put it in a public server if you want. __This bot is officially in a release channel__. It supports file and folder management, banning members, and many other pointless commands. And some addons, as well.

## Requirements

You need NodeJS and the npm module `discord.js`. You will also need Python for most plugins.

**Required modules for addons:**

Python (pip install):
```
  - bs4
  - requests
```
Node.JS (npm install):
```
  - request
```

If you want to use the bot in Discord, link it to a server of yours above. I have a virtual server now which runs the bot, so that's great. It has 16 GB of storage and a 4th gen Core i5 single core processor, which is good. Although it may not be online everyday, it is mostly online.

*[Read setup.md](https://github.com/themysticsavages/cloudbot-discord/blob/main/setup/readme.md) if you want to self-host the bot.*

## Usage

A list of what commands can be done with roles. 
```
Adminstrator commands:
    cclear - Clear the console
    clear - Clear 99 messages from a channel
    del - Delete a file
    ban - Ban a user regardless of roles
```
```
User commands:
    random - Generate a random number from a specific range
    weather - Get the weather in an area
    search - Get the first result of a Bing search
    gif - Get a GIF based on a keyword from GIPHY (not Tenor)
    scratch - Get info for a Scratch user
    help - Get all the commands availible
    help. - Get more info on a command (e.g. c.help.random)
    write - Write to a file
    read - Get the content of a file
    uptime - Get the bot uptime
```

## Addons

Addons, like webscraper, are tiny Python or Node.JS scripts which are added on to the main bot. It is much simpler to edit then incorperate every single piece of code with the bot. If you want a specific extension configuration, you can add and remove extensions by setting extensions in the addons section of `config.json` to either `true` or `false`.

## Recently added features/hotfixes

- __Removed any kind of folder usage since other commands wouldn't run (ps: you can still make files)__

## Features/hotfixes to be added

- __Extension to fun commands (dog images, gender and nationality, and yoda speak!)__
- Downloading files (command may be c.get)

## Current bugs

*No bugs. List bugs in issues*
  
<a href="https://nodejs.org" target="_blank">
<img src="https://shields.io/badge/%20---?style=plastic-square&logo=javascript&color=black">
  
<a href="https://python.org/downloads" target="_blank">
<img src="https://shields.io/badge/%20---?style=plastic-square&logo=python&color=black" value="Download Python">
