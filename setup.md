# [<img src="https://github.com/themysticsavages/cloudbot-discord/blob/main/avatar.png" width="35"/>](image.png) Setup 
*If you feel like there is a command I'm not including or if I am having server issues, or something, this is how to self-host CloudBot (in Windows).*
  
## Requisites
  - __Node.js (LTS preferred)__
  - __Python__
  - Git (optional)
  
Obviously, you need a bot to use, so follow this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Make sure to put your token into the config!

## API
  Done with that? Follow this guide to set up addons. 
  
  **Disclaimer: These addons are totally optional. If you don't want these, disable them in `config.json`!**
  
  ### OpenWeatherMap
  OpenWeatherMap is a weather API to fetch the current weather at a place. To set this API up, go to https://openweathermap.org, create an account, and use 
  the default key provided.
   
  ### GIPHY
  Go to https://developer.giphy.com, sign up for an account, and create an SDK app. Use the key provided.
  
  ### Rebrandly
  Head over to https://rebrandly.com, create an account, then go to https://app.rebrandly.com/account/api-keys, and finally create an API key.
  
  ### Imgflip
  Luckily for you, this process is very simple. Go to https://api.imgflip.com and create an account (Don't use Google auth). Use your username and password.
  
  ### Brainshop
  Pretty easy to do. Go to https://brainshop.ai, set up an account, and create a bot with a semantic engine. Use it's ID and API key.
  
## Packages
  To install all the packages needed, run `initialize.cmd` and choose the second option. Simple.

You're done.
