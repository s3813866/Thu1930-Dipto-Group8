# Provide Source Image for the latest Node Version.
FROM node:latest

# Working Directory for subsequent Docker instructions
WORKDIR /app

# Copy package to the app directory created above
COPY package.json /app

# Install dependencies
RUN npm install

# Copy source files to the app directory
COPY . /app

# Public Port
ENV PORT=3000

# Allow the application to run on port 3000
EXPOSE 3000

# JSON Array for Command Line Arguments
CMD ["npm", "start"]