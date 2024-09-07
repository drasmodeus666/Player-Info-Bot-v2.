const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeplayer')
        .setDescription('Removes a player from the database.')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Player name')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name');

        // Remove player from database logic here

        await interaction.reply(`Player ${name} removed successfully!`);
    },
};
