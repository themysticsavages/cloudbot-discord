// CloudBot - A slightly insecure file server for Discord 
// Best used in private servers or public servers with some rules set for this program
// (c) 2021 TheRealMysticSavages

console.clear()

const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = '/';

bot.on('ready', () => {
  console.info('CloudBot is connected!');
});

// Creates folders
bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'mkdir') {
      if (!args[1]) {
        message.reply('```Please specify a folder name next time ._.```')
        console.log('CloudBot replied to '+message.author.username+' to add a folder name')
      }
      if (args[2]) {
        message.reply('```Too many arguments. You do know you only add ONE, right?```')
        console.log('CloudBot replied to '+message.author.username+' to add only one argument')
      }
      const fld = args[1]

      fs.access(fld, function(error) {
        if (error) {
          fs.mkdirSync(fld);
          message.reply('```Directory created. Yay.```');
          console.log('CloudBot created folder named '+fld+' in the root directory')
        } else {
          message.reply('```Oh noes! The directory exists already!```');
          console.log('CloudBot error: Directory exists')
        }
      })
    }
});

// Some humane replies to common messages
  bot.on('message', message => {
    if (message.content == 'hi cloudbot') {
      message.reply('```hi :)```');
      console.log('CloudBot said hi to '+message.author.username)
    }
    if (message.content == 'cloudbot purpose') {
      message.reply('```I am basically a cloud server for Discord. You can run me on anything you want. Just make sure no one misuses the functions!```');
      console.log('CloudBot told '+message.author.username+' about why he exists')
    }
  });

  // Deletes files; needs admin rights; you can also force-delete files if you have access to the physical server running the bot.
  bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'rmdir') {
      if (!args[1]) {
        message.reply('```Please specify a folder name next time ._.```')
        console.log('CloudBot replied to '+message.author.username+' to add a folder name')
      }
      if (args[2]) {
        message.reply('```Too many arguments. You do know you only add ONE, right?```')
        console.log('CloudBot replied to '+message.author.username+' to add only one argument')
      }
      const dfld = args[1]

      fs.rmdir(dfld, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
        message.reply('```Directory deleted. Yay.```');
        console.log('CloudBot deleted folder named '+dfld+' in the root directory')
      })
    }
});

bot.login('ODM1ODQxMzgyODgyNzM4MjE2.YIVT8g.SResi6IPf47Wua3h7cAfrx6myfs')
