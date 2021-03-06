/* CloudBot - A multipurpose bot for Discord 

   Best used in a private server among responsible members
   It was hard adding semi-colons to (almost) everything, just to have "better syntax"
   You're lucky I made this bot open-source!
   not a lot of people do that
   
   Read the included MIT license; for it will help you with bot usage
   Really sorry if the code looks unorganized lmao   

(c) 2021 themysticsavages */

const Discord = require('discord.js');
const fs = require('fs');
const cfg = require('./config.json');
const { spawn } = require('child_process');
const btn = require('discord-buttons');
const fetch = require('node-fetch');
const DisTube = require('distube');
const bot = new Discord.Client();
const tubebot = new DisTube(bot, {searchSongs: false, emitNewSongOnly: true});

const dfix = 'c.'; // You can edit the prefix
const sub = 'CloudBot'; // You can change this to change what the bot logs in console

const talkedRecently = new Set();
const prefix = require('discord-prefix')
const sqlite = require('sqlite3')
let db = new sqlite.Database('./settings.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)

var datetime = new Date();
db.run(`CREATE TABLE IF NOT EXISTS data(serverid, welcomeid, welcomemsg)`)
bot.setMaxListeners(99)
console.clear()
btn(bot)

function getRandInt(max) { return Math.floor(Math.random() * max); }

// Creates space for logging events; oh yeah, it also 'streams', so I made it so that the 'Watch' button plays a random video from the 10.
bot.on('ready', () => {
  var video = getRandInt(10)
  
  // They are just songs
  if (video === 1) { var video = 'https://www.youtube.com/watch?v=_5w8SJ3yVsc' }
  if (video === 2) { var video = 'https://www.youtube.com/watch?v=lrpS69H1RRU' }
  if (video === 3) { var video = 'https://www.youtube.com/watch?v=yanwIwtlzEI' }
  if (video === 4) { var video = 'https://www.youtube.com/watch?v=Cf5KOTB7Ew8' }
  if (video === 5) { var video = 'https://www.youtube.com/watch?v=5WXyCJ1w3Ks' }
  if (video === 6) { var video = 'https://www.youtube.com/watch?v=UHGvNoRPCQA' }
  if (video === 7) { var video = 'https://www.youtube.com/watch?v=LfgzPpmjM0M' }
  if (video === 8) { var video = 'https://www.youtube.com/watch?v=GcopfMYIApQ' }
  if (video === 9) { var video = 'https://www.youtube.com/watch?v=4BD2Bxv2_qI' }
  if (video === 10) { var video = 'https://www.youtube.com/watch?v=uxo-NasJslw'}

  console.info(sub+` is connected\n---------------------\n[${sub}] Active in ${bot.guilds.cache.size} servers`);
  bot.user.setPresence({
    status: 'online',
    activity: {
        name: 'git.io/Jchuw | '+dfix+'?',
        type: 'STREAMING',
        url: video
      }
  });
});

// Little message recorder, console clearer, and channel wiper. Does other stuff too
bot.on('message', async message => {
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  let args = message.content.slice(guildPrefix.length).split(' ')
  const cmd = args[0].toLowerCase()

  if (message.author.username.includes(sub) || message.author.bot) { // If the message from a bot, it won't be logged
  } else {
    console.log(message.author.username+'#'+message.author.discriminator+' > '+message.content)
  }
  if (cmd ===  'cclear' || cmd ===  'cls') {
    if (message.author.tag === 'ajskateboarder#0758') {
      console.clear(); console.log(sub+` is connected\n---------------------\n[${sub}] Active in ${bot.guilds.cache.size} servers`)
    }
  }
  if (cmd ===  'clear' || cmd ===  'c') {
    if (message.member.hasPermission("ADMINISTRATOR")) {
    if (!args[1]) {
      message.channel.bulkDelete(2)
      console.log(sub+" deleted 1 message in '"+message.channel.name+"'")
    } else {
        const dmsg = parseInt(args[1])+1
        message.channel.bulkDelete(dmsg)
        console.log(sub+" deleted "+dmsg+" messages in '"+message.channel.name+"'")
    }
  } else {
    message.reply('`You no have admin! The administrator role is required to clear messages.`');
    console.log(sub+" error: Insufficient privileges to clear messages");
  }
}
  if (cmd ===  'ping') {
    var number = getRandInt(13);
    
    // More randomization! ????
    if (number === 0) { var comment = 'B O O P. ' }
    if (number === 1) { var comment = 'Yes? ' }
    if (number === 2) { var comment = 'Hi how are ya  ' }
    if (number === 3) { var comment = '._. ' }
    if (number === 4) { var comment = 'why tho ' }
    if (number === 5) { var comment = 'G`day ' }
    if (number === 6) { var comment = '??\_(???)_/?? ' }
    if (number === 7) { var comment = 'When bot is ping: ' }
    if (number === 8) { var comment = "Don't you have anything to do besides ping me? " }
    if (number === 9) { var comment = 'helo ' }
    if (number === 10) { var comment = '???? Ping is ???? ????% ' }
    if (number === 11) { var comment = 'POV: you are bot dev and you are trying to make unique reply ' }
    if (number === 12) { var comment = '???? P????????????????????????????????o????????????????????????????n??????????????????????????g??????????????????????' }
    if (number === 13) { var comment = 'BOT REPLY SPEEDRUN ANY% ' }
	  
    message.channel.send('`'+comment+'('+Math.round(bot.ws.ping)+'ms)`');
    console.log("'"+message.author.username+"' pinged "+sub)
  }
  if (cmd === 'uptime' || cmd === 'up') {
    const embed = new Discord.MessageEmbed()
    .setDescription(`Up since **${datetime.toISOString().slice(0,10)}**`)
    message.channel.send(embed)
  }
  // Lists the content of a directory (small, but important)
  if (cmd ===  'ls') {
    const fld = './env/' // verrry simple code, you don't even need args!
    fs.readdir(fld, (err, files) => {
        files.forEach(file => {
          message.channel.send(file);
        });
      });
    }
  if (message.content === '<@!835841382882738216>') {
    const embed = new Discord.MessageEmbed()
      .setTitle('You called?')
      .setDescription('My prefix in this server is `'+guildPrefix+'` and you can get my commands with `'+guildPrefix+'help`!')
    message.channel.send(embed)
    console.log(sub+" gave '"+message.author.username+"' the prefix")
  }
});

// (insert prefix command here)
bot.on('message', message => {
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  let args = message.content.slice(guildPrefix.length).split(' ')
  if (!message.content.startsWith(guildPrefix)) return
  const cmd = args[0].toLowerCase()

  if (cmd ===  'hi') {
    message.reply('`hi :)`');
    console.log(sub+" said hi to '"+message.author.username+"'");
  }
  if (cmd ===  'sus') {
    message.react('???????').then(
    message.react('??????').then(
    message.react('???????').then(
    message.react('????').then(
    message.react('????').then(
    message.react('????').then(
    message.reply('????????? you have been sussed').then((messagE) => {
      setTimeout(function() {messagE.delete()}, 5000)
    })
    )
    )
    )
    )
    )
    )
  }
if (cmd === 'help' || cmd === '?') {
    page = 1
    const embed = new Discord.MessageEmbed().setTitle(pages[page-1]).setFooter(`${page1c.length} commands ??? Page ${page}/${pages.length}`)
    page1c.forEach((command, index) => {
      const description = page1d[index]
      embed.addField(command, description, true)
    })

    let btn1 = new btn.MessageButton()
    .setStyle('blurple')
    .setLabel('Previous Page')
    .setID('btn1')
    .setDisabled()
    let btn2 = new btn.MessageButton()
      .setStyle('blurple')
      .setLabel('Next Page')
      .setID('btn2')
    let btn3 = new btn.MessageButton()
      .setStyle('url')
      .setURL('https://discord.com/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68612')
      .setLabel('Invite me!')
    let btn4 = new btn.MessageButton()
      .setStyle('url')
      .setURL('https://github.com/themysticsavages/cloudbot-discord')
      .setLabel('Github')
    let buttons = new btn.MessageActionRow()
      .addComponents(btn1, btn2, btn3, btn4);

    message.channel.send(embed, buttons)
	}
  if (cmd ===  'prefix') {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!args[1]) {
        message.reply("`You need to add a prefix to use ._.`");
        console.log(sub+" did not find a prefix");
      } else {
        prefix.setPrefix(args[1], message.guild.id)
        message.channel.send('`??? Server prefix changed successfully! The prefix from now on will be '+args[1]+'.`')
        console.log(sub+' changed the server prefix to '+args[1])
      }
    } else {
      message.reply('`You no have admin! The administrator role is required to change the prefix.`');
      console.log(sub+" error: Insufficient privileges to change the prefix");
    }
  }
  
  const pre = prefix.getPrefix(message.guild.id)

  if (cmd ===  'help.del') {
    message.reply('`Deletes a file (needs admin role)\nusage: '+pre+'del example.txt`')
    console.log(sub+" gave help on deleting files to '"+message.author.username+"'")
  }
  if (cmd ===  'help.write' || cmd ===  '?.wr') {
    message.reply('`Writes text to file (needs admin role)\nusage: '+pre+'wr | example.txt | some random text\nAliases: '+pre+'write, '+pre+'wr`')
    console.log(sub+" told '"+message.author.username+"' how to write to files")
  }
  if (cmd ===  'help.read' || cmd ===  '?.rd') {
    message.reply('`Gets text from file\nusage: '+pre+'rd example.txt\nAliases: '+pre+'read, '+pre+'rd`')
    console.log(sub+" helped '"+message.author.username+"' to read from files.")
  }
  if (cmd ===  'help.ban' || cmd ===  '?.ban') {
    message.reply('`Ban a member (needs "Ban members" role) with a default reason\nusage: '+pre+'ban @examplemember`')
    console.log(sub+" told '"+message.author.username+"' how to ban a member")
  }
  if (cmd ===  'help.random' || cmd ===  '?.r') {
    message.reply('`Make a random number\nusage: '+pre+'random 346\nAliases: '+pre+'random, '+pre+'r`')
    console.log(sub+" told '"+message.author.username+"' how to generate random numbers")
  }
  if (cmd ===  'help.search' || cmd ===  '?.sr') {
    message.reply('`Get a Bing search\nusage: '+pre+'search windows 11\nAliases: '+pre+'search, '+pre+'sr`')
    console.log(sub+" told '"+message.author.username+"' how to get searches")
  }
  if (cmd ===  'help.weather' || cmd ===  '?.w') {
    message.reply('`Get the weather in a certain area\nusage: '+pre+'weather new york city\nAliases: '+pre+'weather, '+pre+'w`')
    console.log(sub+" helped '"+message.author.username+"' with the weather command")
  }
  if (cmd ===  'help.gif') {
    message.reply('`Get a GIF from GIPHY\nusage: '+pre+'gif minecraft parrot`')
    console.log(sub+" helped '"+message.author.username+"' with the GIF command")
  }
  if (cmd ===  'help.scratch' || cmd ===  '?.scr') {
    message.reply('`Get info about a Scratch user\nusage: '+pre+'scratch ajskateboarder\nAliases: '+pre+'scratch, '+pre+'scr`')
    console.log(sub+" helped '"+message.author.username+"' with the Scratch command")
  }
  if (cmd === 'help.youtube' || cmd === '?.yt') {
    message.reply('`Get the first five YouTube videos\nusage: '+pre+'youtube cat\nAliases: '+pre+'youtube, '+pre+'yt`')
    console.log(sub+" helped '"+message.author.username+"' with the YouTube command")
  }
  if (cmd === 'help.shorten' || cmd === '?.sh') {
    message.reply('`Shorten a URL with Rebrandly\nusage: '+pre+'shorten https://google.com \nAliases: '+pre+'shorten, '+pre+'sh`')
    console.log(sub+" helped '"+message.author.username+"' shorten URLs")
  }
  if (cmd === 'help.poll') {
    message.reply("`Start a highly customizable poll with different emojis and a certain vote end count\nusage: "+pre+"poll | is this command nice | ??? | ??? | 5`")
    console.log(sub+" helped '"+message.author.username+"' make polls")
  }
  if (cmd === 'help.fortnite' || cmd === '?.frte') {
    message.reply("`Get recent news in Fortnite and the current map\nusage: "+pre+"fortnite news/stw\n      :"+pre+"fortnite news/br\n      :"+pre+"fortnite news/c\n      :"+pre+"fortnite map\nAliases: "+pre+"fortnite, "+pre+"frte`")
    console.log(sub+" helped '"+message.author.username+"' with the Fortnite command")
  }
  if (cmd === 'help.topmeme' || cmd === '?.memes') {
    message.reply("`Get the top meme IDs on Imgflip\nusage: "+pre+"topmeme [1-2]\nAliases: "+pre+"topmeme, "+pre+"memes`")
    console.log(sub+" helped '"+message.author.username+"' with the topmeme command")
  }
  if (cmd === 'help.memegen' || cmd === '?.mmake') {
    message.reply("`Generate a 2010 meme template!\nusage: "+pre+"memegen 123456 top bottom\nAliases: "+pre+"memegen, "+pre+"mmake`")
    console.log(sub+" helped '"+message.author.username+"' with the art of making memes")
  }
  if (cmd === 'help.download' || cmd === '?.get') {
    message.reply("`Download a file from the Internet to the bot server!\nusage: "+pre+"download http(s)://example.com/file.png picture.png\nAliases: "+pre+"download, "+pre+"get`")
    console.log(sub+" helped '"+message.author.username+"' with downloading files")
  }
  if (cmd === 'help.shield' || cmd === '?.shld') {
    message.reply("`Generate a button with Shields.IO!\nusage: "+pre+"shield | a button | period | blue\nAliases: "+pre+"shield, "+pre+"shld`")
    console.log(sub+" helped '"+message.author.username+"' with the shield command")
  }
  if (cmd === 'help.message' || cmd === '?.msg') {
    message.reply("`Generate a Windows 10-like message box\nusage: "+pre+"message | A message | That simple\nAliases: "+pre+"message, "+pre+"msg`")
    console.log(sub+" helped '"+message.author.username+"' with the message command")
  }
  if (cmd === 'help.rickroll' || cmd === '?.rroll') {
    message.reply("`Checks if a link is a rickroll (video)\nusage: "+pre+"rickroll someredirect.com/diwu98ww\nAliases: "+pre+"rickroll, "+pre+"rroll`")
    console.log(sub+" helped '"+message.author.username+"' with the rickroll command")
  }
  if (cmd === 'help.play' || cmd === '?.pl') {
    message.reply("`Play something from YouTube (pointless)\nusage: "+pre+"play | youtube video\nAliases: "+pre+"play, "+pre+"pl`")
    console.log(sub+" helped '"+message.author.username+"' with playing music")
  }
  if (cmd === 'help.unban') {
    message.reply("`Unban a member\nusage: "+pre+"unban <id>`")
    console.log(sub+" helped '"+message.author.username+"' with unbanning members")
  }
  if (cmd === 'help.avatar' || cmd === '?.av') {
    message.reply("`Get a user avatar\nusage: "+pre+"avatar <user mention>\nAliases: "+pre+"avatar, "+pre+"av`")
    console.log(sub+" helped '"+message.author.username+"' with the avatar command")
  }
  if (cmd === 'help.info' || cmd === '?.i') {
    message.reply("`Get info on the server and channels!\nusage: "+pre+"info, "+pre+"info #channel\nAliases: "+pre+"avatar, "+pre+"av`")
    console.log(sub+" helped '"+message.author.username+"' with the info command")
  }
  if (cmd === 'help.welcome' || cmd === '?.wl') {
    message.reply("`Set a (uneditable) welcome message to greet users with!\nusage: "+pre+"welcome | #welcomes | Welcome to my server! Follow the rules.\nAliases: "+pre+"welcome, "+pre+"wl`")
    console.log(sub+" helped '"+message.author.username+"' with the welcome command")
  }
  if (cmd === 'help.clear' || cmd === '?.c') {
    message.reply("`Clear 1-100 messages\nusage: "+pre+"clear 20\nAliases: "+pre+"clear, "+pre+"c`")
    console.log(sub+" helped '"+message.author.username+"' with the clear command")
  }
  if (cmd === 'help.mute') {
    message.reply("`Mute any user for a specific amount of days\nusage: "+pre+"mute 10 <user mention>\nAliases: "+pre+"clear, "+pre+"c`")
    console.log(sub+" helped '"+message.author.username+"' with the mute command")
  }
  if (cmd === 'help.garfield' || cmd === '?.gf') {
    message.reply("`Get a Garfield comic from any date\nusage: "+pre+"garfield 27.04.2004 (DD-MM-YYYY)\nAliases: "+pre+"garfield, "+pre+"gf`")
    console.log(sub+" helped '"+message.author.username+"' with the garfield command")
  }
  if (cmd === 'help.rps') {
    message.reply("`Play rock paper scissors!\nusage: "+pre+"rps (r, p, s)`")
    console.log(sub+" helped '"+message.author.username+"' with the rps command")
  }

  // Commands for fun
  if (message.content.startsWith(prefix.getPrefix(message.guild.id))) {

    if (cmd ===  'random' || cmd ===  'r') {
      const max = args[1]
      if (!args[1] || args[1].includes('-')) {
        message.reply("`What is the number? ._.`")
        console.log(sub+" couldn't find the number to use")
      } else {
        var randomnumber = Math.floor(Math.random() * max)
        message.channel.send("`"+randomnumber+"`");
        console.log(sub+' generated a random number');
      }
   }
  }
  if (cmd ===  'poll') {
    const args = message.content.slice(guildPrefix.length).split(' | ')

    if (args[4] > 1) {
        message.channel.send('`'+args[1] + ' (get to '+args[4]+' votes to win)`').then((question) => {
        
        const emoji1 = args[2]
        const emoji2 = args[3]

        question.react(emoji1);
        question.react(emoji2);
    
        const filter = (reaction, user) => {
            return [emoji1, emoji2].includes(reaction.emoji.name) && !user.bot;
        };
    
        const collector = question.createReactionCollector(filter, {
            max: args[4],
        });
    
        collector.on('end', (collected, reason) => {
            let userReaction = collected.array()[0];
            let emoji = userReaction._emoji
            .name;
    
            if (emoji === emoji1) {
                question.edit('`'+args[1] + ' (option 1 won)`');
            } else if (emoji === emoji2) {
                question.edit('`'+args[1] + ' (option 2 won)`');
            } else {
                question.edit(`The winning emoji was not a contestant...`);   
            }
        });
        });
    }
    if (args[4] == 1) {
        message.channel.send('`'+args[1] + ' (get to '+args[4]+' vote to win)`').then((question) => {
        
        const emoji1 = args[2]
        const emoji2 = args[3]

        question.react(emoji1);
        question.react(emoji2);
    
        const filter = (reaction, user) => {
            return [emoji1, emoji2].includes(reaction.emoji.name) && !user.bot;
        };
    
        const collector = question.createReactionCollector(filter, {
            max: args[4],
        });
    
        collector.on('end', (collected, reason) => {
            let userReaction = collected.array()[0];
            let emoji = userReaction._emoji.name;
    
            if (emoji === emoji1) {
                question.edit('`'+args[1] + ' (option 1 won)`');
            } else if (emoji === emoji2) {
                question.edit('`'+args[1] + ' (option 2 won)`');
            } else {
                question.edit('`The winning emoji was not a contestant...`');   
            }
        });
        });
    } 
  }
  if (cmd ===  'avatar') {
    if (message.mentions.users.size) {
      let member=message.mentions.users.first()
    if(member){
        const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL()).setTitle(member.username)
        message.channel.send(emb)
        console.log(sub+" sent the avatar of '"+member.username+"'")
        
    } else {
        message.channel.send('`There is no user with that name ._.`')
        console.log(sub+' did not find a user with that name in the server')
    }} else {
        const embed = new Discord.MessageEmbed().setImage(message.author.displayAvatarURL()).setTitle(message.author.username)
        message.channel.send(embed)
        console.log(sub+" sent the avatar of '"+message.author.username+"'")
    }
  }
  if (cmd === 'info' || cmd === 'i') {
    message.content.slice(guildPrefix.length).split(' ')
    if (!args[1]) {
        const icon = message.guild.iconURL()
        const embed = new Discord.MessageEmbed()
            .setTitle(message.guild.name)
            .addField('Owner', message.guild.owner, true)
            .setDescription('???? Text channels: `'+ message.guild.channels.cache.filter((c) => c.type === "text").size.toString()+'`'+'\n???? Voice channels: `'+ message.guild.channels.cache.filter((c) => c.type === "voice").size.toString()+'`\n???? Member count: `'+message.guild.memberCount+'`')
            .setThumbnail(icon)
        message.channel.send(embed)
    }
    if (args[1]) {
        if (args[1].includes('#')) {
            try {
                let channel = message.guild.channels.cache.get(args[1].replace('<', '').replace('>', '').replace('#', ''))
                let msg = bot.channels.cache.get(args[1].replace('<', '').replace('>', '').replace('#', ''))
                if (msg.topic === null) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(message.guild.name + '/' + channel['name'])
                        .setDescription('(No topic)\n Slowmode: `'+channel['rateLimitPerUser']+'`\n NSFW: `'+channel['nsfw'].toString()+'`')
                        message.channel.send(embed)
                        console.log(sub+' gave info on '+message.guild.name+'/'+channel['name'])
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(message.guild.name + '/' + channel['name'])
                    .setDescription(msg.topic+'\n Slowmode: `'+channel['rateLimitPerUser']+'`\n NSFW: `'+channel['nsfw'].toString()+'`')
                    message.channel.send(embed)
                    console.log(sub+' gave info on '+message.guild.name+'/'+channel['name'])
                }
            } catch (err) {
                message.reply("`This channel is private or does not exist! ._.`")
                console.log(sub+' found that the channel was private or non-existant')
            }
        }
    }
}
if (cmd === 'rps') {
	const items = ['r', 'p', 's']
	var item = items[Math.floor(Math.random()*items.length)];
	if (args[1] === 'rock' || args[1] === 'r') {
		if (item === 'r') {
			message.channel.send("`???? I choose rock! It's a tie I guess... ????`")
			console.log(sub+' got a tie with rock option')
		}
		if (item === 'p') {
			message.channel.send("`???? I choose paper! And I win!`")
			console.log(sub+' won with paper option')
		}
		if (item === 's') {
			message.channel.send("`??? I choose scissors! You win :)`")
			console.log(sub+' lost with sci option')
		}
	}
	if (args[1] === 'paper' || args[1] === 'p') {
		if (item === 'r') {
			message.channel.send("`???? I choose rock! You win :)`")
			console.log(sub+' lost with rock option')
		}
		if (item === 'p') {
			message.channel.send("`???? I choose paper! It's a tie I guess... ????`")
			console.log(sub+' got a tie with paper option')
		}
		if (item === 's') {
			message.channel.send("`??? I choose scissors! And I win!`")
			console.log(sub+' won with sci option')
		}
	}
	if (args[1] === 'scissors' || args[1] === 's') {
		if (item === 'r') {
			message.channel.send("`???? I choose rock! And I win!`")
			console.log(sub+' got a tie with rock option')
		}
		if (item === 'p') {
			message.channel.send("`???? I choose paper! You win :)`")
			console.log(sub+' lost with paper option')
		}
		if (item === 's') {
			message.channel.send("`??? I choose scissors! It's a tie I guess... ????`")
			console.log(sub+' got a tie with sci option')
		}
	}
}
if (cmd === 'answer' || cmd === 'ans') {
  if (cfg['addons']['answer'] === 'true') {
    if (!args[1]) {
        message.reply('`Please give a question to answer! ._.`')
        console.log(sub+' did not find a question')
    } else {
        message.channel.startTyping()
        args.shift()

        fetch(`http://api.brainshop.ai/get?bid=${cfg['api']['brainshop']['BRAINID']}&key=${cfg['api']['brainshop']['APIKEY']}&uid=1&msg=${encodeURIComponent(args.join(' '))}`)
        .then((res) => res.json())
        .then((data) => message.channel.send(`\`${data.cnt}\``))

        message.channel.stopTyping()
        console.log(sub+" gave an answer for '"+args.join(' ')+"'")
        }
      
  } else {
    message.reply('`The answer addon is blocked.`')
    console.log(sub+' noticed that the answer addon was blocked')
  }
}
});

