const { Events } = require('discord.js');
const client = require('../../bootstrap');
const { getMention } = require('../utils/messageHandler');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    const botMentioned = message.mentions.has(client.user);
    const botNameMentioned = message.content.includes(client.user.username);
    if (botMentioned || botNameMentioned) {
      await message.reply(getMention());
    }
  },
};
