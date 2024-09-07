const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides a list of available commands.'),
    async execute(interaction) {
        await interaction.reply('Available commands: /ping, /info, /help, /addplayer, /getplayer, /removeplayer');
    },
};
