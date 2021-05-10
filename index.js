const Discord = require('discord.js');
const client = new Discord.Client();
const { cookie, token } = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

    if (!message.content.startsWith(cookie) || message.author.bot) return;

    const args = message.content.slice(cookie.length).trim().split(' ');
    const cookieEmoji= ':cookie:';
    const taggedUsers=message.mentions.users;
    const givenCookieMessage=': you have been given a cookie. Enjoy the chocolate-y goodness.';
    const botMessage='You cannot send cookies to bots. Bots cannot enjoy the ooey or the gooey of a cookie.';

    message.channel.send(cookieEmoji);
    if (!args.length) {
        return message.channel.send(`You didn't provide any users to give a cookie to, ${message.author}!`);
    }
	else if (message.content.startsWith(cookie)) {
        let taggedUser='';
        
        if (taggedUsers.size===1){
            taggedUser = taggedUsers.first();
            if (!taggedUser.bot) {
                message.channel.send('<@'+taggedUser.id+'>'+givenCookieMessage);
            } else {
                message.channel.send(botMessage);
            }
            return;
        }
        else{
            for (let [user,userInfo] of taggedUsers) {
                if(!userInfo.bot){
                    let tagOfUser='';
                    
                    if(taggedUser===''){
                        tagOfUser='<@'+user+'>';
                        taggedUser = tagOfUser;
                    }
                    else{
                        tagOfUser='<@'+user+'>';
                        taggedUser = taggedUser+', '+tagOfUser;
                    }
                }
                else{
                    message.channel.send(botMessage);
                }
            }
            message.channel.send(taggedUser+givenCookieMessage);
        }
	}
});

client.login(token);