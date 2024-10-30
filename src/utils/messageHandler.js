const path = require('path');
const fs = require('fs');

function loadMessages() {
  const messagesPath = path.resolve(__dirname, '../../config/messages.json');
  const rawData = fs.readFileSync(messagesPath, 'utf8');
  return JSON.parse(rawData);
}

function getRandomMessage(messages) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function getcooldownMessages() {
  const messages = loadMessages();
  const cooldownMessages = messages.cooldownMessages;
  return getRandomMessage(cooldownMessages);
}

function getdeinMessages() {
  const messages = loadMessages();
  const deinMessages = messages.deinMessages;
  return getRandomMessage(deinMessages);
}

function getMention() {
  const messages = loadMessages();
  const mentionMessages = messages.MentionMessages;
  return getRandomMessage(mentionMessages);
}

module.exports = {
  getcooldownMessages,
  getdeinMessages,
  getMention,
};
