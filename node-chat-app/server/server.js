const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		// socket.leave('leaving a room by name');

		// Two ways to emit specific room:
		// io.emit -> io.to('room name').emit
		// socket.broadcast.emit -> socket.broadcast.to('room name').emit
		// socket.emit
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		
		callback();

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}		
	});

	// socket.on('createEmail', (newEmail) => {
	// 	console.log('createEmail', newEmail);
	// });

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
		// console.log('User was disconnected');
	});
});


server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});