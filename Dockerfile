FROM node:20

# Work directory inside the container
WORKDIR /app

# COPY source dest -> copy package inside the container
COPY package.json /app/

# install suitable packages depending on the environment
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ];\
    then npm install --only=production;\
    else npm install;\
    fi

# Run npm install to download node_modules
# RUN npm install

# COPY all files to the container
COPY . .

# To know the number of the port for the application
EXPOSE 4000

# Run the command in the square brackets
# 'npm start' because => to run 'node index.js' without auto resarting for the node app
CMD [ "npm", "run", "start-dev" ]
