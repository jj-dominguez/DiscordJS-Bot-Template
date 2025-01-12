const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

// const { N8N_WEBHOOK_URL_TEST } = process.env;
const N8N_WEBHOOK_URL_PROD = 'http://localhost:5678/webhook/094bcc98-9684-4394-a262-3b3094429882';
const N8N_WEBHOOK_URL_TEST = 'http://localhost:5678/webhook-test/094bcc98-9684-4394-a262-3b3094429882';
const webhookUrl = N8N_WEBHOOK_URL_PROD;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with Flowstate AI.')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input or question for OpenAI tools')
        .setRequired(true)),

  async execute(interaction) {
    await interaction.deferReply();
    const userInput = interaction.options.getString('input');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: interaction.user.id,
          username: interaction.user.username,
          content: userInput,
        }),
      });

      const responseBody = await response.json();
      console.log("Response data received from webhook:", responseBody);

      if (responseBody && responseBody.response && responseBody.response.content) {
        const aiResponse = responseBody.response.content;

        // Truncate or Split into chunks
        const messageChunks = aiResponse.match(/[\s\S]{1,2000}/g) || [];

        for (let i = 0; i < messageChunks.length; i++) {
          await interaction.followUp({
            content: messageChunks[i],
            ephemeral: true, // Use ephemeral if you don't want others to see it
          });
        }

      } else {
        await interaction.editReply('Failed to obtain a valid response.');
      }
    } catch (error) {
      console.error('Error processing n8n webhook response:', error);
      await interaction.editReply('An error occurred while processing your request.');
    }
  },
};
