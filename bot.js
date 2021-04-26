// CloudBot - A slightly insecure file server for Discord 
// Best used in private servers or public servers with some rules set for this program
// (c) 2021 TheRealMysticSavages

console.clear()

const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = '/';

bot.on('ready', () => {
  console.info('CloudBot is connected!\n---------------------');
});

// Creates folders
bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'mkdir') {
      if (!args[1]) {
        message.reply('Please specify a folder name next time ._.');
        console.log('CloudBot replied to '+message.author.username+' to add a folder name');
      }
      if (args[2]) {
        message.reply('Too many arguments. You do know you only add ONE, right?');
        console.log('CloudBot replied to '+message.author.username+' to add only one argument');
      }
      const fld = args[1]

      fs.access(fld, function(error) {
        if (error) {
          fs.mkdirSync(fld);
          message.reply('Directory named '+fld+' created. Yay.');
          console.log('CloudBot created a folder named '+fld);
        } else {
          message.reply('Oh noes! The directory exists already!');
          console.log('CloudBot error: Directory exists');
        }
      })
    }
});

  // A couple sentient replies to common messages like 'hi cloudbot'
  bot.on('message', message => {
    if (message.content == 'hi cloudbot') {
      message.reply('hi :)');
      console.log('CloudBot said hi to '+message.author.username);
    }
    if (message.content == 'cloudbot purpose') {
      message.reply('I am basically a cloud server for Discord. I am pure Node.JS. Make sure no one misuses the functions!');
      console.log('CloudBot told '+message.author.username+' about why he exists');
    }
  });

  // Deletes folders; will require admin rights in the future; you can force-delete files if you have access to the physical server running the bot.
  bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'rmdir') {
      if (!args[1]) {
        message.reply('I think you need a folder name to remove, am i correct? ._.');
        console.log('CloudBot replied to '+message.author.username+' to add a folder name');
      }
      if (args[2]) {
        message.reply('Too many arguments. Only ONE is needed.');
        console.log('CloudBot replied to '+message.author.username+' to add only one argument');
      }
      const dfld = args[1]

      try {
        fs.rmdir(dfld)
        message.reply('The directory '+dfld+' was deleted. Hip hip hooray.');
        console.log('CloudBot deleted folder named '+dfld);
      } catch (err) {
        message.reply('Is that a folder? ._.')
        console.log('CloudBot error: Could not find the directory.')
      }
    }
});
  
  // Changing directories
  bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'chdir') {
      if (!args[1]) {
        message.reply("Hmm... what's the folder name? ._.");
        console.log('CloudBot replied to '+message.author.username+' to add a folder name');
      }
      if (args[2]) {
        message.reply('Too many arguments. Add ONE argument next time.');
        console.log('CloudBot replied to '+message.author.username+' to add only one argument');
      }
        const cfld = args[1]

      try {
        process.chdir(cfld)
        message.reply('Changed directory to '+cfld+'. *CLAP CLAP*')
        console.log('CloudBot went into the directory '+cfld)
      } catch (err) {
        message.reply('Is that a folder? ._.')
        console.log('CloudBot error: Could not find the directory.')
      }
    }
  });

bot.login('token')
