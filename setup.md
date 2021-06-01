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
  Of course the bot doesn't do anything because there is no function running for it. For that, go get the project from [here!](https://github.com/themysticsavages/cloudbot-discord) Then get the bot token and put it into `config.json`.
  
## Getting optional API keys
  If you don't want to go through this nightmare, you can turn the extensions that require an API key off by setting the addon value to `false` in `config.json`. That way, CloudBot won't let you run the extension, which eliminates the need to get an API key. 
  
  If you DO want the extensions on, look at these subsections. Also, make sure you put the API keys into `config.json`. 

### OpenWeatherMap API
  To get an API key for OpenWeatherMap, simply create an account at their [website](https://openweathermap.org), go to the API Key page, and then try the default API key with this url:
  
  ```
  http://api.openweathermap.org/data/2.5/weather?q=london&appid=apikey
  ```
  
  Good chance it will work.

### Giphy
  This process is a little less straight-forward. First you have to create an app [here](https://developers.giphy.com/dashboard/?create=true) (it's free). It is recommended that you create a SDK app instead of an API one. Giphy will tell you that you will have a beta key until your app is approved, but there aren't much limitations with a beta key compared to an approved key. With your app made, grab your key and try this url:
  
  ```
  https://api.giphy.com/v1/gifs/random?api_key=apikey
  ```

### Rebrandly
  To get an API key, just simply go [here](https://rebrandly.com/developers), create an account, and regenerate your API key. Then insert the key into config.json and try out snipper.py from the addon.

## Modifying the bot
  Now that you know that the bot actually works, you can modify it to include whatever you want, like kicking members, stopping them from sending messages 
in channels (which I will probably add), and much more. ~~I highly suggest that you run the bot in Heroku, or a local Linux server, you probably don't need a full blown Windows operating system to run something as simple as a~~ You may need a Windows operating system to run the bot, since some Python functions may not work properly. However, noone's stopping you from using whatever version you want! You can use a legacy Windows OS, a Windows Server OS, and even a __Nano__ server! ([Don't know what Nano Server is?](https://docs.microsoft.com/en-us/windows-server/get-started/getting-started-with-nano-server))
