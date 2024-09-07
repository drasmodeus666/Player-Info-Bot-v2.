const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Provides information about the bot.'),
    async execute(interaction) {
        await interaction.reply('This is a simple Discord bot.');
    },
};
