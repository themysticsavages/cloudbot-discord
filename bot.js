// CloudBot - A file server for Discord 

// Best used in a private server among responsible members
// It was hard adding semi-colons to everything, just to have "better syntax"
// You're lucky I made this bot open-source!
// not a lot of people do that

// (c) 2021 themysticsavages

const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = 'c.'; // You can edit the prefix, but the prefix is not applied in every command!
// For example, the help library at line 179 - 229 doesn't use the prefix

const sub = 'CloudBot';
console.clear()

// Creates space for logging events
bot.on('ready', () => {
  console.info('CloudBot is connected\n---------------------');
});

// Little message recorder, console clearer, and channel wiper
bot.on('message', async message => {
  if (message.author.username.includes(sub)) { // If the message includes the substring 'CloudBot', it won't print any replies
    
  } else {
    console.log(message.author.username+' > '+message.content)
  }
  if (message.content === 'c.cclear') {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      console.clear()
      console.info('CloudBot is connected\n---------------------');
    } else {
      message.reply('`You no have admin! The administrator role is required to clear the console.`');
      console.log("CloudBot error: Insufficient privileges to clear console");
    }
  }
  if (message.content === 'c.clear') {
    if (message.member.hasPermission("ADMINISTRATOR")) {
    const dmsg = 99 // You can change this but uh probably not

    message.channel.bulkDelete(dmsg)
    console.log("Deleted every message in '"+message.channel.name+"'")
  } else {
    message.reply('`You no have admin! The administrator role is required to clear channels.`');
    console.log("CloudBot error: Insufficient privileges to clear channels");
  }
} 
});

// Creates folders
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g); // used this code althroughout the program
  const cmd = args[0].slice(prefix.length).toLowerCase(); 

  // Since the old syntax for detecting args didn't work, I made a new detector altogether
  // Demonstration time

  if (cmd === 'mkdir') {
    var err = 0; // Error VARIABLE
      if (!args[1]) {
        message.reply("`Where is the folder name? ._.`")
        console.log("CloudBot couldn't find the folder you are looking for")
        err++; // Increases the error var by one
    }
    if (!args[2]) {
      if (err == 1) { // If the error variable is one, nothing.
      } else { // So much better isn't it?
        const fld = args[1]
        try {
          fs.mkdirSync(fld)
          message.reply("`Folder named '"+fld+"' created. Yay.`");
          console.log("CloudBot created a folder named '"+fld+"'");

        } catch (err) {
          message.reply('`Aw man, the folder already exists!`');
          console.log("CloudBot reported that '"+fld+"' already exists");
        }
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
    var err = 0;
      if (!args[1]) {
        message.reply("`Hey, I couldn't find a folder name! ._.`")
        console.log("CloudBot couldn't find a folder argument in the command")
        err++;
    }
    if (!args[2]) {
      if (err == 1) {
      } else {
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
          message.reply('`Is that a folder? ._.`');
          console.log('CloudBot error: Directory does not exist');
        }
      }
    }
  }
});

// Changes directories; had to make it even more complicated to fix security holes.
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'cd') {
    var err = 0;
      if (!args[1]) {
        message.reply("`Hmmm... that's a folder? ._.`")
        console.log("CloudBot couldn't find a folder name")
        err++;
      }
      if (!args[2]) {
        if (err == 1) {
        } else {
          const cfld = args[1]
          const substr = 'cloudbot'

      try {
          process.chdir(cfld)
          if (process.cwd().includes(substr)) {
            message.reply("`Changed directory to '"+cfld+"'. *CLAP CLAP*`");
            console.log("CloudBot went into the directory '"+cfld+"'");
          } else {
            process.chdir('cloudbot') // If you change to a directory outside the root folder, then it will go back into the root directory
            message.reply("`I don't think you can go there!`");
            console.log('CloudBot error: Access to folders outside root folder is denied\nCloudBot went into the root directory');
          }
        } catch (err) {
            message.reply('`Is that a folder? ._.`');
            console.log('CloudBot error: Could not find the directory.');
           }
         }
       } 
     }
});

// Lists the content of a directory
bot.on('message', message => { // verrry simple code, you don't even need args!
  if (!message.content.startsWith(prefix)) return;

  if (message.content === 'c.ls') {
    const fld = './'

    fs.readdir(fld, (err, files) => {
        files.forEach(file => {
        message.reply(file); // It may or may not be spam, but its the only way to get contents
    })
  })
  }
});

