/* CloudBot - A file server for Discord 

   Best used in a private server among responsible members
   It was hard adding semi-colons to everything, just to have "better syntax"
   You're lucky I made this bot open-source!
   not a lot of people do that

(c) 2021 themysticsavages */

const Discord = require('discord.js');
const fs = require('fs');

const addon = require('./addons.json')

const bot = new Discord.Client();
const prefix = 'c.'; // You can edit the prefix, but the prefix is not applied in every command!
// For example, the help library at line 179 - 229 doesn't use the prefix

const sub = 'CloudBot';
const reserve = require('./addons/filereserve/reserve.js')

const { spawn } = require('child_process');
console.clear()

// Creates space for logging events
bot.on('ready', () => {
  console.info('CloudBot is connected\n---------------------');
});

function getRandInt(max) {
  return Math.floor(Math.random() * max);
}
// Little message recorder, console clearer, and channel wiper. Does other stuff too
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
  if (message.content === 'c.ping') {
    var number = getRandInt(5);
    // Lmao I copied RoboTop a little
    if (number == 0) {
      var comment = 'P o n g. '
    }
    if (number == 1) {
      var comment = 'Who called? '
    }
    if (number == 2) {
      var comment = 'How may I help you? '
    }
    if (number == 3) {
      var comment = '._. '
    }
    if (number == 4) {
      var comment = '😩 '
    }
    if (number == 5) {
      var comment = 'hehehe  '
    }

    message.channel.send('`'+comment+'('+Math.round(bot.ws.ping)+'ms)`');
    console.log("'"+message.author.username+"' pinged CloudBot")
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
          if (addon.filereserve == 'true') {
            const check1 = reserve.LookFor(fld)
            if (check1 == 'true') {
              message.reply('`Hey, no Windows reserved device names allowed!`')
              console.log("CloudBot stopped '"+message.author.username+"' from making Windows device names.")
            } else {
              fs.mkdirSync(fld)
              message.channel.send("`Folder named '"+fld+"' created. Yay.`");
              console.log("CloudBot created a folder named '"+fld+"'");
            }
          } else {
            fs.mkdirSync(fld)
            message.channel.send("`Folder named '"+fld+"' created. Yay.`");
            console.log("CloudBot created a folder named '"+fld+"'");
          }
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
            message.channel.send("`Directory '"+dfld+"' deleted. Hip hip hooray.`");
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
            message.channel.send("`Changed directory to '"+cfld+"'. *CLAP CLAP*`");
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
  // Lists the content of a directory (small, but important)
  if (message.content === 'c.ls') {
    const fld = './' // verrry simple code, you don't even need args!
  
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
    message.reply('`hi :)`');
    console.log("CloudBot said hi to '"+message.author.username+"'");
  }
  if (message.content === 'c.purpose') {
    message.reply('`I am basically a cloud server for Discord. I am pure Node.JS. Although I may not have that many functions, the cloud server functions make up for this!`');
    console.log("CloudBot told '"+message.author.username+"' about why he exists");
  }
  if (message.content === 'c.help') {
    const Embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Commands')
      .setAuthor('CloudBot', 'https://raw.githubusercontent.com/themysticsavages/cloudbot-discord/main/bin/avatar.png', 'https://github.com/themysticsavages/cloudbot-discord')
      .setDescription('Prefix : `'+prefix+'`\n\n😐 Not file-server commands > `'+'help`, `hi`, `cclear`, `clear`, `ping`'+'\n📁 File-server commands > `'+'mkdir`, `ddel`, `new`, `del`, `write`, `read`'+'\n❓ Just random > `'+"random`, `translate`, `scrape`"+"\n🔧 Moderator commands > `ban`"+"\n\n*Type c.help. [command] for a detailed use of a command*\n**You're welcome**")
      .setTimestamp()
      .setFooter('@themysticsavages', 'https://github.com/themysticsavages');

    message.reply(Embed);
    console.log("CloudBot gave help to '"+message.author.username+"'");
  }
  
  // Extended help library; a nice touch; had to join code to do MemoryLeak warnings
  if (message.content === 'c.help.mkdir') {
    message.reply('`Creates a directory\nusage: c.mkdir example`'); 
    console.log("CloudBot gave help on making directories to '"+message.author.username+"'");
  }
  if (message.content === 'c.help.ddel') {
    message.reply('`Removes a directory (needs admin role)\nusage: c.ddel example`')
    console.log("CloudBot gave help to '"+message.author.username+"' on removing directories");
  }
  if (message.content === 'c.help.new') {
    message.reply('`Makes a new file with any extension\nusage: c.new example.txt`')
    console.log("CloudBot gave help on how to make files to '"+message.author.username+"'")
  }
  if (message.content === 'c.help.del') {
    message.reply('`Deletes a file (needs admin role)\nusage: c.del example.txt`')
    console.log("CloudBot gave help on deleting files to '"+message.author.username+"'")
  }
  if (message.content === 'c.help.cd') {
    message.reply('`Changes directory\nusage: c.cd example`')
    console.log("CloudBot gave more help to '"+message.author.username+"' on how to change directories")
  }
  if (message.content === 'c.help.write') {
    message.reply('`Writes text to file (needs admin role)\nusage: c.wr example.txt test_file (make sure it is ONE string! multiple string writes will be implemented later)`')
    console.log("CloudBot told '"+message.author.username+"' how to write to files")
  }
  if (message.content === 'c.help.read') {
    message.reply('`Gets text from file\nusage: c.rd example.txt`')
    console.log("CloudBot helped '"+message.author.username+"' to read from files.")
  }
  if (message.content === 'c.help.ban') {
    message.reply('`Ban a member (needs "Ban members" role) with a default reason\nusage: c.ban @examplemember`')
    console.log("CloudBot told '"+message.author.username+"' how to ban a member")
  }
  if (message.content === 'c.help.random') {
    message.reply('`Make a random number\nusage: c.random 420`')
    console.log("CloudBot told '"+message.author.username+"' how to generate random numbers")
  }
  if (message.content === 'c.help.scrape') {
    message.reply('`Get a Bing search\nusage: c.scrape apples`')
    console.log("CloudBot told '"+message.author.username+"' how to get searches")
  }
  if (message.content === 'c.help.translate') {
    message.reply('`Translate text to ASCII and back\nusage: c.translate ascii meme\n     : c.translate text 109-101-109-101`')
    console.log("CloudBot helped '"+message.author.username+"' translate things")
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
					  if (addon.filereserve == 'true') {
              const res = reserve.LookFor(f)
              if (res == 'true') {
                message.reply('`Hey, no Windows reserved device names allowed!`')
                console.log("CloudBot stopped '"+message.author.username+"' from making Windows device names.")
              } else {
                fs.appendFileSync(f, '')
                message.reply("`File named '"+f+"' created. Woohoo.`");
                console.log("CloudBot created a file named '"+f+"'");
              }
            } else {
              fs.appendFileSync(f, '')
              message.reply("`File named '"+f+"' created. Woohoo.`");
              console.log("CloudBot created a file named '"+f+"'");
            }
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
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'write') {
    var err = 0;
    if (!args[1]) {
      message.reply("`What file should I write? ._.`")
      console.log("CloudBot couldn't find any arguments")
      err++
    }
    if (args[2]) {
      const fw = args[1]
      const ct = args[2]

      fs.writeFileSync(fw, ct, err => {
        if (err) {
          message.reply("Oh no! Not an unknown error!")
          console.log("CloudBot error: Unrecognized error")
          return;
        }
      });
      message.reply("`Wrote to "+`'${fw}'`+" successfully. Yay`")
      console.log("CloudBot wrote to '"+fw+"'")
    }
  }
  if (cmd === 'read') {
    var err = 0;
    if (args[1]) {
      if (err == 0) {
        const rd = args[1]
        try {
          const data = fs.readFileSync(rd, 'utf8')
          message.reply("`\nContents of '"+rd+"':\n"+data+"`")
        } catch (err) {
          message.reply("Where is that file? .-.")
          console.log("CloudBot error: File doesn't exist")
        }
      }
    } else {
      message.reply('`Where did you put the file argument? ._.`')
      console.log('CloudBot failed to find an argument')
    }
  }
});

