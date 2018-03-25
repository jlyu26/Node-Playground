const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5ab6eb8da88893a00fab51f3';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by id', todo);
// }).catch((e) => {
// 	console.log(e);
// });

User.findById('5ab4167cde3da580271afbb0').then((user) => {
	if (!user) {
		return console.log('Unable to find user');
	}

	console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
	console.log(e);
});