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
  try {
    if (message.author.bot) {
      return;
    }
    const messegeRegex = /([‘’])/g;
    let lowMessage = message.content.toLowerCase();
    lowMessage = lowMessage.replace(messegeRegex, '\'');
    const regex = /(i'm|im|i am)/g;
    const returnregex = lowMessage.match(regex);

    const firstWord =
      returnregex === null ? [null] :
        returnregex[0].split(' ')[1] === 'am' ? ['i am'] :
          lowMessage.split(' ').filter(word => (word.indexOf(returnregex[0]) !== -1));
    // console.log(lowMessage.split(' ').filter((word) => word.indexOf(returnregex[0]) !== -1))
    const charBefore = lowMessage.charAt(lowMessage.indexOf(returnregex[0]) - 1);
    console.log(
      `\nregex: ${returnregex[0]}\nfirst word: ${firstWord[0]}\nchar before: ${charBefore}`
    );
    if (returnregex !== null) {
    
      if (firstWord[0] !== 'i am' && firstWord[0] !== 'im' && firstWord[0] !== 'i\'m') {
        return
      } else if (charBefore !== ' ' && charBefore !== '') {
        return
      } else {
        const ignoreArray = ['i\'m', 'im', 'i', 'am', 'a', 'not', 'the', 'an'];
        const sentenceArray = lowMessage.split(' ');
        // const start = sentenceArray.indexOf(returnregex) !== -1 ? sentenceArray.indexOf(returnregex) : sentenceArray.indexOf('am')
        let noun = '';
        console.log(sentenceArray.indexOf(returnregex))
        for (let i = 0; i < sentenceArray.length; i++) {
          // console.log(ignoreArray.indexOf(sentenceArray[i]) === -1)
          if (ignoreArray.indexOf(sentenceArray[i]) === -1) {
            noun = sentenceArray[i];
            // console.log(sentenceArray[i])
            break;
          }
          // message.channel.send(ignoreArray.indexOf(sentenceArray[i]) === -1)
        }

        message.channel.send(`Hiya ${noun}, I'm a Robit`);
      }
    }
  } catch (err) {
    console.log('no variation of I am found')
  }
})