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

/*
// Client.on("ready", async () => {
// 	try {
// 		guild = await Client.guilds.fetch(GUILD_ID);
// 		// voiceChannel = guild.channels.cache.get(VOICE_CHANNEL_ID);
// 	} catch (error) {
// 		console.log(error);
// 		process.exit(1);
// 	}
// 	channel = guild.channels.cache.get(TEXT_CHANNEL_ID);
// 	console.log("ArsonBot is ready to burn...");
// 	Client.user.setPresence({ activity: { name: "it burn...", type: "WATCHING" }});
// });

// use node-cron to create a job to run every Sunday at 9am
// cron.schedule format goes "* * * * * *", as follows:
// sec min hour(0-23) dayOfMonth(1-31) month(1-12 || names) dayOfWeek(0-7 || names, 0 and 7 are Sunday)
//const task = cron.schedule("0 * * * * *", async () => {
const task = cron.schedule("0 0 13 * * 0", async () => {
	// let { hour, amPm, timezoneOffsetString } = getTimeInfo();

	// if text channel was defined send message in chat
	if (channel) {
		// const messageEmbed = new Discord.MessageEmbed()
		// .setColor("#FFD700")
		// .setTitle(`The time is now ${hour}:00 ${amPm} GMT${timezoneOffsetString}`)
		
		channel.send("@everyone, don't forget to update your dev logs today!");
		//channel.send("This is an automated test message. If you believe you received this message in error please contact my idiot administrator, @lessthanstellar#7310.");
	}

	// // check if VC defined in config is empty
	// if (voiceChannel.members.size >= 1) {
	// 	try {
	// 		Client.user.setPresence({ activity: { name: "the big bell", type: "PLAYING" }, status: "available" });
	// 		// connect to voice channel
	// 		const connection = await voiceChannel.join();
	// 		// counter for looping
	// 		let count = 1;
		
	// 		// immediately invoked function that loops to play the bell sound 
	// 		(function play(Client) {
	// 			connection.play("bigben.mp3")
	// 			.on("finish", () => {
	// 				count += 1;
	// 				if (count <= hour && MATCH_DINGS_WITH_HOUR == "true") {
	// 					play(Client);
	// 				} else {
	// 					connection.disconnect();
	// 					Client.user.setPresence({ activity: { name: "the hour", type: "WATCHING" }, status: "idle" });
	// 				}
	// 			})
	// 		})();

	// 	} catch(error) {
	// 		console.log(error);
	// 	}
	// }
});

// function to get current time and return object containing
// hour and if it is am or pm
// const getTimeInfo = () => {
// 		let time = new Date();
// 		let hour = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
// 		hour = hour === 0 ? 12 : hour;
// 		let amPm = time.getHours() >= 12 ? "PM" : "AM";
// 		// get gmt offset in minutes and convert to hours
// 		let gmtOffset = time.getTimezoneOffset() / 60
// 		// turn gmt offset into a string representing the timezone in its + or - gmt offset
// 		let timezoneOffsetString = `${gmtOffset > 0 ? "-":"+"} ${Math.abs(gmtOffset)}`;

// 	return {
// 		hour,
// 		amPm,
// 		timezoneOffsetString
// 	}
// }

// start the cron job
task.start();
*/
client.login(TOKEN);
