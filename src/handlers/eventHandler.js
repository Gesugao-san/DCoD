/* module.exports = (err, files, client) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		const eventFunction = require(`./../events/${file}`);
		if (eventFunction.disabled) return;

		const event = eventFunction.event || file.split(".")[0];
		const emitter =
			(typeof eventFunction.emitter === "string"
				? client[eventFunction.emitter]
				: eventFunction.emitter) || client;
			const once = eventFunction.once;

		try {
			emitter[once ? "once" : "on"](event, (...args) =>
				eventFunction.execute(...args, client)
			);
		} catch (error) {
			console.error(error.stack);
		}
	});
}; */

const path = require('path');
const fs = require('fs').promises;
const BaseEvent = require('./../structures/BaseEvent');

async function registerEvents(client, dir = '') {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
		if (file.endsWith('.js')) {
			const Event = require(path.join(filePath, file));
			if (Event.prototype instanceof BaseEvent) {
				const event = new Event();
				client.events.set(event.name, event);
				client.on(event.name, event.run.bind(event, client));
			}
		}
	}
}

module.exports = {
	registerEvents
};
