
/* const ascii = require("ascii-table");
const commandCheck = require("./../utils/commandCheck");
const table = new ascii().setHeading("command", "Load Status");

module.exports = async (err, files, client) => {
	if (err) return console.error(err);
	files.forEach((file, index) => {
		const command = require(`./../commands/${file}`);
		if (true) {//(commandCheck(command.name, command)) {
			if (command.name) {
				client.commands.set(command.name, command);
				table.addRow(command.name, "✔");

				if (command.aliases && Array.isArray(command))
					command.aliases.foreach((alias) =>
						client.aliases.set(alias, command.name)
					);
			} else {
				table.addRow(command.name, "✖");
			}
		}
		if (index == files.length - 1) console.log(table.toString());
	});
}; */



const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./../structures/BaseCommand');

async function registerCommands(client, dir = '') {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
		if (file.endsWith('.js')) {
			const Command = require(path.join(filePath, file));
			if (Command.prototype instanceof BaseCommand) {
				const cmd = new Command();
				client.commands.set(cmd.name, cmd);
				cmd.aliases.forEach((alias) => {
					client.commands.set(alias, cmd);
				});
			}
		}
	}
}


module.exports = {
	registerCommands
};
