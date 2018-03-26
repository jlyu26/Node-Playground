var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	// socket.emit('createEmail', {
	// 	to: 'Jean@example.com',
	// 	text: 'Hello!'
	// });

	// socket.emit('createMessage', {
	// 	from: 'Jinyan',
	// 	text: 'That works for me'
	// });
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New email', email);
// });

socket.on('newMessage', function(message) {
	console.log('newMessage', message);
});