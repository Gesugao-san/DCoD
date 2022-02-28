
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		const command = client.commands.get(interaction.commandName);
		console.log(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}: <@!${interaction.user.id}> triggered an interaction: ${interaction.commandName}`);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
