#
![picture](https://ajskateboarder.github.io/assets/screenshot1.jpg)

###### Running cloudbot in a temporary Discord server
# Information
cloudbot-discord is a file server for Discord. It is best used in a __private Discord server__ since they are usually more formal than public ones. But you can put it in a public server if you want. This program is in __beta__, and it only __creates, deletes, and changes directories__ as of now. It will be updated more, however.

## Requirements
You will need Node.JS and the npm module 'Discord'. If you want to use the bot in Discord, link it to a server of yours [here](https://discord.com/api/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68608), replace the example text at the bottom of the program with your token, and run it! 

###### If you are not running this on a dedicated server, use this bot in a server with others that you __trust__. Otherwise, you can go ahead.

## Role usage
Creating files does not require any special roles. However, deleting files requires the *Administrator* role. This is because people may have files that they want to keep on the server running the bot, and random people may go and delete those files. So, the admin is the only one who can do this. Also, this stops people from deleting the bot file itself.

## Commands
As the picture above does not show all the commands, I have provided them below:

       /mkdir example
            Bot reply: Directory named example created. Yay.
            Console log: CloudBot created a folder named example
       
       /rmdir example (needs Administrator role)
            Bot reply: The directory example was deleted. Hip hip hooray.
            Console log: CloudBot deleted folder named example
       
       /chdir example
            Bot reply: Changed directory to example. *CLAP CLAP*
            Console log: CloudBot went into the directory example
            
## Error logs
The error logs for typical errors you might get using CloudBot:

      Missing argument:
            Bot replies: 
                  Please specify a folder name next time ._.
                  I think you need a folder name to remove, am i correct? ._.
                  Hmm... what's the folder name? ._.
            Console log: CloudBot replied to exampleuser to add a folder name
      
      Too many arguments:
            Bot replies:
                  Too many arguments. You do know you only add ONE, right?
                  Too many arguments. Only ONE is needed.
                  Too many arguments. Add ONE argument next time.
            Console log: CloudBot replied to exampleuser to add only one argument
      
      Folder exists:
            Bot reply: Oh noes! The directory exists already!
            Console log: CloudBot error: Directory exists
            
      Directory does not exist:
            Bot reply: Is that a folder? ._.
            Console log: CloudBot error: Could not find the directory.
