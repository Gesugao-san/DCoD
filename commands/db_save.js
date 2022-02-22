
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('db_save')
		.setDescription('Save Discords in database.'),
	async execute(interaction) {
		//const DiscordServerInvite = interaction.options.getString('invite');
		try {
			// equivalent to: INSERT INTO tags (id, name) values (?, ?);
			const DiscordServer = await DiscordServers.create({
				id: interaction.guild.id,
				name: interaction.guild.name,
			});

			return interaction.reply(`Server ${DiscordServer.id} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply(`Server ${DiscordServer.id} already exists.`);
			}

			console.error('Something went wrong with adding a server:\n', error);
			return interaction.reply('Something went wrong with adding a server.');
		}
	},
};
