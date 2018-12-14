require('dotenv').config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');

const app = express();

let serverPort = process.env.PORT || 5000;

// const index = require("./routes/index");
// app.use(index);


// ---
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');
const beerRoute = require('./routes/beer.route');
const tastingRoute = require('./routes/tasting.route');
const votingRoute = require('./routes/voting.route');

// ---

// Set up mongoose connection
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true
	}).then(() => {
		console.log("[MongoDB]: Connected to Mongo DB");
	}).catch(err => {
		console.log('MongoDB connection error:' + err);
		process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users', userRoute);
app.use('/api/beers', beerRoute);
app.use('/api/tastings', tastingRoute);
app.use('/api/votings', votingRoute);

app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const server = http.createServer(app);

// const io = socketIo(server);

// let interval;

// io.on("connection", socket => {
// 	console.log("New client connected");

// 	if (interval) {
// 		clearInterval(interval);
// 	}

// 	interval = setInterval(() => getApiAndEmit(socket), 5000);

// 	socket.on("disconnect", () => {
// 		console.log("Client disconnected");
// 	});
// });


// const getApiAndEmit = async socket => {
// 	try {
// 		socket.emit("CurrentBeer", Math.random() * 30);
// 	} catch (error) {
// 		console.error(`Error: ${error.code}`);
// 	}
// };

server.listen({port: serverPort}, () => {
	console.log(`[Node]: Listening on port ${serverPort}`);
});