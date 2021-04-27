#
![picture](https://ajskateboarder.github.io/assets/screenshot1.jpg)

###### Running cloudbot in a channel in a Discord server
# Information

cloudbot-discord is a file server for Discord. It is best used in a __private Discord server__ since they are usually more formal than public ones. But you can put it in a public server if you want. This program is in __perpetual beta__, and it supports creating and deleting files and folders, listing the contents of a directory, and changing directories. You cannot write to files as of now, but it will be updated to include this feature soon, however.

## Requirements

You will need Node.JS and the npm module 'Discord'. If you want to use the bot in Discord, link it to a server of yours [here](https://discord.com/api/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68608). Then download the bot, modify the token at the bottom of the file, then run the JS program.

###### If you are not running this on a dedicated server for the bot, use this in a Discord server with others that you trust. Otherwise, go ahead.

## Role usage

For now creating and changing directories can be done by anyone, however, __deleting__ files and folders will require the *Administrator* role. This is because core files needed by the bot or files that people want to store could be deleted on purpose or by accident.

## Usage

As the picture above does not show all the commands, I have provided them below:

       /mkdir example
            Bot reply: Fodler named 'example' created. Yay.
            Console log: CloudBot created a folder named 'example'
       
       /ddel example (needs Administrator role)
            Bot reply: The directory example was deleted. Hip hip hooray.
            Console log: CloudBot deleted folder named 'example'
       
       /cd example
            Bot reply: Changed directory to 'example'. *CLAP CLAP*
            Console log: CloudBot went into the directory 'example'
            
       /new example.txt
            Bot reply: File named 'example.txt' created. Woohoo.
            Console log: CloudBot created a file named 'example.txt'
            
       /del example.txt
            Bot reply: File named 'example.txt' was deleted. Wow.
            Console log: CloudBot deleted folder named 'example.txt'
            
## Features/hotfixes to be added

- __Write to files (if writable)__
- Deny access to directories outside the root folder
- Reply to greetings or a few questions

## Current bugs

*None*