let pages = ['???? General commands', '???? Utilities', '???? File commands', '??? Fun', '???? Server commands', '???? Music commands']
let page = 1

let page1c = ['`help/?`', '`hi`', '`ping`', '`uptime/up`', '`poll`', '`pin`', '`avatar`', '`info/i`']; let page1d = ['Get help and commands ???', 'Get a hello ????', 'Ping the bot ????', 'Get the bot uptime ????', 'Create a simple poll with an end count! ????', 'Pin the previous message ????', 'Get a user avatar ????', 'Get server and channel info ????']
let page2c = ['`search/sr`', '`weather/w`', '`gif`', '`scratch/scr`', '`youtube/yt`', '`shorten/sh`', '`rickroll/rroll`', '`memegen/mmake`']; let page2d = ['Search online ????', 'Get the weather ????', 'Return a GIF ????', 'Search on [Scratch](https://scratch.mit.edu) <:scratch:870627066549256203>', 'Get 5 videos from a YouTube search <:youtube:870628673055784990>', 'Shorten a URL ???', 'Check if a link is a Rickroll <:rickroll:870629023540199455>', 'Generate an Imgflip meme! ????']
let page3c = ['`write/wr`', '`read/rd`', '`del`', '`ls`', '`download/get`']; let page3d = ['Create a file for storage ????', 'Read off a file ????', 'Delete a file ???', 'List current files ????', 'Download a file to the bot servers <:download:870629642950811648>']
let page4c = ['`random/r`', '`fortnite/frte`', '`garfield/gf`', '`rps`', '`answer/ans`']; let page4d = ['Return a random number from a range ????', 'gEt FoRtNiTe InFo ????', 'Get a Garfield comic from a certain date <:agnrygarfield:870630754365870140>', 'Play :rock::newspaper::scissors: with the bot', 'Get a somewhat humane answer with [brainshop.ai](https://brainshop.ai)! ????']
let page5c = ['`ban`', '`unban`', '`mute`', '`prefix`', '`cclear`', '`clear/c`', '`welcome`']; let page5d = ['Ban a user ????', 'Unban a user ????', 'Mute a user for a specific # of days ????', 'Change the prefix ????', 'Clear the console (developer only) ???????????', 'Clear a specific number of messages (???100) ????', 'Configure a welcome message ????']
let page6c = ['`play`', '`end`', '`reset`', '`pause`', '`resume`']; let page6d = ['Play some music ???', 'Stop playing music completely ???', 'Reset music to 00:00 ????', 'Pause music ???', 'Resume paused music ???']

