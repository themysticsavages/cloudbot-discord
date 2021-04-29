// CloudBot - A file server for Discord 

// Best used in a private server among responsible members
// (c) 2021 themysticsavages

// It was hard adding semi-colons to everything, just to have "better syntax"

const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = 'c/';

console.clear()

// Creates space for logging events
bot.on('ready', () => {
  console.info('CloudBot is connected\n---------------------');
});

// Creates folders
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g); // used this code althroughout the program
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'mkdir') {
    if (!args[1]) {
      message.reply('``lease specify a folder name next time ._.`');
      console.log("CloudBot replied to '"+message.author.username+"' to add a folder name");
    }
    if (args[2]) {
      if (!args[0]) {
        message.reply('`Too many arguments. You do know you only add ONE, right?`');
        console.log("CloudBot replied to '"+message.author.username+"' to add only one argument");
      }
    }
    const fld = args[1]

    try {
      fs.mkdirSync(fld)
      message.reply("`Folder named '"+fld+"' created. Yay.`");
      console.log("CloudBot created a folder named '"+fld+"'");

    } catch (err) {
      if (!args[0]) {
        message.reply('`Aw man, the folder already exists!`');
        console.log("CloudBot reported that '"+fld+"' already exists");
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
      message.reply('`I think you need a folder name to remove, am i correct? ._.`');
      console.log("`CloudBot replied to '"+message.author.username+"' to add a folder name`");
    }
    if (args[2]) {
      if (!args[0]) {
        message.reply('`Too many arguments. Only ONE is needed.`');
        console.log("CloudBot replied to '"+message.author.username+"' to add only one argument");
      }
    }
    const dfld = args[1]

    try {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.rmdirSync(dfld, { recursive: true })
        message.reply("`Directory '"+dfld+"' deleted. Hip hip hooray.`");
        console.log("CloudBot deleted folder named '"+dfld+"'");
      } else {
        message.reply('`You no have admin! The administrator role is required to delete folders.`');
        console.log("CloudBot error: Insufficient privileges to delete the directory '"+dfld+"'");
      }
    } catch (err) {
      if (!args[0]) {
        message.reply('`Is that a folder? ._.`');
        console.log('CloudBot error: Directory does not exist');
      }
    }
  }
});

// Changes directories; had to make it even more complicated.
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'cd') {
    if (!args[1]) {
      message.reply("`Hmm... what's the folder name? ._.`");
      console.log("CloudBot replied to '"+message.author.username+"' to add a folder name");
    }
    if (args[2]) {
      message.reply('`Too many arguments. Add ONE argument next time.`');
      console.log("CloudBot replied to '"+message.author.username+"' to add only one argument");
    }
      const cfld = args[1]
      const substr = 'cloudbot'

    try {
        process.chdir(cfld)
        if (process.cwd().includes(substr)) {
          message.reply("`Changed directory to '"+cfld+"'. *CLAP CLAP*`");
          console.log("CloudBot went into the directory '"+cfld+"'");
        } else {
          process.chdir('cloudbot')
          message.reply("`I don't think you can go there!`");
          console.log('CloudBot error: Access to folders outside root folder is denied\nCloudBot went into the root directory');
        }
      } catch (err) {
      if (!args[0]) {
        message.reply('`Is that a folder? ._.`');
        console.log('CloudBot error: Could not find the directory.');
      }
    }
  }
});

// Lists the content of a directory
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  if (message.content === 'c/ls') {
    const fld = './'

    fs.readdir(fld, (err, files) => {
        files.forEach(file => {
        message.reply(file);
    })
  })
  }
});

// A couple of sentient replies for this nice bot
bot.on('message', message => {
  if (message.content === 'c/hi') {
    message.reply('`hi :)`');
    console.log("CloudBot said hi to '"+message.author.username+"'");
  }
  if (message.content === 'c/purpose') {
    message.reply('`I am basically a cloud server for Discord. I am pure Node.JS. Although I may not have that many functions, the cloud server functions make up for this!`');
    console.log("CloudBot told '"+message.author.username+"' about why he exists");
  }
  if (message.content === 'c/help') {
    message.reply("```Commands for CloudBot:\n\nNot file server commands:\n  c/help : prints this message\n  c/hi : Say hi back to you\n  c/purpose : Why I'm here\n\nFile server commands:\n  c/mkdir : Make a folder\n  c/ddel : Delete a folder (admin)\n  c/cd : Change directory\n  c/new : Make a new file with any extension\n  c/del : Delete file (admin)\n  c/ls : List contents of folder\n  c/wr : Write to file (admin)\n  c/rd : Get text from file\n\nModerator commands: (admin)\n  c/ban\n```" + "**You're welcome**");
    console.log("CloudBot gave help to '"+message.author.username+"'");
  }
});

// Help library
bot.on('message', message => {
  if (message.content === 'c/help/mkdir') {
    message.reply('`\nCreates a directory\nusage: c/mkdir example`');
    console.log("CloudBot gave help on making directories to '"+message.author.username+"'");
  }
  if (message.content === 'c/help/ddel') {
    message.reply('`\nRemoves a directory (needs admin role)\nusage: c/ddel example`')
    console.log("CloudBot gave help to '"+message.author.username+"' on removing directories");
  }
  if (message.content === 'c/help/new') {
    message.reply('`\nMakes a new file with any extension\nusage: c/new example.txt`')
    console.log("CloudBot gave help on how to make files to '"+message.author.username+"'")
  }
  if (message.content === 'c/help/del') {
    message.reply('`\nDeletes a file (needs admin role)\nusage: c/del example.txt`')
    console.log("CloudBot gave help on deleting files to '"+message.author.username+"'")
  }
  if (message.content === 'c/help/cd') {
    message.reply('`\nChanges directory\nusage: c/cd example`')
    console.log("CloudBot gave more help to '"+message.author.username+"' on how to change directories")
  }
  if (message.content === 'c/help/wr') {
    message.reply('`\nWrites text to file (needs admin role)\nusage: c/wr example.txt test_file (make sure it is ONE string! multiple string writes will be implemented later)`')
    console.log("CloudBot told '"+message.author.username+"' how to write to files")
  }
  if (message.content === 'c/help/rd') {
    message.reply('`\nGets text of file\nusage: c/rd example.txt`')
    console.log("CloudBot helped '"+message.author/username)
  }
  if (message.content === 'c/help/ban') {
    message.reply('`\nBan a member (needs "Ban members" role) with a default reason\nusage: c/ban @examplemember`')
    console.log("CloudBot told '"+message.author.username+"' how to ban a member")
  }
});