// Ban people who abuse the system (borrowed code from discordjs readme: https://bit.ly/3e0xbAT)
bot.on('message', message => {
  // Don't worry, I modified the code!
  if (!message.guild) return;
  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (message.content.startsWith('c.ban')) {
      const user = message.mentions.users.first();
      if (user) { // Resolves user when mentioned in Discord message
        const member = message.guild.members.resolve(user);
        if (user.id === message.author.id) {
          // Some protection
          message.reply('**No**');
          console.log('CloudBot stopped '+message.author.username+' from banning him/herself');
        };
        if (member) {
          member
            .ban({
              // insert reason here
              reason: "I wouldn't ban you without a reason! It's probably because the mods noticed that you were abusing the file system in some kind of way.",
            })
            .then(() => { // haha spammer go bye bye
              message.reply(`Banned ${user.tag}. *F to pay respects*`);
              console.log(`CloudBot banned ${user.tag}`);
            })
            .catch(err => {
              // In case you have a dumb admin on your server...
              message.reply('`Not today, thank you`');
              console.log("CloudBot protected himself from getting banned by "+message.author.username);
            });
        } else {
          // .-.
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

// Dependent functions from here
bot.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	
	const args = message.content.trim().split(/ +/g);
	const cmd = args[0].slice(prefix.length).toLowerCase();
	
	if (cmd === 'scrape') {
		var err = 0;
		if (!args[1]) {
			message.reply('`What is the search you want to scrape? ._.`')
			console.log('CloudBot could not find a search to scrape')
			err++
		}
		if (!args[2]) {
			if (err == 1) {
			}
		else {
			if (addon.webscraper == 'true') {
				const scrape = args[1]
				const process = spawn('py', ['./addons/webscraper/scrape.py ',scrape]);
				process.stdout.on('data', (data) => {
					message.reply('`Search of '+scrape+':`\n`'+data.toString()+'`')
					console.log("CloudBot gave search for '"+scrape+"'")
				});	
			} else {
				message.reply('`The webscraper addon is blocked.`')
				console.log('CloudBot noticed that the webscraper addon was blocked.')
			}
		}
	}
  }
  if (cmd === 'translate') {
    var err = 0;
		if (!args[1]) {
			message.reply('`What is the thing you want to translate? ._.`')
			console.log('CloudBot could not find a string to translate')
			err++
		}
    if (!args[3]) {
			if (err == 1) {
			}
		else {
			if (addon.asciitext == 'true') {
        const fn = args[1]
        const text = args[2]

        const py = spawn('py', ['./addons/asciitext/print.py',fn,text]);
        py.stdout.on('data', function (data) {
          message.reply('`Conversion of '+text+'`\n`'+data.toString()+'`')
          console.log("CloudBot gave ASCII-Text conversion for '"+text+"'")
        });
			} else {
				message.reply('`The asciitext addon is blocked.`')
				console.log('CloudBot noticed that the asciitext addon was blocked.')
			}
		}
	}
  }
});

// Insert your token here; replace.py should also do this job too.
bot.login('bot_token');

/*
   Problem? 
   
   Report bugs to Issues?
   It would definetly help, although most of the time, 
   I do find the issue during testing.
   
   Want to copy?
   
   pls don't copy the entire bot ._.
   You can take functions like addons, however.
   I don't think the MIT license allows full copying, anyway.
*/
