const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	
	// findOneAndUpdate
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5ab3293c851155869e41110d')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5ab2a2444cf67019f4b97336')
	}, {
		$set: { name: 'Jinyan Lyu' },
		$inc: { age: 1 }
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})






	

	// db.close();
});