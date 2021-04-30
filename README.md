#
![picture](https://ajskateboarder.github.io/assets/screenshot1.jpg)

###### Running cloudbot in a channel in a Discord server (mind the image, it does not have the right command names)
#
# Information

cloudbot-discord is a file server for Discord. It is best used in a __private Discord server__ since they are usually more responsible than public ones. But you can put it in a public server if you want. This bot is in __perpetual beta__, and it supports file and folder management and banning members.

You cannot write to files as of now (which sucks), but it will be updated to include this feature soon, however.

## Requirements

You need NodeJS and the npm module 'discord'.

```
Warning! Issues might occur installing the Discord module if you use it on Windows 10 Enterprise LTSC
```

If you want to use the bot in Discord, link it to a server of yours [here](https://discord.com/api/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68608). 

If you want to run a modified version of the bot, make a new bot and join it to your server with the permissions 'Read message history, Send Messages, View Channels, and Ban Members'. Then download the bot.js file, modify the file, and run it with NodeJS.

## Role usage

For now, most functions can be done by anyone, however, __deleting__ files and folders requires the *Administrator* role. This is because core files needed by the bot or files that people want to store could be deleted on purpose or by accident.

## Usage

To get all the commands, type 'c/help'. For more detailed help, type a command 'c/help/' and add a command name.

## Recently added features

- __Read text from file__
- __Write text to file__

## Features/hotfixes to be added

- __Rename files__

## Current bugs

*None. If there are bugs, list them in issues.*
