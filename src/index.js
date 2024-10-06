const express = require('express');
const { default: mongoose } = require('mongoose');

// init app
const port = process.env.port || 4000;
const app = express();

// connect to DB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo'; //host name must be same as service name in docker-compose.yml

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
	.connect(URI)
	.then(() => console.log('connected'))
	.catch((err) => console.log('failed to connect: ' + err));

app.get('/', (req, res) => res.send('<h1>Hello! dev<h1>'));

// Use backticks for template literals in the console log
app.listen(port, () => console.log(`app is running on port: ${port}`));
