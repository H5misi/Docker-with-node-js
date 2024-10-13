const express = require('express');
const { default: mongoose } = require('mongoose');
const { Client } = require('pg');
const redis = require('redis');

// init app
const port = process.env.port || 4000;
const app = express();

// connect to redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.connect();

// connect to PostgreSQL
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres'; //host name must be same as service name in docker-compose.yml

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const postgresClient = new Client({
	connectionString: URI,
});
postgresClient
	.connect()
	.then(() => console.log('connected to PostgreSQL db'))
	.catch((err) => console.log('failed to connect to PostgreSQL db: ' + err));

// // connect to MongoDB
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo'; //host name must be same as service name in docker-compose.yml

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
// 	.connect(URI)
// 	.then(() => console.log('connected to Mongoose'))
// 	.catch((err) => console.log('failed to connect to Mongoose: ' + err));

//
app.get('/', (req, res) => {
	redisClient.set('product', 'Products...  :D');
	res.send('<h1>Hello! dev<h1>');
});
app.get('/data', async (req, res) => {
	const products = await redisClient.get('product');
	res.send(`<h1>Hello! dev<h1> <h2>${products}</h2>`);
});

// Use backticks for template literals in the console log
app.listen(port, () => console.log(`app is running on port: ${port}`));
