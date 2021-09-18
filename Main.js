
const { Client } = require('discord.js-selfbot-v11'),
    Enmap = require('enmap'),
    client = new Client(),
    fs = require('fs'),
    colors = require('colors'),
    center = require('center-align'),
    { token, prefix } = require('./config.json');

client.commands = new Enmap();

process.on('unhandledRejection', e => {});
process.on('uncaughtException', e => {});
process.on('uncaughtRejection', e => {});
process.warn = () => {};

client.on("error", (e) => {
	log.error(e);
	return;
});

client.on("warn", (e) => {
	log.warn(e);
	return;
});

(async function() {
    console.clear()
    process.title = 'SpaceX | Loading...';
    console.log(center(`







    ██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
    ██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
    ██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
    ██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
    ███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                        `.white, 110));

    client.on('ready', async() => {
        console.clear();
        process.title = `[SpaceX] Connected in: ${client.user.username}`
        console.log(center(`

██╗   ██╗██╗████████╗██╗  ██╗██╗  ██╗
██║   ██║██║╚══██╔══╝██║  ██║╚██╗██╔╝
██║   ██║██║   ██║   ███████║ ╚███╔╝ 
╚██╗ ██╔╝██║   ██║   ██╔══██║ ██╔██╗ 
 ╚████╔╝ ██║   ██║   ██║  ██║██╔╝ ██╗
  ╚═══╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
     
         vithxd3vil@protonmail.com

`.brightMagenta, 115));

console.log(`
	╦ ╦╔═╗╦  ╔═╗ Connected in
	╠═╣║╣ ║  ╠═╝ ${client.user.username}
	╩ ╩╚═╝╩═╝╩   Prefix: '${prefix}'  
	∙  NUKE     | Delete all server channels and roles. 
	∙  BANALL   | Ban all server members.               
	∙  PURGE    | Remove the inactive members.          
	∙  EVERYONE | Spam a everyone flood.                
	∙  CHN      | Create the raid channels.             
`.brightMagenta)

    });

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
          if (!file.endsWith(".js")) return;
          let props = require(`./commands/${file}`);
          let commandName = file.split(".")[0];
          client.commands.set(commandName, props);
        });
      });

    client.on('message', async(msg) => {
        if(msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g),
            command = args.shift().toLowerCase(),
            cmd = client.commands.get(command);

        if(msg.author.id !== client.user.id) return;

        if(!cmd) {
            console.log(` [E] Unknown command.`.red)
        } else {
            cmd.run(client, msg, args)
        }
        console.log(` [S] Executed command: ${command}`.green)
    })

    client.login(token).catch(() => {
        console.log(`
        ███████╗██████╗ ██████╗  ██████╗ ██████╗ 
        ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
        █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
        ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
        ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
        ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
        Verify the provided token on 'config.json'.
        `.red, 110);
    });
})();