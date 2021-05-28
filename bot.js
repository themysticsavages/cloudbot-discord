/* CloudBot - A file server for Discord 

   Best used in a private server among responsible members
   It was hard adding semi-colons to everything, just to have "better syntax"
   You're lucky I made this bot open-source!
   not a lot of people do that
   
   Read the MIT license; for it will help you with bot usage

(c) 2021 themysticsavages */

const Discord = require('discord.js');
const fs = require('fs');

const cfg = require('./config.json')
const bot = new Discord.Client();

const prefix = 'c.'; // You can edit the prefix
const sub = 'CloudBot'; // You can change this to change what the bots logs in console

const { spawn } = require('child_process');
const process = require('process')

console.clear()

function getRandInt(max) {
  return Math.floor(Math.random() * max);
}

// Creates space for logging events; oh yeah, it also 'streams', so I made it so that the 'Watch' button plays a random video from the 10.
bot.on('ready', () => {
  var video = getRandInt(10)
  
  // They are just songs
  if (video == 1) { var video = 'https://www.youtube.com/watch?v=_5w8SJ3yVsc' }
  if (video == 2) { var video = 'https://www.youtube.com/watch?v=lrpS69H1RRU' }
  if (video == 3) { var video = 'https://www.youtube.com/watch?v=yanwIwtlzEI' }
  if (video == 4) { var video = 'https://www.youtube.com/watch?v=Cf5KOTB7Ew8' }
  if (video == 5) { var video = 'https://www.youtube.com/watch?v=5WXyCJ1w3Ks' }
  if (video == 6) { var video = 'https://www.youtube.com/watch?v=UHGvNoRPCQA' }
  if (video == 7) { var video = 'https://www.youtube.com/watch?v=LfgzPpmjM0M' }
  if (video == 8) { var video = 'https://www.youtube.com/watch?v=GcopfMYIApQ' }
  if (video == 9) { var video = 'https://www.youtube.com/watch?v=4BD2Bxv2_qI' }
  if (video == 10) { var video = 'https://www.youtube.com/watch?v=uxo-NasJslw'}

  console.info(sub+' is connected\n---------------------');
  bot.user.setPresence({
    status: 'online',
    activity: {
        name: 'Callback Hell 2 | '+prefix+'.?', // lmao i hate callbacks
        type: 'STREAMING',
        url: video
      }
  });
});

// Little message recorder, console clearer, and channel wiper. Does other stuff too
bot.on('message', async message => {
  if (message.author.username.includes(sub)) { // If the message includes the substring 'CloudBot', it won't print any replies
    
  } else {
    console.log(message.author.username+' > '+message.content)
  }
  if (message.content === prefix+'cclear' || message.content === prefix+'cls') {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      console.clear()
      console.info(sub+' is connected\n---------------------');
    } else {
      message.reply('`You no have admin! The administrator role is required to clear the console.`');
      console.log(sub+" error: Insufficient privileges to clear console");
    }
  }
  if (message.content === prefix+'clear' || message.content === prefix+'c') {
    if (message.member.hasPermission("ADMINISTRATOR")) {
    const dmsg = 99 // You can change this but uh probably not

    message.channel.bulkDelete(dmsg)
    console.log("Deleted every message in '"+message.channel.name+"'")
  } else {
    message.reply('`You no have admin! The administrator role is required to clear channels.`');
    console.log(sub+" error: Insufficient privileges to clear channels");
  }
}
  if (message.content === prefix+'ping' || message.content == sub+'!') {
    var number = getRandInt(13);
    
    // More randomization! 🎲
    if (number == 0) { var comment = 'B O O P. ' }
    if (number == 1) { var comment = 'Yes? ' }
    if (number == 2) { var comment = 'Hi how are ya  ' }
    if (number == 3) { var comment = '._. ' }
    if (number == 4) { var comment = 'why tho ' }
    if (number == 5) { var comment = 'G`day ' }
    if (number == 6) { var comment = '¯\_(ツ)_/¯ ' }
    if (number == 7) { var comment = 'When bot is ping: ' }
    if (number == 8) { var comment = "Don't you have anything to do besides ping me? " }
    if (number == 9) { var comment = 'helo ' }
    if (number == 10) { var comment = '😳 Ping is 🆘 💯% ' }
    if (number == 11) { var comment = 'POV: you are bot dev and you are trying to make unique reply ' }
    if (number == 12) { var comment = '👞 Ṕ̴̡̠̲̩̝͓̜̑̿͋͐̕͠͝o̷̭͚̙̼̫̮̘̐̈́̂͐͘̕ņ̴͉̟͔͎̓̀̽͊͒͌͘g̷̦̤̓͌́̌̿̿̚̚' }
    if (number == 13) { var comment = 'BOT REPLY SPEEDRUN ANY% ' }
	  
    message.channel.send('`'+comment+'('+Math.round(bot.ws.ping)+'ms)`');
    console.log("'"+message.author.username+"' pinged "+sub)
  }
  if (message.content === prefix+'uptime' || message.content == prefix+'up') {
    message.channel.send('`'+sub+' uptime: '+Math.round(process.uptime())+' seconds`')
    console.log(sub+' gave the bot uptime')
  }
  // Lists the content of a directory (small, but important)
  if (message.content === prefix+'ls') {
    const fld = './' // verrry simple code, you don't even need args!
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          message.channel.send(file);
        });
      });
    }
});




