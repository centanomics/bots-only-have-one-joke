require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
  console.log(`Birbit listening on port ${port}`);
});

const Discord = require('discord.js');

const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', (message) => {
  try {
    if (message.author.bot) {
      return;
    }
    if (message.content.toLowerCase().indexOf('based') !== -1) {
      message.channel.send('Based on what?');
    }
    const messegeRegex = /([‘’])/g;
    let lowMessage = message.content.toLowerCase();
    lowMessage = lowMessage.replace(messegeRegex, "'");
    const regex = /(i'm|im|i am)/g;
    const returnregex = lowMessage.match(regex);

    const firstWord =
      returnregex === null
        ? [null]
        : returnregex[0].split(' ')[1] === 'am'
        ? ['am']
        : lowMessage
            .split(' ')
            .filter((word) => word.indexOf(returnregex[0]) !== -1);
    // console.log(lowMessage.split(' ').filter((word) => word.indexOf(returnregex[0]) !== -1))
    const charBefore = lowMessage.charAt(
      lowMessage.indexOf(returnregex[0]) - 1
    );
    console.log(
      `\nregex: ${returnregex[0]}\nfirst word: ${firstWord[0]}\nchar before: ${charBefore}`
    );
    const checkReg = /(i'm|im|i am)( a? ?(robit|birbit))/g;
    if (lowMessage.match(checkReg) !== null) {
      message.channel.send("No you're not.");
      return;
    }
    if (returnregex !== null) {
      if (
        firstWord[0] !== 'am' &&
        firstWord[0] !== 'im' &&
        firstWord[0] !== "i'm"
      ) {
        return;
      } else if (charBefore !== ' ' && charBefore !== '') {
        return;
      } else {
        const ignoreArray = [
          "i'm",
          'im',
          'i',
          'am',
          'a',
          'not',
          'the',
          'an',
          "i'm,",
          'im,',
        ];
        const sentenceArray = lowMessage.split(' ');
        const start = sentenceArray.indexOf(firstWord[0]);
        let noun = '';
        for (let i = start; i < sentenceArray.length; i++) {
          if (ignoreArray.indexOf(sentenceArray[i]) === -1) {
            noun = sentenceArray[i];
            break;
          }
        }
        if (noun !== '') {
          message.channel.send(`Hiya ${noun}, I'm a Robit`);
        }
      }
    }

    if (message.content.toLowerCase().indexOf('based') !== -1) {
      message.channel.send('Based on what?');
    }
  } catch (err) {
    console.log('no variation of I am found');
  }
});
