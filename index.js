const fs = require('fs');
const Sequelize = require('sequelize');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './data/database.sqlite',
});

client.DiscordServers = sequelize.define('discord-servers', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
	},
	name: Sequelize.STRING,
	/* usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}, */
});

fs.readdir("./commands/", async (err, files) => {
	const commandHandler = require("./handler/commandHandler");
	await commandHandler(err, files, client);
});

fs.readdir("./events/", (err, files) => {
	const eventHandler = require("./handler/eventHandler");
	eventHandler(err, files, client);
});

process.on('SIGINT', function() {
	console.log("Caught interrupt signal."); //"Medical examination: Killed by сaughted interrupt signal."
	client.user.setStatus("invisible");
	client.guilds.cache.forEach(guild => {
		if (client.playerManager.get(guild)) client.playerManager.leave(guild);
	});
	process.exit();
});

client.login(token);