// A couple of sentient replies for this nice bot
bot.on('message', message => {
  if (message.content === prefix+'hi') {
    message.reply('`hi :)`');
    console.log(sub+" said hi to '"+message.author.username+"'");
  }
  if (message.content === prefix+'purpose') {
    // This is one of the first functions for this Discord bot 😁
    message.reply('`I am basically a cloud server for Discord. I am pure Node.JS. Although I may not have that many functions, the cloud server functions make up for this!`');
    console.log(sub+" told '"+message.author.username+"' about why he exists");
  }
  if (message.content === prefix+'help' || message.content === prefix+'?') {
    const Embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Commands')
      .setAuthor(sub, 'https://raw.githubusercontent.com/themysticsavages/cloudbot-discord/main/bin/avatar.png', 'https://github.com/themysticsavages/cloudbot-discord')
      .setDescription('Prefix : `'+prefix+'`\n\n😐 Not file-server commands > `'+'help`, `hi`, `cclear`, `clear`, `ping`, `uptime`'+'\n📁 File-server commands > `'+'`write`, `read`, `del`'+'\n❓ Just random > `'+"random`, `translate`, `scrape`, `weather`, `gifpy`, `scratch`"+"\n🔧 Moderator commands > `ban`"+"\n\n*Type c.help. [command] for a detailed use of a command*\n**You're welcome**")
      .setTimestamp()
      .setFooter('@themysticsavages', 'https://github.com/themysticsavages');

    message.reply(Embed);
    console.log(sub+" gave help to '"+message.author.username+"'");
  }
  
  // Extended help library; a nice touch; had to join code to do MemoryLeak warnings
  if (message.content === prefix+'help.mkdir' || message.content === prefix+'?.md') {
    message.reply('`Creates a directory\nusage: '+prefix+'mkdir example\nAliases: '+prefix+'mkdir, '+prefix+'md`'); 
    console.log(sub+" gave help on making directories to '"+message.author.username+"'");
  }
  if (message.content === prefix+'help.ddel' || message.content === prefix+'?.dd') {
    message.reply('`Removes a directory (needs admin role)\nusage: '+prefix+'ddel example\nAliases: '+prefix+'ddel, '+prefix+'dd`')
    console.log(sub+" gave help to '"+message.author.username+"' on removing directories");
  }
  if (message.content === prefix+'help.del') {
    message.reply('`Deletes a file (needs admin role)\nusage: '+prefix+'del example.txt`')
    console.log(sub+" gave help on deleting files to '"+message.author.username+"'")
  }
  if (message.content === prefix+'help.cd') {
    message.reply('`Changes directory\nusage: '+prefix+'cd example`')
    console.log(sub+" gave more help to '"+message.author.username+"' on how to change directories")
  }
  if (message.content === prefix+'help.write' || message.content === prefix+'?.wr') {
    message.reply('`Writes text to file (needs admin role)\nusage: '+prefix+'wr example.txt test_string (make sure it is ONE string! multiple string writes will be implemented later)\nAliases: '+prefix+'write, '+prefix+'wr`')
    console.log(sub+" told '"+message.author.username+"' how to write to files")
  }
  if (message.content === prefix+'help.read' || message.content === prefix+'?.rd') {
    message.reply('`Gets text from file\nusage: '+prefix+'rd example.txt\nAliases: '+prefix+'read, '+prefix+'rd`')
    console.log(sub+" helped '"+message.author.username+"' to read from files.")
  }
  if (message.content === prefix+'help.ban' || message.content === prefix+'?.ban') {
    message.reply('`Ban a member (needs "Ban members" role) with a default reason\nusage: '+prefix+'ban @examplemember`')
    console.log(sub+" told '"+message.author.username+"' how to ban a member")
  }
  if (message.content === prefix+'help.random' || message.content === prefix+'?.r') {
    message.reply('`Make a random number\nusage: '+prefix+'random 420\nAliases: '+prefix+'random, '+prefix+'r`')
    console.log(sub+" told '"+message.author.username+"' how to generate random numbers")
  }
  if (message.content === prefix+'help.search' || message.content === prefix+'?.sr') {
    message.reply('`Get a Bing search\nusage: c.search apples\nAliases: c.search, c.sr`')
    console.log(sub+" told '"+message.author.username+"' how to get searches")
  }
  if (message.content === prefix+'help.translate' || message.content === prefix+'?.tr') {
    message.reply('`Translate text to ASCII and back\nusage: '+prefix+'translate ascii meme\n     : '+prefix+'translate text 109-101-109-101\nAliases: '+prefix+'translate, '+prefix+'tr`')
    console.log(sub+" helped '"+message.author.username+"' translate things")
  }
  if (message.content === prefix+'help.weather' || message.content === prefix+'?.w') {
    message.reply('`Get the weather in a certain area (One word only)\nusage: '+prefix+'weather Frankfurt\nAliases: '+prefix+'weather, '+prefix+'w`')
    console.log(sub+" helped '"+message.author.username+"' with the weather command")
  }
  if (message.content === prefix+'help.gif') {
    message.reply('`Get a GIF from GIPHY with a single keyword\nusage: '+prefix+'gif minecraft`')
    console.log(sub+" helped '"+message.author.username+"' with the weather command")
  }
  if (message.content === prefix+'help.scratch' || message.content === prefix+'?.scr') {
    message.reply('`Get info about a Scratch user\nusage: '+prefix+'scratch ajskateboarder`\nAliases: c.scratch, c.scr')
    console.log(sub+" helped '"+message.author.username+"' with the weather command")
  }
  // Commands for fun
  if (message.content.startsWith(prefix)) {
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'random' || cmd === 'r') {
      const max = args[1]
      if (!args[1] || args[1].includes('-')) {
        message.reply("`What is the number? ._.`")
        console.log(sub+" couldn't find the number to use")
      } else {
        var randomnumber = Math.floor(Math.random() * max)
        message.reply("`"+randomnumber+"`");
        console.log(sub+' generated a random number');
      }
   }
}
});

