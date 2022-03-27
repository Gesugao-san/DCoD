
// 1: npm i discord.js express express-handlebars body-parser nodemon sequelize sqlite3
// 2: node ".\deploy-commands.js"
// 3: git update-index --assume-unchanged config.json
// 4: insert token
// 5: nodemon ".\index_web.js" --trace-deprecation
// 6: http://localhost:5665/?token=123456
// https://github.com/zekroTutorials/DiscordWebsocket

//const { Client } = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const WS = require('./../../ws/ws');
var hbs = require('express-handlebars');

// load config.json
const config = require('./../../config.json');

// Create Discord Bot Client
//var client = new Client();
const client = new Client({intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES
]});
// inject config into client instance object
client.config = config;

// Create Websocket instance with token '123456',
// port 5665 and passing the discord client instance
var ws = new WS(config.ws.token, config.ws.port, client);

// If the bot is ready, this event will be fired
client.on('ready', () => {
	console.log(`Connected as ${client.user.tag}`);
})

// Logging in Discord Bot at the API
client.login(config.token);
