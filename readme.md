<h1 align="center">
  <br>
  <b>CloudBot - a file server for Discord</b>
</h1>

<p align="center">
  <a href="https://codeload.github.com/themysticsavages/cloudbot-discord/zip/refs/heads/main">
  <img src="http://shields.io/badge/source--code-ZIP-blue?style=plastic">
    
  <a href="https://codeload.github.com/themysticsavages/cloudbot-discord/tar.gz/refs/heads/main">
  <img src="http://shields.io/badge/source--code-TARGZ-green?style=plastic">
  
  <br>
  
  <a href="https://discord.com/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68612">
  <img src="https://img.shields.io/badge/%20-Put%20me%20in%20your%20server-blue?style=plastic">
  
  <br>
  
  <a href="about:blank">
  <img src="https://img.shields.io/badge/release-beta-red?style=plastic">
  
  <a href="https://github.com/themysticsavages/cloudbot-discord/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/license-mit-yellow?style=plastic">
  
  <a href="https://github.com/themysticsavages/cloudbot-discord/blob/main/setup/readme.md">
</p>

#

![running](https://github.com/ajskateboarder/stuff/blob/main/cloudbot-discord-running.PNG)

###### Running cloudbot in a channel in a Discord server
# Information

cloudbot-discord is a file server for Discord. It is best used in a __private Discord server__ since they are usually more responsible than public ones. But you can put it in a public server if you want. ~~This bot is officially in a stable release~~ Nah, it isn't anywhere near stable. It supports file and folder management, banning members, and many other pointless commands. And some addons, as well.

## Requirements

You need NodeJS and the npm module 'discordjs'.

If you want to use the bot in Discord, link it to a server of yours above. I have a virtual server now which runs the bot, so that's great. It has 16 GB of storage and a 4th gen Core i5 single core processor, which is good. Although it may not be online everyday, it is mostly online.

[Read setup.md](https://github.com/themysticsavages/cloudbot-discord/blob/main/setup/readme.md) if you want to self-host the bot.

## Role usage

For now, most functions can be done by anyone, however, __deleting__ files and folders requires the *Administrator* role. This is because core files needed by the bot or files that people want to store could be deleted on purpose or by accident.

## Usage

To get all the commands, type 'c.help'. For more detailed help, type a command 'c.help.' and add a command name like 'random'.

## Addons

Addons, like webscraper, are tiny Python or Node.JS scripts which are added on to the main bot. It is much simpler to edit then incorperate every single piece of code with the bot. If you want a specific extension configuration, you can add and remove extensions by setting extensions in `addons.json` to either `true` or `false`.

### Current Addons

```
- webscraper : A Python search scraper which grabs the first text content off a Bing search (c.scrape)
```

*WARNING: webscraper runs a Python file using py, if you are running a legacy version of Python or if you are using Linux, edit this,
or else it won't run. Look [here](https://github.com/themysticsavages/cloudbot-discord/blob/main/bot.js#L451).*

```
- filereserve : A detector for Windows that detects if you are using device names like con, aux, etc.
```

```
- asciitext : A small Python script which converts text to ASCII. Converting ASCII to text needs work.
```

## Recently added features

- __Add-ons__

## Features/hotfixes to be added

- __Rename files__

## Current bugs

- __Writing does nothing__
