require('dotenv').config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  botColor: process.env.BOT_COLOR || '#0ab9ee',
  developerId: process.env.DEVELOPER_ID?.split(',') || [],
  deployCommands: process.env.DEPLOY_COMMANDS === 'true',
  botName: process.env.BOT_NAME || 'FlowState AI',
  botLogsChannel: process.env.BOT_LOGS_CHANNEL,
  comLogsChannel: process.env.COM_LOGS_CHANNEL,
  webhooks: {
    n8nProd: process.env.N8N_WEBHOOK_URL_PROD,
    n8nTest: process.env.N8N_WEBHOOK_URL_TEST
  },
  isProduction: process.env.NODE_ENV === 'production'
};