// Delete files; requires admin role
bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'del') {
    var err = 0;
      if (!args[1]) {
        message.reply("`What is the file name? ._.`")
        console.log(sub+" couldn't find the file argument")
        err++;
      }
      if (!args[2]) {
        if (err == 1) {
      } else {
        const fd = args[1]

        try {
          if (message.member.hasPermission("ADMINISTRATOR")) {
          fs.unlinkSync(fd, { recursive: true })
          message.reply("`File named '"+fd+"' was deleted. Wow.`");
          console.log(sub+" deleted folder named '"+fd+"'");
        } else {
          message.reply('You no have admin! The administrator role is required to delete files.');
          console.log(sub+" error: Insufficient privileges to delete the file '"+fd+"'");
        }
      } catch (err) {
          message.reply('`Is that a file? ._.`');
          console.log(sub+' error: File does not exist');
     }
    }
   }
  }
});

// Writing text to files and returning text; pretty clean code if I do say so myself; you can also make files with this too
bot.on('message', message => {
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === 'write' || cmd === 'wr') {
    var err = 0;
    if (!args[1]) {
      message.reply("`What file should I write? ._.`")
      console.log(sub+" couldn't find any arguments")
      err++
    }
    if (args[2]) {
      const fw = args[1]
      const ct = args[2]
        fs.writeFileSync(fw, ct, err => {
          if (err) {
            message.reply("Oh no! Not an unknown error!")
            console.log(sub+" error: Unrecognized error")
            return;
          }
        });
        message.reply("`Wrote to "+`'${fw}'`+" successfully. Yay`")
        console.log(sub+" wrote to '"+fw+"'")
    }
  }
  if (cmd === 'read' || cmd === 'rd') {
    var err = 0;
    if (args[1]) {
      if (err == 0) {
        const rd = args[1]
        try {
          const data = fs.readFileSync(rd, 'utf8')
          message.reply("`\nContents of '"+rd+"':\n"+data+"`")
        } catch (err) {
          message.reply("Where is that file? .-.")
          console.log("sub+ error: File doesn't exist")
        }
      }
    } else {
      message.reply('`Where did you put the file argument? ._.`')
      console.log(sub+' failed to find an argument')
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
          console.log(sub+' stopped '+message.author.username+' from banning him/herself');
        };
        if (member) {
          member
            .ban({
              // insert reason here
              reason: "I wouldn't ban you without a reason! It's probably because the mod(s) noticed that you were abusing the file system in some kind of way.",
            })
            .then(() => { // haha spammer go bye bye
              message.reply(`Banned ${user.tag}. *F to pay respects*`);
              console.log(sub+` banned ${user.tag}`);
            })
            .catch(err => {
              // In case you have a dumb admin on your server...
              message.reply('`Not today, thank you`');
              console.log(sub+" protected himself from getting banned by "+message.author.username);
            });
        } else {
          // .-.
          message.reply("`That user isn't in this guild ._.`");
          console.log(sub+" error: User does not exist");
        }
      } else {
        message.reply("`You didn't mention the user to ban ._.`");
        console.log(sub+" error: User not mentioned");
      }
    }
  }
});

