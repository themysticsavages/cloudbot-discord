# Setup  
  If you feel like there is not a command I am including or if I am having server issues, or something, this is how to run CloudBot on your own.

## Making the app
  Login to the Discord developer [portal](https://discord.com/developers) and sign in with your Discord account. After logging in, it will show the applications you
have made, which is probably none.

  Click 'New Application', then add an application name. This can be whatever you want, if I will be honest. Then move to the Bot tab and press 'Add Bot'. Now you need to form an invite link to join the bot to your server. Press on the 'Learn more about bot users' link, get the example link, and save it somewhere.
  
  Now we go to the 'General' tab, and copy and paste the application ID into the example link after where it says 'client_id='. Then go back to the Bot tab and scroll all the way down to the Permissions section. Select the following:
  
        - View Channels
        - Ban Members
        - Send Messages
        - Read Message History

  Then copy and paste the Permissions ID after the segment 'permissions='. After you have your link, open it in a web browser.
It will ask which server you want the bot to connect to, and if you accept to all the permissions the bot has.

  After that, check if your bot is in the server.
## Making the bot functional
  Of course the bot doesn't do anything because there is no function running for it. For that, go get the bot.js file from [here](https://github.com/themysticsavages/cloudbot-discord).
Then open the file in some kind of text-editor and scroll down to the bottom where it says `bot.login('token')`. 

  You need to put in an ACTUAL token so it can login. For that, go to the Bot section in the Discord Developer Portal and copy the token. Remember that this
token is secret, so keep out of the eyes of the public!

  Then go into the `bin` directory and run either `run.bat` or `run.sh`. Both scripts ask for a token and run the bot.js file with that token inserted
  
  ```
  CloudBot is connected
  ---------------------
  ```
## Modifying the bot
  Now that you know that the bot actually works, you can modify it to include whatever you want, like kicking members, stopping them from sending messages 
in channels (which I will probably add), and much more.
