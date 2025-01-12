const chalk = require('chalk');
const { createEmbed } = require('./embedBuilder');
const config = require('../../config/environment');
const botName = config.botName;

function initialize(client) {
  const defaultConsoleLog = console.log;
  const defaultConsoleError = console.error;
  const botlogs = client.channels.cache.get(config.botLogsChannel);

  const delay = 4000;
  let messageQueue = [];
  let isSending = false;

  function processQueue() {
    if (messageQueue.length === 0) {
      isSending = false;
      return;
    }

    isSending = true;
    const { description, color } = messageQueue.shift();

    if (botlogs) {
      const embed = createEmbed({ description, color });
      botlogs.send({ embeds: [embed] })
        .catch(console.error)
        .finally(() => {
          setTimeout(processQueue, delay);
        });
    } else {
      setTimeout(processQueue, delay);
    }
  }

  function sendEmbed(description, color) {
    messageQueue.push({ description, color });

    if (!isSending) {
      processQueue();
    }
  }

  console.log = function (...args) {
    defaultConsoleLog(botName, ...args);
    sendEmbed(args.join(' '), config.botColor);
  };

  console.error = function (...args) {
    defaultConsoleError(botName, ...args);
    sendEmbed(args.join(' '), '#FF5733');
  };

  console.debug = function (...args) {
    defaultConsoleLog(botName, ...args);
    sendEmbed(args.join(' '), '#FFAE42');
  };

  console.task = function (...args) {
    defaultConsoleLog(chalk.yellow(botName, '[TASK]', ...args));
    sendEmbed(args.join(' '), '#FFAE42');
  };

  console.warn = function (...args) {
    defaultConsoleLog(chalk.yellow(botName, ...args));
    sendEmbed(args.join(' '), '#FFAE42');
  };
}

module.exports = { initialize };