// Create new files
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'new') {
    if (!args[1]) {
      message.reply("`I don't see an filename anywhere... you see one? ._.`");
      console.log("CloudBot told '"+message.author.username+"' to add an argument");
    }
    if (!args[2]) {
      if (!args[0]) {
        message.reply('`Too many arguments came to the party, can you take some away?`');
        console.log("CloudBot replied to '"+message.author.username+"' to use one argument.");
      }
    }
    const f = args[1]

    try {
      fs.appendFileSync(f, '')
      message.reply("`File named '"+f+"' created. Woohoo.`");
      console.log("CloudBot created a file named '"+f+"'");

    } catch (err) {
      if (!args[0]) {
        message.reply('`Aw man, the file already exists!`');
        console.log('CloudBot error: File already exists');
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
      message.reply("`I don't see an filename anywhere... you see one? ._.`");
      console.log("CloudBot told '"+message.author.username+"' to add an argument");
    }
    if (!args[2]) {
      if (!args[0]) {
        message.reply('`Too many arguments came to the party, can you take some away?`');
        console.log("CloudBot replied to '"+message.author.username+"' to use one argument.");
      }
    }
    const fd = args[1]

    try {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.unlinkSync(fd, { recursive: true })
        message.reply("File named '"+fd+"' was deleted. Wow.");
        console.log("CloudBot deleted folder named '"+fd+"'");
      } else {
        message.reply('You no have admin! The administrator role is required to delete files.');
        console.log("CloudBot error: Insufficient privileges to delete the file '"+fd+"'");
      }
    } catch (err) {
      if (!args[0]) {
        message.reply('`Is that a file? ._.`');
        console.log('CloudBot error: File does not exist');
      }
    }
  }
});

// Writing text to files and returning text, yay
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'wr') {
    if (!args[1]) {
      message.reply('`Where is the file and the text? ._.`');
      console.log("CloudBot told '"+message.author.username+"' to add 2 arguments");
    }
    if (!args[2]) {
      message.reply('`Include the text to write next time ._.`');
      console.log("CloudBot asked '"+message.author.username+"' to add another argument");
    }
    const fw = args[1]
    const wr = args[2]

    try {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.writeFileSync(fw, wr)
        message.reply("`Wrote to '"+fw+"'. Impressive.`")
        console.log("CloudBot wrote to '"+fw+"'")
      } else {
        message.reply('You no have admin! The administrator role is required to delete files.');
        console.log("CloudBot error: Insufficient privileges to write to file '"+fw+"'");
      }
    } catch (err) {
      message.reply('`Is that a file? ._.`');
      console.log('CloudBot error: File does not exist');
    }
  }

  if (cmd === 'rd') {
    if (!args[1]) {
      message.reply('`Where is the file and the text? ._.`');
      console.log("CloudBot told '"+message.author.username+"' to add 2 arguments");
    }
    if (!args[2]) {
      message.reply('`Too many arguments. Add ONE argument next time.`');
      console.log("CloudBot replied to '"+message.author.username+"' to add only one argument");
    }
    const rd = args[1]

    fs.readFile(rd, 'utf8', function (err,data) {
      if (err) {
        message.reply('`Is that a file? ._.`');
        console.log('CloudBot error: File does not exist');
      }
      message.reply('\nContents of '+rd+':\n'+data);
      console.log("CloudBot returned the contents of '"+rd+"'")
    });
  }
});

// Ban people who abuse the system (borrowed code from gist: https://bit.ly/3e0xbAT)
bot.on('message', message => {
  if (!message.guild) return;
  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (message.content.startsWith('c/ban')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.members.resolve(user);
        if (user.id === message.author.id) {
          message.reply('**No**');
          console.log('CloudBot stopped '+message.author.username+' from banning him/herself');
        };
        if (member) {
          member
            .ban({
              reason: "I wouldn't ban you without a reason! It's probably because the mods noticed that you were abusing the file system in some kind of way.",
            })
            .then(() => {
              message.reply(`Banned ${user.tag}. *F to pay respects*`);
              console.log(`CloudBot banned ${user.tag}`);
            })
            .catch(err => {
              message.reply('*Not today, thank you*');
              console.log("CloudBot protected himself from getting banned by "+message.author.username);
            });
        } else {
          message.reply("`That user isn't in this guild ._.`");
          console.log("CloudBot error: User does not exist");
        }
      } else {
        message.reply("`You didn't mention the user to ban ._.`");
        console.log("CloudBot error: User not mentioned");
      }
    }
  }
});
// Oh man, if I add more bot.on commands after the banning command, it will produce an MaxListener Warning, so no more bot.ons!

// Insert your token here
bot.login('ODM1ODQxMzgyODgyNzM4MjE2.YIVT8g.L1lwFbj9qsCzmkDx-hQgvDebGGM');
