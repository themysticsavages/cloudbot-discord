// CloudBot - A slightly insecure file server for Discord 
// Best used in private servers or public servers with some rules set for this program
// (c) 2021 TheRealMysticSavages

console.clear()

const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = '/';

// Creates space for logging events
bot.on('ready', () => {
  console.info('CloudBot is connected\n---------------------');
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

    try {
      fs.mkdirSync(fld)
      message.reply("Folder named '"+fld+"' created. Yay.")
      console.log("CloudBot created a folder named '"+fld+"'")

    } catch (err) {
      if (!args[0]) {
        message.reply('Aw man, the folder already exists!')
        console.log("CloudBot reported that '"+fld+"' already exists")
      }
    }
  }
});

// Deletes folders; requires the admin role
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'ddel') {
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
      if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.rmdirSync(dfld, { recursive: true })
        message.reply("Directory '"+dfld+"' deleted. Hip hip hooray.")
        console.log("CloudBot deleted folder named '"+dfld+"'")
      } else {
        message.reply('You no have admin! The administrator role is required to delete folders.')
        console.log('CloudBot told '+message.author.username+' that only admins can delete folders')
      }
    } catch (err) {
      if (!args[0]) {
        message.reply('Is that a folder? ._.')
        console.log('CloudBot error: Directory does not exist')
      }
    }
  }
});

// Changes directories
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'cd') {
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
      message.reply("Changed directory to '"+cfld+"'. *CLAP CLAP*")
      console.log("CloudBot went into the directory '"+cfld+"'")
    } catch (err) {
      if (!args[0]) {
        message.reply('Is that a folder? ._.')
        console.log('CloudBot error: Could not find the directory.')
      }
    }
  }
});

// Lists the content of a directory
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  if (message.content == '/ls') {
    const fld = './'

    fs.readdir(fld, (err, files) => {
        files.forEach(file => {
        message.reply(file);
    })
  })
  }
});

// YES! Create new files
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'new') {
    if (!args[1]) {
      message.reply("I don't see an filename anywhere... you see one? ._.")
      console.log('CloudBot told '+message.author.username+' to add an argument')
    }
    if (!args[2]) {
      if (!args[0]) {
        message.reply('Too many arguments came to the party, can you take some away?')
        console.log('CloudBot replied to '+message.author.username+' to use one argument.')
      }
    }
    const f = args[1]

    try {
      fs.appendFileSync(f, '')
      message.reply("File named '"+f+"' created. Woohoo.")
      console.log("CloudBot created a file named '"+f+"'")

    } catch (err) {
      if (!args[0]) {
        message.reply('Aw man, the file already exists!')
        console.log('CloudBot error: File already exists')
      }
    }
  }
});

// Delete files; requires admin role too
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'del') {
    if (!args[1]) {
      message.reply("I don't see an filename anywhere... you see one? ._.")
      console.log('CloudBot told '+message.author.username+' to add an argument')
    }
    if (!args[2]) {
      if (!args[0]) {
        message.reply('Too many arguments came to the party, can you take some away?')
        console.log('CloudBot replied to '+message.author.username+' to use one argument.')
      }
    }
    const fd = args[1]

    try {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.unlinkSync(fd, { recursive: true })
        message.reply("File named '"+fd+"' was deleted. Wow.")
        console.log("CloudBot deleted folder named '"+fd+"'.")
      } else {
        message.reply('You no have admin! The administrator role is required to delete files.')
        console.log('CloudBot told '+message.author.username+' that only admins can delete files')
      }
    } catch (err) {
      if (!args[0]) {
        message.reply('Is that a file? ._.')
        console.log('CloudBot error: File does not exist')
      }
    }
  }
});

// Insert your token here
bot.login('token')
