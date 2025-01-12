const users = new Map();

const {
  Client,
  Collection,
  ActivityType,
  GatewayIntentBits,
  Events,
} = require('discord.js');
const config = require('./config/config.json');
const commandHandler = require('./src/utils/commandHandler');
const eventHandler = require('./src/utils/eventHandler');
const componentHandler = require('./src/utils/componentHandler');
const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce(
    (acc, intent) => acc | intent,
    0,
  ),
});
const logHandler = require('./src/utils/logHandler');

client.commands = new Collection();
client.cooldowns = new Collection();

client.once(Events.ClientReady, async () => {
  logHandler.initialize(client);

  //@note: welcome message, uncomment if you'd like to
  //console.log(`Logged in as ${client.user.tag}`);

  //@note: sets bot's rich presence status
  client.user.setPresence({
    activities: [{ name: `Intelligently streamlining tasks & comms to amplify your daily efficiency`, type: ActivityType.Custom }],
    status: 'online',
  });

  //@note: initlaize handlers
  await commandHandler.loadCommands(client).catch(console.error);
  await eventHandler.loadEvents(client).catch(console.error);
  await componentHandler.loadComponents(client).catch(console.error);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
    await commandHandler
      .synchronizeCommands(interaction, client)
      .catch(console.error);
  } else {
    await componentHandler
      .synchronizeComponent(interaction, client)
      .catch(console.error);
  }
});

module.exports = client;
client.login(config.token).catch(console.error);
