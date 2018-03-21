const express = require('express');

var app = express();

app.get('/', (req, res) => {
	res.status(404).send({
		error: 'Page not found.',
		name: 'Todo App 1.0'
	});
});

app.get('/users', (req, res) => {
	res.status(200).send([
		{ name: 'Jinyan', age: 28 },
		{ name: 'Jae', age: 23 },
		{ name: 'Joy', age: 39 }
	]);
});

app.listen(3000);
module.exports.app = app;