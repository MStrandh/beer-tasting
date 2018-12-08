const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const serverHost = "192.168.0.13";
const serverPort = process.env.PORT || 4001;
const app = express();


// const index = require("./routes/index");
// app.use(index);


// ---
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');
// ---

// Set up mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://localhost:27017/beertasting';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, {
		useNewUrlParser: true
	}).then(() => {
		console.log("[MongoDB]: Connected to: " + dev_db_url);
	}).catch(err => {
		console.error.bind(console, 'MongoDB connection error:');
		process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', userRoute);


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