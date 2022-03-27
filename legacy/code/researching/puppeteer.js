
// node ".\legacy\code\researching\puppeteer.js"

const puppeteer = require('puppeteer');


console.clear();
(async () => {
	const browser = await puppeteer.launch();
	const path1 = 'https://discord.com/invite/discord-testers';
	const page = await browser.newPage();
	await page.setViewport({
		width: 900, //640,
		height: 800, //480,
		deviceScaleFactor: 1,
	});
	await page.setRequestInterception(true);

	console.log("Hi!");


	page.on('request', request => {
		if (request.isNavigationRequest() && request.redirectChain().length !== 0) {
			request.abort();
		} else {
			request.continue();
		}
	});
	/* page.on('response', async (response) => {
		//if (response.url() == "https://capuk.org/ajax_search/capmoneycourses"){
		console.log('XHR response received');
		console.log(await response.json());
		//}
	}); */

	process.stdout.write("goto (1)... ");
	await page.goto(path1).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;

	process.stdout.write("screenshot (1)... ");
	await page.screenshot({ path: './legacy/code/researching/puppeteer.png' }).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1); // reject
	});

	console.log("Bye!");
	await browser.close();
	process.exit(0);
})();
