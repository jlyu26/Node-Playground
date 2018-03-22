const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5ab2bc63851155869e40f04c')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 4));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	db.collection('Users').find({ name: 'Jinyan Lyu'}).count().then((count) => {
		console.log(`Users count: ${count}`);
	}, (err) => {
		console.log('Unable to fetch users', err);
	});
	
	// db.close();
});