bot.on('clickButton', (button) => {
  if (button.id === 'btn1') {
    page--
    if (page < 1) page++
    const embed = new Discord.MessageEmbed().setTitle(pages[page-1]).setFooter(`Page ${page} of ${pages.length}`)

    let btn1 = new btn.MessageButton()
    .setStyle('blurple')
    .setLabel('Previous Page')
    .setID('btn1')

    let btn2 = new btn.MessageButton()
      .setStyle('blurple')
      .setLabel('Next Page')
      .setID('btn2')

    let btn3 = new btn.MessageButton()
      .setStyle('url')
      .setURL('https://discord.com/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68612')
      .setLabel('Invite me!')

    let btn4 = new btn.MessageButton()
      .setStyle('url')
      .setURL('https://github.com/themysticsavages/cloudbot-discord')
      .setLabel('Github')

    let buttons = new btn.MessageActionRow()
      .addComponents(btn1, btn2, btn3, btn4);

    if (page === 1) {
      page1c.forEach((cmd, index) => {
        const description = page1d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page1c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 2) {
      page2c.forEach((cmd, index) => {
        const description = page2d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page2c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 3) {
      page3c.forEach((cmd, index) => {
        const description = page3d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page3c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 4) {
      page4c.forEach((cmd, index) => {
        const description = page4d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page4c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 5) {
      page5c.forEach((cmd, index) => {
        const description = page5d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page5c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 6) {
      page6c.forEach((cmd, index) => {
        const description = page6d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page6c.length} commands ??? Page ${page}/${pages.length}`)
    }

    button.message.delete()
    button.message.reply(embed, buttons)
    } else if (button.id === 'btn2') {
    page++
    if (page > pages.length) page--
    const embed = new Discord.MessageEmbed().setTitle(pages[page-1]).setFooter(`Page ${page} of ${pages.length}`)

    let btn1 = new btn.MessageButton()
    .setStyle('blurple')
    .setLabel('Previous Page')
    .setID('btn1')

    let btn2 = new btn.MessageButton()
      .setStyle('blurple')
      .setLabel('Next Page')
      .setID('btn2')

    let btn3 = new btn.MessageButton()
      .setStyle('url')
      .setURL('https://discord.com/oauth2/authorize?client_id=835841382882738216&scope=bot&permissions=68612')
      .setLabel('Invite me!')

    let btn4 = new btn.MessageButton()
      .setStyle('url')
      .setURL('https://github.com/themysticsavages/cloudbot-discord')
      .setLabel('Github')

    let buttons = new btn.MessageActionRow()
      .addComponents(btn1, btn2, btn3, btn4);

    if (page === 1) {
      page1c.forEach((cmd, index) => {
        const description = page1d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page1c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 2) {
      page2c.forEach((cmd, index) => {
        const description = page2d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page2c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 3) {
      page3c.forEach((cmd, index) => {
        const description = page3d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page3c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 4) {
      page4c.forEach((cmd, index) => {
        const description = page4d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page4c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 5) {
      page5c.forEach((cmd, index) => {
        const description = page5d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page5c.length} commands ??? Page ${page}/${pages.length}`)
    }
    if (page === 6) {
      page6c.forEach((cmd, index) => {
        const description = page6d[index]
        embed.addField(cmd, description, true)
      })
      embed.setFooter(`${page6c.length} commands ??? Page ${page}/${pages.length}`)
    }

    button.message.delete()
    button.message.reply(embed, buttons)
  }
  button.reply.defer()
})

// Writing text to files and returning text; pretty clean code if I do say so myself; you can also make files with this too
bot.on('message', message => {
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  if (!message.content.startsWith(guildPrefix)) return

  const args = message.content.slice(guildPrefix.length).split(' ')
  const cmd = args[0].toLowerCase()
  const args2 = message.content.slice(guildPrefix.length).split(' | ')

  if (cmd ===  'write' || cmd ===  'wr') {
    var err = 0;
    if (!args2[1]) {
      message.reply("`What file should I write? ._.`")
      console.log(sub+" couldn't find any arguments")
      err++
    }
    if (args2[2]) {
      const fw = args2[1]
      const ct = args2[2]
      if (fw === 'bot.js' || fw === 'config.json' || fw === 'package.json' || fw === 'requirements.txt' || fw === 'initialize.cmd' || fw === 'avatar.png' || fw.includes('\\') || fw.includes('/')) {
        message.reply("`You cannot overwrite any core files or write to a different directory ._.`")
        console.log(sub+" stopped '"+message.author.username+"' from overwriting core files or writing elsewhere")
      } else {
      
      try {
        if (fs.existsSync(args2[1])) {
          var data = fs.readFileSync('./env/'+fw, 'utf8')
          data = data.split(' ')[0]
          if (data.includes(message.author.username) && message.author.username === data) {
              fs.writeFileSync('./env/'+fw, message.author.username+' '+ct, err => {
                if (err) {
                  message.reply("Oh no! Not an unknown error!")
                  console.log(sub+" error: Unrecognized error")
                  return;
                }
              });
              message.channel.send("`Wrote to "+`'${fw}'`+" successfully. Yay.`")
              console.log(sub+" wrote to '"+fw+"'")
          } else {
            message.channel.send("`This file is write-protected. Please make a different one ._.`")
            console.log(sub+" found that the file to write to was write-protected.")
          }
        } else {
          fs.writeFileSync('./env/'+fw, message.author.username+' '+ct, err => {
            if (err) {
              message.reply("Oh no! Not an unknown error!")
              console.log(sub+" error: Unrecognized error")
              return;
            }
          });
          message.channel.send("`Wrote to "+`'${fw}'`+" successfully. Yay.`")
          console.log(sub+" wrote to '"+fw+"'")
        }
      } catch (err) {

        message.channel.send("`Wrote to "+`'${fw}'`+" successfully. Yay.`")
        console.log(sub+" wrote to '"+fw+"'")
      }
      }
    }
  }
  if (cmd ===  'read' || cmd ===  'rd') {
    var err = 0;
    if (args2[1]) {
      if (err === 0) {
        const rd = './env/'+args2[1]
        try {
          const data = fs.readFileSync(rd, 'utf8')
          message.channel.send("`Contents of '"+rd+"':\n"+data+"`")
        } catch (err) {
          message.reply("`Where is that file? .-.`")
          console.log(sub+" error: File doesn't exist")
        }
      }
    } else {
      message.reply('`Where did you put the file argument? ._.`')
      console.log(sub+' failed to find an argument')
    }
  }
  if (cmd ===  'download' || cmd ===  'get') {
    if (cfg['addons']['get'] === 'true') {
      if (!args[1]) {
        message.reply('`Specify a URL next time ._.`')
        console.log(sub+" couldn't find any arguments")
      } else {

        if (args[1].includes('https://') || args[1].includes('http://')) {
          if (args[1].includes('https://')) {

            const https = require('https');
            const obj = './env/'+args[2]
            const file = fs.createWriteStream(obj);

            const request = https.get(args[1], function(response) {
              response.pipe(file);
              message.channel.send('`??? Downloading file...`').then((sentmessages) => {
                file.on('finish', function() { 
                  file.close()
                  sentmessages.edit('`??? Downloaded file sucessfully!`')
                  console.log(sub+" downloaded file from '"+args[1]+"' sucessfully")
                })
              })
            });
            
          }
          if (args[1].includes('http://')) {
            const http = require('http');
            const obj = args[2]
            const file = fs.createWriteStream(obj);

            const request = http.get(args[1], function(response) {
              response.pipe(file);
              message.channel.send('`??? Downloading file...`').then((sentmessages) => {
                file.on('finish', function() { 
                  file.close()
                  sentmessages.edit('`??? Downloaded file sucessfully!`')
                  console.log(sub+" downloaded file from '"+args[1]+"' sucessfully")
                })
              })
            });
          }
        } else {
          message.reply('`Add http:// or https:// to your URL ._.`')
          console.log(sub+" couldn't find any protocol on the URL")
        }
      }
    } else {
      console.log(sub+' noticed that the get addon was blocked')
      message.reply('`The get addon is blocked.`')
    }
  }
  if (cmd ===  'del') {
    var err = 0;
      if (!args[1]) {
        message.reply("`What is the file name? ._.`")
        console.log(sub+" couldn't find the file argument")
        err++;
      }
      if (!args[2]) {
        if (err === 1) {
      } else {
        const fd = './env/'+args[1]

        try {
          if (message.member.hasPermission("ADMINISTRATOR")) {
          fs.unlinkSync(fd, { recursive: true })
          message.channel.send("`File named '"+fd+"' was deleted. Wow.`");
          console.log(sub+" deleted file named '"+fd+"'");
        } else {
          message.reply('`You no have admin! The administrator role is required to delete files.`');
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

// Music commands!
bot.on('message', message => {
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  let args = message.content.slice(guildPrefix.length).split(' ')
  if (!message.content.startsWith(guildPrefix)) return
  const cmd = args[0].toLowerCase()

  if (cmd ===  'play') {
    if (cfg['addons']['music'] === 'true') {
        if (!args[1]) { 
            message.reply('`Please choose something to play ._.`')
            console.log(sub+' could not find something to play') 
        } else { 
            if (!message.member.voice.channel) {
                message.channel.send('`You are not in a voice channel ._.`')
                console.log(sub+' could not find the user in a VC') 
            } else {
                tubebot.play(message, args.join(' '))
            }
        }
    } else {
      message.reply('`The music addon is blocked`')
      console.log(sub+' found that the music addon is blocked.')
    }
  }
  if (cmd ===  'end') {
    if (cfg['addons']['music'] === 'true') {
      const id = message.guild.members.cache.get(bot.user.id)
      if (!message.member.voice.channel) {
          message.reply('`You are not in a voice channel ._.`')
	  console.log(sub+' could not find the user in a VC')
      } else {
          if (id.voice.channel !== message.member.voice.channel) {
              message.reply('`You are not in the same voice channel ._.`')
              console.log(sub+' could not find the user in the same VC') 
          } else {
              try {
                tubebot.stop(message)
                message.channel.send('`??? Ended successfully`')
                console.log(sub+' ended the currently playing music') 
              } catch (err) {
                message.channel.send('`There is no music playing ._.`')
                console.log(sub+' did not find music playing') 
              }
          }
      }
    } else {
      message.reply('`The music addon is blocked`')
      console.log(sub+' found that the music addon is blocked.')
    }
  }
  if (cmd ===  'reset') {
    if (cfg['addons']['music'] === 'true') {
      const id = message.guild.members.cache.get(bot.user.id)
      if (!message.member.voice.channel) {
          message.reply('`You are not in a voice channel ._.`')
	        console.log(sub+' could not find the user in a VC')
      } else {
          if (id.voice.channel !== message.member.voice.channel) {
              message.reply('`You are not in the same voice channel ._.`')
              console.log(sub+' could not find the user in the same VC') 
          } else {
            try {
              tubebot.setRepeatMode(message, parseInt(args[0]))
              message.channel.send('`??? Now looping the currently playing music`')
              console.log(sub+' looped the currently playing music') 
            } catch (err) {
              message.channel.send('`There is no music playing ._.`')
              console.log(sub+' did not find music playing') 
            }
          }
      }
    } else {
      message.reply('`The music addon is blocked`')
      console.log(sub+' found that the music addon is blocked.')
    }
  }
  if (cmd === 'pause') {
    if (cfg['addons']['music'] === 'true') {
      const id = message.guild.members.cache.get(bot.user.id)
      if (!message.member.voice.channel) {
        message.reply('`You are not in a voice channel ._.`')
        console.log(sub+' could not find the user in a VC')
      } else {
        if (id.voice.channel !== message.member.voice.channel) {
          message.reply('`You are not in the same voice channel ._.`')
          console.log(sub+' could not find the user in the same VC') 
        } else {
          if (tubebot.isPaused(message)) {
            message.reply('`The current music is already paused`')
            console.log(sub+' found that the current music is paused') 
          } else {
            try {  
              tubebot.pause(message)
              message.channel.send('`??? Paused the currently playing music`')
              console.log(sub+' paused the currently playing music') 
            } catch (err) {
              message.channel.send('`There is no music playing ._.`')
              console.log(sub+' did not find music playing')    
            }
          }
        }
      }
    }
  }
  if (cmd === 'resume') {
    if (cfg['addons']['music'] === 'true') {
      const id = message.guild.members.cache.get(bot.user.id)
      if (!message.member.voice.channel) {
        message.reply('`You are not in a voice channel ._.`')
        console.log(sub+' could not find the user in a VC')
      } else {
        if (id.voice.channel !== message.member.voice.channel) {
          message.reply('`You are not in the same voice channel ._.`')
          console.log(sub+' could not find the user in the same VC') 
        } else {
          if (tubebot.isPlaying(message)) {
            message.reply('`The current music is already playing`')
            console.log(sub+' found that the current music is playing') 
          } else {
            try {  
              tubebot.resume(message)
              tubebot.pause(message)
              tubebot.resume(message)
              message.channel.send('`??? Resumed the currently playing music`')
              console.log(sub+' unpause the currently playing music') 
            } catch (err) {
              message.channel.send('`There is no music playing ._.`')
              console.log(sub+' did not find music playing') 
            }
          }
        }
      }
    }
  }
})

// Welcome stuff (and pinning messages)!
bot.on('message', (message) => {
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  let args = message.content.slice(guildPrefix.length).split(' | ')
  let args2 = message.content.slice(guildPrefix.length).split(' ')
  const cmd = args[0].toLowerCase()

  if (cmd === 'welcome' || cmd === 'wl') {
    if (!message.mentions.channels || !args[2]) {
      message.reply('`Include a channel to welcome users and a message!`')
      console.log(sub+' did not find a channel or message')
    } else {
      if (message.member.hasPermission('ADMINISTRATOR')) {
        const WELCOMEID = message.mentions.channels.first().toString().replace('<#', '').replace('>', '')
        const WELCOMEMSG = message.content.split(' | ')[2]
        db.run(`INSERT OR IGNORE INTO data(serverid, welcomeid, welcomemsg) VALUES("${message.guild.id}", "${WELCOMEID}", "${WELCOMEMSG}")`, function(err, row){
          message.channel.send('`??? Welcome message added successfully! (If you want it removed, run '+guildPrefix+'diswlc)`')
          console.log(sub+' created a new welcome message')
        })
      } else {
        message.reply('`You no have admin! The administrator role is required to create a welcome message.`');
        console.log(sub+" error: Insufficient privileges to create a welcome message");
      }
    }
  }
  if (cmd === 'diswlc') {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      try {
      db.run(`DELETE FROM data WHERE serverid = "${message.guild.id}"`)
      message.channel.send('`??? Welcome message removed successfully! You can now configure a new one.`')
      console.log(sub+' removed the current welcome message')      
      } catch (err) {
	message.reply('`There is no welcome message set for this server! ._.`')
	console.log(sub+' could not find a welcome message for this server')
      }
    } else {
      message.reply('`You no have admin! The administrator role is required to remove the welcome message.`');
      console.log(sub+" error: Insufficient privileges to remove the welcome message");
    }
  }
  if (cmd === 'pin') {
      if (message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.messages.fetch({ limit: 2 }).then(messages => {
          messages.last().pin()
        })
      } else {
        message.reply('`You no have perms! The "Manage Messages" role is required to pin messages.`');
        console.log(sub+" error: Insufficient privileges to pin messages");
      }
  }
})

bot.on('guildMemberAdd', function(member) {
  db.all('SELECT * FROM data', [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        if (row.serverid === member.guild.id) {
          const embed = new Discord.MessageEmbed()
            .setTitle(row.welcomemsg)
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTimestamp()
          bot.channels.cache.get(row.welcomeid).send(embed)
          console.log(sub+' welcomed '+member.user.tag+' to the server')
        }
      });
    });
})

tubebot.on("playSong", (message, queue, song) => {
  message.channel.send('`??? Playing '+song.name+' - '+song.formattedDuration+'`')
  console.log(sub+' started playing '+song.name+' - '+song.formattedDuration)
})

// Ban people who abuse the system (borrowed code from discordjs readme: https://bit.ly/3e0xbAT)
bot.on('message', message => {
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  let args = message.content.slice(guildPrefix.length).split(' ')
  if (!message.content.startsWith(guildPrefix)) return
  const cmd = args[0].toLowerCase()

  if (message.member && message.member.hasPermission("ADMINISTRATOR")) {
    if (cmd ===  'ban') {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.members.resolve(user);
        if (user.id === message.author.id) {
          message.reply('**No**');
          console.log(sub+' stopped '+message.author.username+' from banning him/herself');
        };
        if (member) {
          member
            .ban({
              reason: "I wouldn't ban you without a reason! It's probably because the mod(s) noticed that you were abusing the file system in some kind of way.",
            })
            .then(() => {
              message.channel.send('`Banned '+user.tag+'. F to pay respects.`');
              console.log(sub+` banned ${user.tag}`);
            })
            .catch(err => {
              message.reply('`Not today, thank you`');
              console.log(sub+" protected himself from getting banned by "+message.author.username);
            });
        } else {
          message.reply("`That user isn't in this guild ._.`");
          console.log(sub+" error: User does not exist");
        }
      } else {
        message.reply("`You didn't mention the user to ban ._.`");
        console.log(sub+" error: User not mentioned");
      }
    }
    if (cmd ===  'unban') {
      const args = message.content.trim().split(/ +/g)
      if (!args[1]) {
        message.reply("`You didn't mention the user to ban ._.`");
        console.log(sub+" error: User not mentioned");
      } else {
        const id = args[1]
        message.guild.fetchBans().then(bans => {
          if (bans.size === 0) return
          const user = bans.find(b => b.user.id === id)
          if (!user) return
          message.guild.members.unban(user.user)

          message.channel.send('`Unbanned '+user.user+'. Welcome back!`')
          console.log(sub+' unbanned '+user.user)

          bot.users.fetch(id, false).then((user) => { 
            message.channel.createInvite({unique: true}).then(invite => {
              user.send("`Hey! You were unbanned from a server, so here's the invite: https://discord.gg/"+invite.code+'`')
            })
          })
        })
      }
  }
  	if (cmd === 'mute') {
		const mutedRole = message.guild.roles.cache.find(
		 (role) => role.name === 'Muted'
		);
		if (!mutedRole) {
		 message.reply('`There is no muted role in this server! ._.`')
		 console.log(sub+' could not find a muted role')
		} else {
			const args = message.content.split(' ')
			const target = message.mentions.members.first();
			if (!args[1] || !target) {
				message.reply('`You need to specify a member and a number of days to mute the member! ._.`')
				console.log(sub+' could not find required arguments')
			} else {
				const embed = new Discord.MessageEmbed()
					.setTitle('??? '+target.user.tag+' has been muted for '+args[1]+' days.')
					.setTimestamp()
				message.channel.send(embed)
				console.log(sub+' muted '+target.user.tag)
				target.roles.add(mutedRole);
				setTimeout(() => {
				  target.roles.remove(mutedRole);
				}, parseInt(args[1])*24*3600)  
			}
		}
	}
} 
});

// Dependent functions from here
bot.on('message', message => {
	if (!message.content.startsWith(prefix.getPrefix(message.guild.id))) return;
  if (!message.guild) return
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!guildPrefix) guildPrefix = dfix
  let args = message.content.slice(guildPrefix.length).split(' ')
  let args2 = message.content.slice(guildPrefix.length).split(' | ')
  if (!message.content.startsWith(guildPrefix)) return
  const cmd = args[0].toLowerCase()
	
	if (cmd ===  'search' || cmd ===  'sr') {
    
		var err = 0;
		if (!args[1]) {
      err++
      console.log(sub+' could not find a keyword to search')
			message.reply('`What keyword do you want to search? ._.`')
		} else {
			if (cfg['addons']['webscraper'] === 'true') {
        var rm = args.shift()
        const scrape = args.join(' ')
        message.channel.send('`??? Searching for '+scrape+'...`').then((sentmessage) => {
				var response = spawn('py', ['./addons/webscraper/webscraper.py', scrape]);
        response.stdout.on('data', function(data) {
          sentmessage.edit('`'+data.toString()+'`');
          console.log(sub+' gave the results for '+scrape)
          });
        })
			} else {
        console.log(sub+' noticed that the webscraper addon was blocked')
				message.reply('`The webscraper addon is blocked.`')
			}
    }
		} 
if (cmd ===  'weather' || cmd ===  'w') {
  var err = 0;
    if (!args[1]) {
      message.reply('`Where do you want to get the weather? ._.`')
      console.log(sub+' could not find the place to get the weather')
      err++
    }
    const weather = require('./addons/weather/weather.js')

    if (cfg['addons']['weather'] === 'true') {
      var rm = args.shift()
      const place = args.join(' ')
      message.channel.send('`??? Getting the weather in '+place+'...`').then((sentmessage) => {
      weather.get(place, function(response){
          sentmessage.edit('`'+response+'`')
          console.log(sub+' gave the weather in '+place)
      })
    })
    } else {
      message.reply('`The weather addon is blocked.`')
      console.log(sub+' noticed that the weather addon was blocked')
    }
  }
  if (cmd ===  'gif') {
    var err = 0;
		if (!args[1]) {
			message.reply('`What is the GIF you want to find? ._.`')
			console.log(sub+' could not find a keyword to search')
			err++
		} else {
			if (cfg['addons']['gifpy'] === 'true') {
        var rm = args.shift()
        const query = args.join(' ')

        message.channel.send('`??? Searching for '+query+' on GIPHY...`').then((sentmessage) => {
          const py = spawn('py', ['./addons/gifpy/gifpy.py',query]);
          py.stdout.on('data', function (data) {
            if (data.toString().includes('Failed')) {
              sentmessage.edit('`??? Search for '+query+' failed. Look for something else, please.`')
              console.log(sub+" failed to find '"+query+"'")
              err++
            }
              if (err === 1) {
              } else {
                sentmessage.edit(data.toString())
                console.log(sub+" gave a GIF for the keyword '"+query+"'")
              }
            });
          })
			} else {
				message.reply('`The gifpy addon is blocked.`')
				console.log(sub+' noticed that the gifpy addon was blocked')
			}
		}
}
if (cmd ===  'scratch' || cmd ===  'scr') {
  var err = 0;
  if (!args[1]) {
    message.reply('`What is the account info you want? ._.`')
    console.log(sub+' could not find a user to search')
    err++
  }
  if (!args[3]) {
    if (err === 1) {
    }
  else {
    if (cfg['addons']['scratch'] === 'true') {
      const query = args[1]

      message.channel.send('`??? Searching on Scratch for '+query+'...`').then((sentmessage) => {
        const process = spawn('py', ['./addons/scratch/scratch.py',query]);
        process.stdout.on('data', (data) => {
          if (data.toString().includes('Failed')) {
            sentmessage.edit('`??? Search for '+query+' failed. Try looking for a different Scratcher.`')
            console.log(sub+" failed to find '"+query+"'")
            err++
          }
          if (err === 1) {
          } else {
                    sentmessage.delete()

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
              
                  message.channel.send(Embed)
          }
        })
      });	
    } else {
      message.reply('`The scratch addon is blocked.`')
      console.log(sub+' noticed that the scratch addon was blocked')
    }
  }
}
}
if (cmd ===  'youtube' || cmd ===  'yt') {
  var err = 0;
  if (!args2[1]) {
    message.reply('`What are the videos you want to find? ._.`')
    console.log(sub+' could not find a keyword to search')
    err++
  }
  if (!args2[3]) {
    if (err === 1) {
    }
  else {
    if (cfg['addons']['youtube'] === 'true') {
      var rm = args.shift()
      const query = args.join(' ')
      
      message.channel.send('`??? Searching on YouTube for '+query+'...`').then((sentmessage) => {
      const process = spawn('py', ['./addons/youtube/youtube.py',query]);
      process.stdout.on('data', (data) => {
        if (data.toString().includes('Failed')) {
          sentmessage.edit('`??? Search for '+query+' failed. Why not go back in time with some cat videos?`')
          console.log(sub+" failed to find '"+query+"'")
          err++
        } else {
        var v1 = 'https://www.youtube.com/watch?v=' + data.toString().split(',')[0]
        var v2 = 'https://www.youtube.com/watch?v=' + data.toString().split(',')[1]
        var v3 = 'https://www.youtube.com/watch?v=' + data.toString().split(',')[2]
        var v4 = 'https://www.youtube.com/watch?v=' + data.toString().split(',')[3]
        var v5 = 'https://www.youtube.com/watch?v=' + data.toString().split(',')[4]

        sentmessage.delete()

        const Embed = new Discord.MessageEmbed()

        .setColor('#0099ff')
        .setTitle(query)
        .setAuthor('YouTube', 'https://1.bp.blogspot.com/-zaoiLHspoKI/XeI_0uFAeCI/AAAAAAAAF38/CyHgdY8bdOQ7d979yOJ0voSIA8b5bAF2wCLcBGAsYHQ/s1600/Youtube-Icon-2000x2000.png', 'https://www.youtube.com')
        .setDescription(v1 + '\n' + v2 + '\n' + v3 + '\n' + v4 + '\n' + v5)
        .setTimestamp()
  
        message.channel.send(Embed)
        }
      })
    })
    } else {
      message.reply('`The youtube addon is blocked.`')
      console.log(sub+' noticed that the youtube addon was blocked')
    }
  }
}
}
if (cmd ===  'shorten' || cmd ===  'sh') {
  var err = 0;
  if (!args[1]) {
    message.reply('`What is the URL to shorten? ._.`')
    console.log(sub+' could not find a URL to shorten')
    err++
  }
  if (!args[3]) {
    if (err === 1) {
    }
  else {
    if (cfg['addons']['snipp.er'] === 'true') {
      const url = args[1]

      message.channel.send('`??? Shortening '+url+'...`').then((sentmessage) => {
        const py = spawn('py', ['./addons/snipp.er/snipper.py',url]);
        py.stdout.on('data', function (data) {
          if (data.toString().includes('Failed')) {
            sentmessage.edit('`??? Shortening of '+url+' failed. Maybe take a look at your URL?`')
            console.log(sub+" failed to shorten '"+url+"'")
            err++
          }
            if (err === 1) {
            } else {
              sentmessage.edit('`Shortened URL: https://'+data.toString()+'`')
              console.log(sub+" shortened '"+url+"'")
            }
          });
        })
    } else {
      message.reply('`The snipp.er addon is blocked.`')
      console.log(sub+' noticed that the snipp.er addon was blocked')
    }
  }
}
}
if (cmd ===  'fortnite' || 'frte') {
  if (args[0] === guildPrefix+'fortnite' && !args[1] || args[0] === guildPrefix+'frte' && !args[1]) {
      message.reply('`Please specify a correct query next time ._.`')
      console.log(sub+' did not find a proper query')
  } else {
      if (cfg['addons']['fortnite'] === 'true') {
        const query = args[1]
        const py = spawn('py', ['./addons/fortnite/fortnite.py',query]);
        py.stdout.on('data', function (data) {
            data = data.toString().split(',')

            if (args[1] === 'news/stw' || args[1] === 'news/br' || args[1] === 'news/c') {
                const title = data[0]
                const desc = data[1]
                
                const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(title)
                        .setDescription(desc)
                        .setTimestamp()
                    message.channel.send(embed)
                console.log(sub+' got the latest news from Fortnite')
            }
            if (args[1] === 'map') {
                message.channel.send(data[0])
                console.log(sub+' gave the current map')
            }
        })
      } else {
        message.reply('`The fortnite addon is blocked.`')
        console.log(sub+' noticed that the fortnite addon was blocked')
      }
  }
}
if (cmd ===  'mmake' || cmd ===  'memegen') {
  if (message.content.includes(guildPrefix+'mmake') || message.content.includes(guildPrefix+'memegen')) {
  if (!args2[1] || !args2[2] || !args2[3]) {
    message.reply('`You forgot some arguments ._.`')
    console.log(sub+' noticed that some arguments were not provided!')
  }
  const id = args2[1]
  const t = args2[2]
  const b = args2[3]

  if (cfg['addons']['memes'] === 'true') {
    message.channel.send('`??? Generating meme with ID '+id+'...`').then((sentmessage) => {
    const py438y59r = spawn('py', ['./addons/memes/meme.py', id, t, b]);
    py438y59r.stdout.on('data', function (data) {
      if (data.toString().includes('Failed')) {
        sentmessage.edit('`??? Creation of meme with ID '+id+' failed. Check if you included a proper ID or top and bottom text.`')
        console.log(sub+" failed to make a meme with ID '"+id+"'")
        err++
      }
      if (err === 1) {
      } else {
        sentmessage.delete()
        message.channel.send(data.toString().replace('\r\n', ''))
      }
    })
  })
  } else {
    message.reply('`The memes addon is blocked.`')
    console.log(sub+' noticed that the memes addon was blocked')
  }
}
}
if (cmd.includes('shop')) {
  if (cfg['addons']['economy'] === 'true') {
    if (cmd ===  'shop/add') {
        if (!args2[1] || !args2[2]) {
          message.reply('`Please include an ingame name and/or your job ._.`')
          console.log(sub+' could not find queries to use')
        } else {
        const func1 = args2[1]
        const func2 = args2[2]

        const python2 = spawn('py', ['./addons/economy/new.py', message.author.username+'#'+message.author.discriminator, func1, func2])
        python2.stdout.on('data', (data) => {
            message.channel.send('`' + data.toString() + '`')
            console.log(sub+' made a new account')
        })
      }
    }
    if (cmd ===  'shop/remove') {
        const python3 = spawn('py', ['./addons/economy/remove.py', message.author.username+'#'+message.author.discriminator])
        python3.stdout.on('data', (data) => {
            message.channel.send('`' + data.toString() + '`')
            console.log(sub+" removed '"+message.author.username+"' from the database")
        })
    }
    if (cmd ===  'shop/money') {
        if (talkedRecently.has(message.author.id) && cmd === 'shop/money') {
            message.channel.send("`Please wait 1 hour and 40 minutes before running this again!`");
            console.log(`${sub} told ${message.author.username} to wait 100 minutes before running the money command again.`)
        } else {
            const python4 = spawn('py', ['./addons/economy/money.py', message.author.username+'#'+message.author.discriminator])
            python4.stdout.on('data', (data) => {
                message.channel.send('`' + data.toString() + '`')
                console.log(`${sub} gave ${message.author.username} ${data.toString().split(' ')[3]} bucks!`)

                talkedRecently.add(message.author.id);
                setTimeout(() => { talkedRecently.delete(message.author.id); }, 6000000);
            })
        }
    }
    if (cmd ===  'shop/buy') {
        const item = args2[1]
        const python34 = spawn('py', ['./addons/economy/store.py', message.author.username+'#'+message.author.discriminator, item])
        python34.stdout.on('data', (data) => {
          message.channel.send('`' + data.toString() + '`')
          console.log(sub+" sold the item '"+item+"'")
        })
    }
    if (cmd ===  'shop/info') {
        const item = args2[1]
        const python34 = spawn('py', ['./addons/economy/find.py', item])
        python34.stdout.on('data', (data) => {
          message.channel.send('`' + data.toString().replace(/"/gi, '') + '`')
          console.log(sub+" did/did not give info on '"+item+"'")
        })
      }
    } else {
      message.reply('`The economy addon is blocked.`')
      console.log(sub+' noticed that the economy addon was blocked')
    }
  }
  if (cmd ===  'shield' || cmd ===  'shld') {
    if (cfg['addons']['shield'] === 'true') { 
    if (!args[1] || !args[2] || !args[3]) {
        message.reply("`You forgot some arguments ._.`")
        console.log(sub+' could not find some arguments')
    } else {
        const text0 = args2[1]
        const text1 = args2[2]
        const red = args2[3]
        
        message.channel.send('`??? Generating Shields.IO badge...`').then((messagE) => {
          const python = spawn('py', ['./addons/shields/shields.py', text0, text1, red])
          python.on('close', () => { 
              messagE.delete()
              const attach = new Discord.MessageAttachment('./addons/shields/file.png')
              message.channel.send(attach)
              console.log(sub+" made a badge with the text '"+text1+"'")
          })
        })
    }
  } else {
    message.reply('`The shield addon is blocked.`')
    console.log(sub+' noticed that the shield addon was blocked')
  }
}
  if (cmd ===  'message' || cmd ===  'msg') {
    if (cfg['addons']['message'] === 'true') {
      if (!args[1] || !args[2]) {
        message.reply("`You forgot some arguments ._.`")
        console.log(sub+' could not find some arguments')
      } else {
        const text0 = args2[1]
        const text1 = args2[2]

        message.channel.send('`??? Generating message...`').then((MESSAGE) => {
          const python = spawn('py', ['./addons/message/notification.py', text0, text1])
          python.on('close', () => {
            MESSAGE.delete()
            const attach = new Discord.MessageAttachment('./addons/message/toast.png')
            message.channel.send(attach)
            console.log(sub+" made a message with the text '"+text0+"'")
          })
        })
      }
    } else {
      message.reply('`The shield addon is blocked.`')
      console.log(sub+' noticed that the shield addon was blocked')
    }
  }
if (cmd ===  'rickroll' || cmd ===  'rroll') {
  if (cfg['addons']['isrickroll'] === 'true') {
    message.delete()
    if (!args[1]) {
      message.reply("`You forgot some arguments ._.`")
      console.log(sub+' could not find some arguments')
    } else {
      const item = args[1]
      const python4 = spawn('py', ['./addons/isrickroll/isrickroll.py', item])
      message.channel.send('`??? Checking URL: '+item+' for rickrolling...`').then((messageE) => {
      python4.stdout.on('data', (data) => {
          if (data.toString().includes('Failed')) { 
            messageE.edit('`??? '+data.toString()+'`').then(console.log(sub+' could not find a proper URL')) 
          } else { 
            if (data.toString().includes('rickroll')) { messageE.edit('`??? '+data.toString()+'`').then(console.log(sub+' detected that the link was a rickroll')) } 
            if (data.toString().includes('safe')) { messageE.edit('`??? '+data.toString()+'`').then(console.log(sub+' detected that the link was not a rickroll')) }}
      })
    })
  }
} else {
  message.reply('`The isrickroll addon is blocked.`')
  console.log(sub+' noticed that the isrickroll addon was blocked')
}
}
if (cmd ===  'garfield' || cmd ===  'gf') {
  if (cfg['addons']['isrickroll'] === 'true') {
  if (!args[1]) {
    message.reply("`You forgot some arguments ._.`")
    console.log(sub+' could not find some arguments')
  } else {
    if (!args[1].includes('.')) {
      message.reply("`You need a properly formatted date (e.g: 13-07-2021) ._.`")
      console.log(sub+' could not find a properly formatted date')
    } else {
      const date = args[1]
      const python = spawn('py', ['./addons/garfield/garfield.py', date])
      message.channel.send('`??? Getting Garfield comic from '+date+'...`').then((messagE) => {
        python.stderr.on('data', (data) => {
          console.log(data.toString())
        })
        python.on('close', () => {
          messagE.delete()
          const attach = new Discord.MessageAttachment('./addons/garfield/comic.png')
          message.channel.send(attach)
          console.log(sub+' sent a Garfield comic from the date '+date)
        })
      })
    }
  }
} else {
  message.reply('`The garfield addon is blocked.`')
  console.log(sub+' noticed that the garfield addon was blocked')
}
}
});
bot.login(cfg.DISCORD_TOKEN)
