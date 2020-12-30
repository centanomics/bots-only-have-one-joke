require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(port, () => {
  console.log(`Birbit listening on port ${port}`)
})

const Discord = require('discord.js');

const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot is ready!')
})

client.on('message', (message) => {
  if (message.author.bot) {
    return;
  }
  const messegeRegex = /([‘’])/g;
  let lowMessage = message.content.toLowerCase();
  lowMessage = lowMessage.replace(messegeRegex, '\'');
  const regex = /(i'm|im|i am)( ?a? ?)( ?n?o?t ?)( ?a? ?)( ?t?h?e? ?)([a-z'-])+/g;
  const returnregex = lowMessage.match(regex);

  const firstWord =
  returnregex === null ? null :
  returnregex[0].split(' ')[1] === 'am' ? 'i am' :
  returnregex[0].split(' ')[0];
  const charBefore = lowMessage.charAt(lowMessage.indexOf(returnregex) - 1);
  console.log(returnregex, ':', firstWord, ':', charBefore)
  if (returnregex !== null) {
    if (firstWord !== 'i am' && firstWord !== 'im' && firstWord !== 'i\'m') {
      return
    } else if (charBefore !== ' ' && charBefore !== '') {
      return
    } else {
      const noun = returnregex[0].substring(returnregex[0].lastIndexOf(' ') + 1);
      message.channel.send(`Hiya ${noun}, I'm a Robit`);
    }
  }

})