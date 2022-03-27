
// https://stackoverflow.com/a/64648205/8175291
const fetch = require('node-fetch'); // node-fetch@2.6.1
//import fetch from "node-fetch";

const data = {
	"code_valid": {
		"widget_enabled": "123",
		"widget_disabled": "497368004724523012"
	},
	"code_invalid": "0"

};

const code_valid   = 'discord-testers';
const code_invalid = 'this-is-invalid';
// https://discordapp.com/ - Error 1015...
// https://discordapp.com/api/widget/0
// https://discordapp.com/api/invite/${code}

async function check_guild_widget(id) {
	process.stdout.write(`guild "${id}": `);
	const response = await fetch(`https://discord.com/api/guilds/${id}/widget.json`);
	if (!response.ok) { // Error: 429, Too Many Requests
		console.log(`Error ${response.status}, ${response.statusText}`);
		process.exit();
	}
	const json = await response.json();
	if (json.message === 'Unknown Guild') {
		//console.log(`the invite is invalid`);
		console.log(`the guild is unknown`);
		return;
	}
	process.stdout.write(`valid, Widget: `);
	if (json.message === 'Widget Disabled') {
		console.log(`disabled`);
		return;
	}
	console.log(`enabled`);
}

async function check_invite(code) {
	process.stdout.write(`invite "${code}": `);
	const response = await fetch(`https://discord.com/api/invite/${code}`);
	if (!response.ok) { // Error: 429, Too Many Requests
		console.log(`Error ${response.status}, ${response.statusText}`);
		process.exit();
	}
	const json = await response.json();
	if (json.message === 'Unknown Invite') {
		console.log(`invalid`);
		return;
	}
	process.stdout.write(`valid, inviter: ${json.inviter.id || false}, `);
	await check_guild_widget(json.guild.id);
}


console.clear();
(async () => {
	await check_invite(data["code_valid"]["widget_enabled"]);
	await check_invite(data["code_valid"]["widget_disabled"]);
	await check_invite(data["code_invalid"]);
})();
