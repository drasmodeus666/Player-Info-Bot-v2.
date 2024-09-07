const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dataFilePath = path.join(__dirname, '..', 'data', 'players.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addplayer')
        .setDescription('Adds a player to the database.')
        .addStringOption(option => 
            option.setName('firstname')
                .setDescription('Player First Name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('lastname')
                .setDescription('Player Last Name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('ign')
                .setDescription('Player In-Game Name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('gameid')
                .setDescription('Player Game ID')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('serverid')
                .setDescription('Player Server ID')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('device')
                .setDescription('Player Device')
                .setRequired(true)),
    async execute(interaction) {
        const firstName = interaction.options.getString('firstname');
        const lastName = interaction.options.getString('lastname');
        const ign = interaction.options.getString('ign');
        const gameid = interaction.options.getString('gameid');
        const serverid = interaction.options.getString('serverid');
        const device = interaction.options.getString('device');

        let players = [];
        if (fs.existsSync(dataFilePath)) {
            try {
                const data = fs.readFileSync(dataFilePath);
                players = JSON.parse(data);
            } catch (error) {
                console.error('Error reading JSON file:', error);
                players = [];
            }
        }

        players.push({ firstName, lastName, ign, gameid, serverid, device });

        try {
            fs.writeFileSync(dataFilePath, JSON.stringify(players, null, 2));
        } catch (error) {
            console.error('Error writing JSON file:', error);
        }

        await interaction.reply(`Player ${firstName} ${lastName} added successfully!`);
    },
};
