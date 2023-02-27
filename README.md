# **Usage Instructions**

## **Prerequisites**

- ### [Node.JS](https://nodejs.org/en/) 14.0.0 or higher.
- ### You will need basic knowledge of node.js and how to navigate via cmd prompt or terminal.
- ### Setup a discord bot account and get your bot token. Instructions on this can be found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#keeping-your-token-safe).

## **Instructions**
- ## **Step 1**: `git-clone` or download the project from this repo to your machine. CD into the project dir and run `npm install` to install dependencies.
- ## **Step 2**: In the project directory rename `.env.example` to just `.env`. Open the file with a text editor and replace the placeholder TOKEN, GUILD_ID, VOICE_CHANNEL_ID, TEXT_CHANNEL_ID(text channel is optional) with your own and save. See [this link](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to learn how to get these id's.
- ## **Step 3**: Start the bot by navigating in CMD prompt or terminal into the project dir and running `node bot.js` or using a process manager like [PM2](https://www.npmjs.com/package/pm2)
