const { SlashCommandBuilder } = require('discord.js');
const client = require('../../../bootstrap');
const createEmbed = require('../../utils/embedBuilder');
const config = require('../../../config/environment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('[DEV] Restart\'s the client!'),
  developer: true,
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const embedOptions = {
        fields: [
          {
            name: 'Restart',
            value: `Bot is restarting...`,
            inline: true,
          },
        ],

        titleText: '**Restart**',
      };

      // create embed
      embed = createEmbed.createEmbed(embedOptions);

      await interaction.editReply({
        embeds: [embed],
      });

      await client.destroy();
      await client.login(config.token);

      const embedOptions2 = {
        fields: [
          {
            name: 'Restart',
            value: `Bot restarted`,
            inline: true,
          },
        ],

        titleText: '**Restart**',
      };

      // create embed
      embed2 = createEmbed.createEmbed(embedOptions2);

      await interaction.followUp({
        embeds: [embed2],
      });
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.editReply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  },
};
