
// https://stackoverflow.com/a/64648205/8175291
const fetch = require('node-fetch'); // node-fetch@2.6.1
//import fetch from "node-fetch";

const code_valid   = 'discord-testers';
const code_invalid = 'this-is-invalid';
// https://discordapp.com/api/widget/0
// https://discordapp.com/api/invite/${code}

async function check_guild_widget(id) {
	process.stdout.write(`guild "${id}": `);
	await fetch(`https://discord.com/api/guilds/${id}/widget.json`)
		.then((res) => res.json())
		.then((json) => {
		if (json.message === 'Unknown Guild') {
			//console.log(`the invite is invalid`);
			return Promise.reject(`the guild is unknown`); // Error 1015...
		}
		process.stdout.write(`valid, `);
		if (json.message === 'Widget Disabled') {
			return Promise.reject(`widget is disabled`);
		}
		console.log(`widget is enabled.`);
	});
}

async function check_invite(code) {
	process.stdout.write(`invite "${code}": `);
	await fetch(`https://discordapp.com/api/invite/${code}`)
		.then((res) => res.json())
		.then((json) => {
		if (json.message === 'Unknown Invite') {
			console.log(`invalid`);
			return;
		} else {
			console.log(`valid`);
		}
	});
	await check_guild_widget(json.guild.id);
}


(async () => {
	await check_invite(code_valid);
	await check_invite(code_invalid);
})();
