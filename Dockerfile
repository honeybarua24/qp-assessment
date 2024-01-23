# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Expose the port that your NestJS app is listening on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:dev"]