// Dependent functions from here
bot.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	
	const args = message.content.trim().split(/ +/g);
	const cmd = args[0].slice(prefix.length).toLowerCase();
	
	if (cmd === 'search' || cmd === 'sr') {
		var err = 0;
		if (!args[1]) {
			message.reply('`What is the keyword you want to search? ._.`')
			console.log(sub+' could not find a keyword to search')
			err++
		}
		if (!args[2]) {
			if (err == 1) {
			}
		else {
			if (cfg['addons']['webscraper'] == 'true') {
				const scrape = args[1]
				const process = spawn('py', ['./addons/webscraper/webscaper.py ',scrape]);
				process.stdout.on('data', (data) => {
					message.channel.send('`Search of '+scrape+':`\n`'+data.toString()+'`')
					console.log(sub+" gave search for '"+scrape+"'")
				});	
			} else {
				message.reply('`The webscraper addon is blocked.`')
				console.log(sub+' noticed that the webscraper addon was blocked')
			}
		}
	}
  }
  if (cmd === 'endecode' || cmd === 'edc') {
    var err = 0;
		if (!args[1]) {
			message.reply('`What is the thing you want to encode/decode? ._.`')
			console.log(sub+' could not find a string to encode or decode')
			err++
		}
    if (!args[3]) {
			if (err == 1) {
			}
		else {
			if (cfg['addons']['asciitext'] == 'true') {
        const fn = args[1]
        const text = args[2]

        const py = spawn('py', ['./addons/asciitext/asciitext.py',fn,text]);
        py.stdout.on('data', function (data) {
          message.reply('`Encoding or decoding of '+text+'`\n`'+data.toString()+'`')
          console.log(sub+" gave endecoding for '"+text+"'")
        });
			} else {
				message.reply('`The asciitext addon is blocked.`')
				console.log(sub+' noticed that the asciitext addon was blocked')
			}
		}
	}
}
if (cmd === 'weather' || cmd === 'w') {
  var err = 0;
    if (!args[1]) {
      message.reply('`Where do you want to get the weather? ._.`')
      console.log(sub+' could not find the place to get the weather')
      err++
    }
    const place = args[1]
    const weather = require('./addons/weather/weather.js')


    if (cfg['addons']['weather'] == 'true') {
      weather.get(place, function(response){
        message.channel.send('`'+response+'`');
        console.log(sub+' gave the weather in '+place)
      })
    } else {
      message.reply('`The weather addon is blocked.`')
      console.log(sub+' noticed that the weather addon was blocked')
    }
  }
  if (cmd === 'gif') {
    var err = 0;
		if (!args[1]) {
			message.reply('`What is the GIF you want to find? ._.`')
			console.log(sub+' could not find a keyword to search')
			err++
		}
    if (!args[3]) {
			if (err == 1) {
			}
		else {
			if (cfg['addons']['gifpy'] == 'true') {
        const query = args[1]

        const py = spawn('py', ['./addons/gifpy/gifpy.py',query]);
        py.stdout.on('data', function (data) {
          message.channel.send(data.toString())
          console.log(sub+' gave a GIF for the keyword '+query)
        });

			} else {
				message.reply('`The gifpy addon is blocked.`')
				console.log(sub+' noticed that the gifpy addon was blocked')
			}
		}
	}
}
if (cmd === 'scratch' || cmd === 'scr') {
  var err = 0;
  if (!args[1]) {
    message.reply('`What is the account info you want? ._.`')
    console.log(sub+' could not find a user to search')
    err++
  }
  if (!args[3]) {
    if (err == 1) {
    }
  else {
    if (cfg['addons']['scratch'] == 'true') {
      const query = args[1]

      const process = spawn('py', ['./addons/scratch/scratch.py',query]);
      process.stdout.on('data', (data) => {
                  const result = data.toString().split(',')

                  const date = result[0]
                  const avatar = result[1]
                  const bio = result[2]

                  const Embed = new Discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setTitle(query)
                  .setURL('https://scratch.mit.edu/users/'+query)
                  .setAuthor('Scratch', 'https://u.cubeupload.com/csf30816/5aVuDN.png', 'https://scratch.mit.edu')
                  .setDescription('Desc: '+bio)
                  .setThumbnail(avatar)
                  .setTimestamp()
                  .setFooter('Join date: '+date+'\n')
            
                message.reply(Embed);
      });	
    } else {
      message.reply('`The gifpy addon is blocked.`')
      console.log(sub+' noticed that the gifpy addon was blocked')
    }
  }
}
}
});

// Insert your token here
bot.login(cfg.DISCORD_TOKEN)
