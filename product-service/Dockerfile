# Use official Node.js runtime as the base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the Nest app
RUN npm run build

# Your app binds to port 3000 by default
EXPOSE 3002

# Run the built app
CMD ["node", "dist/main"]