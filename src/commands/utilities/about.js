const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
const createEmbed = require('../../utils/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Displays information about FLOWSTATE AI.'),
  async execute(interaction) {
    await interaction.deferReply();

    const embedOptions = {
      description: `Flowstate AI is your personal productivity bot, intelligently streamlining tasks and communications to amplify your daily efficiency. By automating priority tasks and integrating seamlessly with your tools, Flowstate AI empowers you to focus on what truly matters, maintaining clarity and drive each day. Experience a new era of operational elegance—where every action aligns with your goals, effortlessly.`,
      footerText: 'v0.0.1',
      timestamp: false,
    };

    const embed = createEmbed.createEmbed(embedOptions);

    await interaction.editReply({ embeds: [embed], components: [row] });
  },
};
