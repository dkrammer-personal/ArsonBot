# Raspbian is buster (?), not that that matters
# Pretty sure it's good to use the slim image here bc Raspberry Pi is v tiny
FROM node:lts-buster-slim

# Create app directory (holds application code at this location in the image)
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

# npm install installs deps dynamically (?)
# npm ci does a clean install from package-lock.json
# npm ci is meant for production environments and 
# automated deployments

# RUN npm install
RUN npm ci

# Bundle app source
COPY . .

# Usually you have to expose a port but I don't think that's necessary for this?
# EXPOSE 8080 (example port number)

# Launch bot
CMD [ "node", "bot.js" ]
