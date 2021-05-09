const Discord = require('discord.js');
const client = new Discord.Client();
const { giveCommand, token } = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

    if (!message.content.startsWith(giveCommand) || message.author.bot) return;

    const args = message.content.slice(giveCommand.length).trim().split(' ');
    const emoji= args[0];
    message.channel.send(':'+emoji+':');
    if (!args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
	else if (message.content.startsWith(giveCommand+ emoji)) {
        let taggedUser='';
        
        if (message.mentions.users.size===1){
            taggedUser = message.mentions.users.first();
            if (!taggedUser.bot) {
                message.channel.send('<@'+taggedUser.id+'>: you have been given a ' + emoji+'. Enjoy the chocolate-y goodness.');
            } else {
                message.channel.send('You cannot send cookies to bots. Bots cannot enjoy the ooey or the gooey of a cookie.');
            }
            return;
        }
        else{
            for (let [key,value] of message.mentions.users) {
                if(!value.bot){
                    const tagOfUser='<@'+value.id+'>';
                    if(taggedUser===''){
                        taggedUser = tagOfUser;
                    }
                    else{
                        taggedUser = taggedUser+', '+tagOfUser;
                    }
                    message.channel.send(taggedUser+': you have been given a ' + emoji+'. Enjoy the chocolate-y goodness.');
                    return;
                }
                else{
                    message.channel.send('You cannot send cookies to bots. Bots cannot enjoy the ooey or the gooey of a cookie.');
                }
            }
        }
        

	}
});

client.login(token);