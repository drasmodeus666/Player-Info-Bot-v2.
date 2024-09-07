const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dataFilePath = path.join(__dirname, '..', 'data', 'players.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getplayer')
        .setDescription('Gets a player from the database.')
        .addStringOption(option => 
            option.setName('firstname')
                .setDescription('Player First Name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('lastname')
                .setDescription('Player Last Name')
                .setRequired(true)),
    async execute(interaction) {
        const firstName = interaction.options.getString('firstname');
        const lastName = interaction.options.getString('lastname');

        if (!fs.existsSync(dataFilePath)) {
            await interaction.reply(`No players found.`);
            return;
        }

        let players = [];
        try {
            const data = fs.readFileSync(dataFilePath, 'utf8');
            if (data) {
                players = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error reading JSON file:', error);
            await interaction.reply(`Error reading player data.`);
            return;
        }

        const player = players.find(p => p.firstName === firstName && p.lastName === lastName);

        if (player) {
            await interaction.reply(`Player ${firstName} ${lastName} details:\nIGN: ${player.ign}\nGame ID: ${player.gameid}\nServer ID: ${player.serverid}\nDevice: ${player.device}`);
        } else {
            await interaction.reply(`Player ${firstName} ${lastName} not found.`);
        }
    },
};
