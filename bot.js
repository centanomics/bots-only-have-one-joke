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
  const lowMessage = message.content.toLowerCase();
  // if (lowMessage.indexOf("i'm ") !== -1) {
  //   const begin = lowMessage.indexOf("i'm ");
  //   const jokeNoun = lowMessage.substr(begin).split(' ');
  //   message.channel.send(`Hiya ${jokeNoun[1]}, I'm a Robit`);
  // }
  // if (lowMessage.indexOf("im ") !== -1) {
  //   const begin = lowMessage.indexOf("im ");
  //   const jokeNoun = lowMessage.substr(begin).split(' ');
  //   message.channel.send(`Hiya ${jokeNoun[1]}, I'm a Robit`);
  // }
  // if (lowMessage.indexOf("i am ") !== -1) {
  //   const begin = lowMessage.indexOf("i am ");
  //   const jokeNoun = lowMessage.substr(begin).split(' ');
  //   message.channel.send(`Hiya ${jokeNoun[2]}, I'm a Robit`);
  // }
  const regex = /(i'm|im|i am)( ?n?o?t? ?)( ?a? ?)([a-z])+/g;
  const returnregex = lowMessage.match(regex);
  if (returnregex !== null) {
    const noun = returnregex[0].substring(returnregex[0].lastIndexOf(' '));
    message.channel.send(`Hiya${noun}, I'm a Robit`);
  }

})