// A couple of sentient replies for this nice bot
bot.on('message', message => {
  if (message.content === 'c.hi') {
    message.reply('`hi :)`'); // you know, this is more of a test command to see if the bot is up and running
    console.log("CloudBot said hi to '"+message.author.username+"'");
  }
  if (message.content === 'c.purpose') {
    message.reply('`I am basically a cloud server for Discord. I am pure Node.JS. Although I may not have that many functions, the cloud server functions make up for this!`');
    console.log("CloudBot told '"+message.author.username+"' about why he exists");
  }
  if (message.content === 'c.help') {
    message.reply("```Commands for CloudBot:\n\nNot file server commands:\n  c.help : prints this message\n  c.hi : Say hi back to you\n  c.purpose : Why I'm here\n  c.cclear : Clears console\n  c.clear : Clears channel (almost)\n\nFile server commands:\n  c.mkdir : Make a folder\n  c.ddel : Delete a folder (admin)\n  c.cd : Change directory\n  c.new : Make a new file with any extension\n  c.del : Delete file (admin)\n  c.ls : List contents of folder\n  c.wr : Write to file (admin)\n  c.rd : Get text from file\n\nModerator commands: (admin)\n  c.ban\n  c.cclear : Clears the console (admin)\n  c.clear : Clears a channel (admin)\n\nFun commands:\n  c.random : Make a random number```" + "**You're welcome**");
    console.log("CloudBot gave help to '"+message.author.username+"'");
  }
  
  // Extended help library; a nice touch; had to join code to do MemoryLeak warnings
  if (message.content === 'c.help.mkdir') {
    message.reply('`\nCreates a directory\nusage: c/mkdir example`'); 
    console.log("CloudBot gave help on making directories to '"+message.author.username+"'");
  }
  if (message.content === 'c.help.ddel') {
    message.reply('`\nRemoves a directory (needs admin role)\nusage: c/ddel example`')
    console.log("CloudBot gave help to '"+message.author.username+"' on removing directories");
  }
  if (message.content === 'c.help.new') {
    message.reply('`\nMakes a new file with any extension\nusage: c/new example.txt`')
    console.log("CloudBot gave help on how to make files to '"+message.author.username+"'")
  }
  if (message.content === 'c.help.del') {
    message.reply('`\nDeletes a file (needs admin role)\nusage: c/del example.txt`')
    console.log("CloudBot gave help on deleting files to '"+message.author.username+"'")
  }
  if (message.content === 'c.help.cd') {
    message.reply('`\nChanges directory\nusage: c/cd example`')
    console.log("CloudBot gave more help to '"+message.author.username+"' on how to change directories")
  }
  if (message.content === 'c.help.wr') {
    message.reply('`\nWrites text to file (needs admin role)\nusage: c/wr example.txt test_file (make sure it is ONE string! multiple string writes will be implemented later)`')
    console.log("CloudBot told '"+message.author.username+"' how to write to files")
  }
  if (message.content === 'c.help.rd') {
    message.reply('`\nGets text from file\nusage: c/rd example.txt`')
    console.log("CloudBot helped '"+message.author.username+"' to read from files.")
  }
  if (message.content === 'c.help.ban') {
    message.reply('`\nBan a member (needs "Ban members" role) with a default reason\nusage: c/ban @examplemember`')
    console.log("CloudBot told '"+message.author.username+"' how to ban a member")
  }
  if (message.content === 'c.help.random') {
    message.reply('`\nMake a random number\nusage: c/random 420`')
    console.log("CloudBot told '"+message.author.username+"' how to generate random numbers")
  }

  // Commands for fun
  if (message.content.startsWith(prefix)) {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'random') {
      const max = args[1]

      var randomnumber = Math.floor(Math.random() * max)
      message.reply("`"+randomnumber+"`");
      console.log('CloudBot generated a random number');
  }
}
});

// Create new files (this was a big accomplishment when I finished this code, even though you couldn't write to files)
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'new') {
    var err = 0;
      if (!args[1]) {
        message.reply("`Where is the file name? ._.`")
        console.log("CloudBot couldn't find a filename to use")
        err++;
    }
    if (!args[2]) {
      if (err == 1) {
      } else {
        const f = args[1]

        try {
            fs.appendFileSync(f, '')
            message.reply("`File named '"+f+"' created. Woohoo.`");
            console.log("CloudBot created a file named '"+f+"'");
        } catch (err) {
            message.reply('`Aw man, the file already exists!`');
            console.log('CloudBot error: File already exists');
          }
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
    var err = 0;
      if (!args[1]) {
        message.reply("What is the file name? ._.")
        console.log("CloudBot couldn't find the file argument")
        err++;
      }
      if (!args[2]) {
        if (err == 1) {
      } else {
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
          message.reply('`Is that a file? ._.`');
          console.log('CloudBot error: File does not exist');
     }
    }
   }
  }
});

// Writing text to files and returning text; pretty clean code if I do say so myself; you can also make files with this too
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'write') {
   if (!message.startsWith(prefix)) return;

   var err = 0; // dang i hope this works
   if (!args[0]) {
    message.reply('Where are the arguments? ._.');;
    console.log('CloudBot could not find any arguments');
    err++
   }
   if (err == 1) {
   } else {
     const file = args[1]
     const text = args[2]
     
     fs.writeFileSync(file, text)
     message.reply('`Wrote to `'+'`'+`${file}`+' sucessfully. Yay.`')
     console.log("CloudBot wrote to '"+file+"'")
   }
  }
});

// Insert your token here
bot.login('token');
