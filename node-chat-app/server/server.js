const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newEmail', {
	// 	from: 'mike@example.com',
	// 	text: 'what\'s up',
	// 	createAt: 123
	// });

	// socket.emit('newMessage', {
	// 	from: 'Jack',
	// 	text: 'See you later',
	// 	createAt: 12321
	// });

	// socket.emit() emits event to a signle connection,
	// while io.emit() emits event to EVERY single connection
	// and socket.broadcast.emit() means emitting an event to everybody but
	// one specific user.
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server.');

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	// socket.on('createEmail', (newEmail) => {
	// 	console.log('createEmail', newEmail);
	// });

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});


server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});