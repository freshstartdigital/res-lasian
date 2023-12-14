# Use the official Puppeteer image as a base
FROM buildkite/puppeteer:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the rest of the app source code
COPY . .

# Set permissions for the "node" user
RUN chown -R node:node /app

# Use non-root user
USER node


# Start the application
CMD ["node", "index.js"]
