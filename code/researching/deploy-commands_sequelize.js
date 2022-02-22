
// 1: npm i discord.js express express-handlebars body-parser nodemon sequelize sqlite3
// 2: node ".\deploy-commands_sequelize.js"
// 3: git update-index --assume-unchanged config_legacy.json
// 4: insert token
// 5: nodemon ".\index_sequelize.js" --trace-deprecation
// https://discordjs.guide/sequelize/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

const commands = [
	new SlashCommandBuilder().setName('addtag').setDescription('Let\'s start with the ability to add a tag.'),
	new SlashCommandBuilder().setName('tag').setDescription('Next, let\'s fetch the inserted tag.'),
	new SlashCommandBuilder().setName('edittag').setDescription('Editing a tag.'),
	new SlashCommandBuilder().setName('taginfo').setDescription('Display info on a specific tag.'),
	new SlashCommandBuilder().setName('showtags').setDescription('Listing all tags.'),
	new SlashCommandBuilder().setName('removetag').setDescription('Deleting a tag.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
