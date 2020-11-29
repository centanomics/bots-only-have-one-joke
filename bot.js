require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

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
  if (lowMessage.indexOf("i'm ") !== -1) {
    const begin = lowMessage.indexOf("i'm ");
    const jokeNoun = lowMessage.substr(begin).split(' ');
    message.channel.send(`Hiya ${jokeNoun[1]}, I'm a Robit`);
  }
  if (lowMessage.indexOf("im ") !== -1) {
    const begin = lowMessage.indexOf("im ");
    const jokeNoun = lowMessage.substr(begin).split(' ');
    message.channel.send(`Hiya ${jokeNoun[1]}, I'm a Robit`);
  }
  if (lowMessage.indexOf("i am ") !== -1) {
    const begin = lowMessage.indexOf("i am ");
    const jokeNoun = lowMessage.substr(begin).split(' ');
    message.channel.send(`Hiya ${jokeNoun[2]}, I'm a Robit`);
  }
})