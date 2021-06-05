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
    
  <a href="">
</p>

![running](https://github.com/ajskateboarder/stuff/blob/main/recording4.gif)

###### Running cloudbot in a channel in a Discord server
#
# Information

cloudbot-discord is a file server for Discord. It is best used in a __private Discord server__ since they are usually more responsible than public ones. But you can put it in a public server if you want. __This bot is officially in a release channel__. It supports file management, banning members, and many other pointless commands.

## Self hosting

For self-hosting, you will need nodejs and python. You can download both of these things at the bottom of the README. Then just run `npm install i` and `python -m pip install -r requirements.txt` in the bot directory (tell me if the requirements file actually works).

*[Read setup.md](https://github.com/themysticsavages/cloudbot-discord/blob/main/setup.md) for further information on self-hosting.*

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
    search - Get the first result of a Yahoo search
    gif - Get a GIF based on a keyword from GIPHY (not Tenor)
    scratch - Get info for a Scratch user
    help - Get all the commands availible
    help. - Get more info on a command (e.g. c.help.random)
    write - Write to a file
    read - Get the content of a file
    ls - Get the contents of a directory
    uptime - Get the bot uptime
    youtube - Get the first five videos from a keyword
    shorten - Shorten down a URL with Rebrandly
    poll - Set up a relatively customizable poll with reactions
    fortnite - Get recent news and the battle map from 'Fortnite'
```

## Addons

Addons, like webscraper, are tiny Python or Node.JS scripts which are added on to the main bot. It is much simpler to edit then incorperate every single piece of code with the bot. If you want a specific extension configuration, you can add and remove extensions by setting extensions in the addons section of `config.json` to either `true` or `false`.

## Recently added features/hotfixes

- __Added fortnite addon ._.__

## Features/hotfixes to be added

- __Meme commands (c.topmeme for top 20 memes and c.meme for making memes)__    
- Downloading files (command may be c.get)

## Current bugs

*No bugs. List bugs in issues*

#### Downloads    

<a href="https://nodejs.org" target="_blank">
<img src="https://shields.io/badge/%20---?style=plastic-square&logo=javascript&color=black">
  
<a href="https://python.org/downloads" target="_blank">
<img src="https://shields.io/badge/%20---?style=plastic-square&logo=python&color=black" value="Download Python">

