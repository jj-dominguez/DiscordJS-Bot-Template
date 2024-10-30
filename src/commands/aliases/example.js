const { SlashCommandBuilder } = require('discord.js');
const aboutCommand = require('../utilities/about');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about_alias')
    .setDescription('Displays information about the DISCORDJS Bot Template.'),

  async execute(interaction) {
    return aboutCommand.execute(interaction);
  },
};
