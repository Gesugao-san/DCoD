// const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		//console.log(`Logged in as ${client.user.tag}!`);
	},
};
