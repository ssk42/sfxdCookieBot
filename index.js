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
    const mentionedUsers=message.mentions.users;
    const givenCookieMessage=': you have been given a cookie. Enjoy the chocolate-y goodness.';
    const botMessage='You cannot send cookies to bots. Bots cannot enjoy the ooey or the gooey of a cookie.';

    message.channel.send(cookieEmoji);
    if (!args.length) {
        return message.channel.send(`You didn't provide any users to give a cookie to, ${message.author}!`);
    }
	else if (message.content.startsWith(cookie)) {
        let usersToTag='';
        
        if (mentionedUsers.size===1){
            usersToTag = mentionedUsers.first();
            if (!usersToTag.bot) {
                message.channel.send('<@'+usersToTag.id+'>'+givenCookieMessage);
            } else {
                message.channel.send(botMessage);
            }
            return;
        }
        else{
            for (let [userId,userInfo] of mentionedUsers) {
                if(!userInfo.bot){
                    let currentUserTag='<@'+userId+'>';
                    
                    if(usersToTag===''){
                        usersToTag = currentUserTag;
                    }
                    else{
                        usersToTag = usersToTag+', '+currentUserTag;
                    }
                }
                else{
                    message.channel.send(botMessage);
                }
            }
            message.channel.send(usersToTag+givenCookieMessage);
        }
	}
});

client.login(token);