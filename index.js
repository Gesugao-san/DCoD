
// 1: nodemon ".\index.js" --trace-deprecation
// 2: node "".\deploy-commands.js"
// https://discordjs.guide/creating-your-bot/, https://github.com/FiredragonPlayz/discord.js-tutorials

// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const cfg = require("./config.json");

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
//client.removeAllListeners();

/* const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
} */

fs.readdir("./events/", (err, files) => {
	const eventHandler = require("./handler/eventHandler");
	eventHandler(err, files, client);
});

// When the client is ready, run this code (only once)
/* client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
}); */

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

/* client.on('interactionCreate', async interaction => {
	const command = client.commands.get(interaction.commandName);
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}); */

process.on('SIGINT', function() {
	console.log("Caught interrupt signal."); //"Medical examination: Killed by сaughted interrupt signal."
	client.user.setStatus("invisible");
	process.exit();
});

console.clear();
console.log("Logging in...");
client.login(cfg.token);
