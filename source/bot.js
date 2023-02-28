require("dotenv").config();
const { Client, Events, GatewayIntentBits, ActivityType } = require("discord.js");
const cron = require("node-cron");

const { TOKEN, PROD_GUILD_ID, PROD_TEXT_CHANNEL_ID, DEV_GUILD_ID, DEV_TEXT_CHANNEL_ID, ENVIRONMENT } = process.env;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions
	],
	presence: {
		activities: [
			{
				name: "it burn...",
				type: "WATCHING"
			}
		],
		status: "online"
	}
});

var guild, channel;

async function initByEnv(client) {
	if (ENVIRONMENT == "dev") {
		guild = await client.guilds.fetch(DEV_GUILD_ID);
		// console.debug("Joined dev guild: " + guild.name);
		channel = guild.channels.cache.get(DEV_TEXT_CHANNEL_ID);
	}
	else if (ENVIRONMENT == "prod") {
		guild = await client.guilds.fetch(PROD_GUILD_ID);
		// console.debug("Joined prod guild: " + guild.name);
		channel = guild.channels.cache.get(PROD_TEXT_CHANNEL_ID);
	}
	else {
		throw new Error("Invalid environment specified in .env file.");
	}
}

client.on(Events.ClientReady, async c => {
	await initByEnv(c);
	
	console.log("ArsonBot is ready to burn...");

	console.debug(`Env: ${guild.name} #${channel.name}`);

	c.user.setPresence({ activities: [{ name: "it burn...", type: ActivityType.Watching }], status: "online" });
	channel.send("ping");
});

// use node-cron to create a job to run every Sunday at 9am
// cron.schedule format goes "* * * * * *", as follows:
// sec min hour(0-23) dayOfMonth(1-31) month(1-12 || names) dayOfWeek(0-7 || names, 0 and 7 are Sunday)
//const task = cron.schedule("0 * * * * *", async () => {
let schedule = "0 0 13 * * 0";
let testSchedule = "0 * * * * *";
const task = cron.schedule(testSchedule, async () => {
	if (channel) {
		// channel.send("@everyone, don't forget to update your dev logs today!");
		channel.send("This is an automated test message. If you believe you received this message in error please contact my idiot administrator, @lessthanstellar#7310.");
	}
});

// start the cron job
task.start();

client.login(TOKEN);
