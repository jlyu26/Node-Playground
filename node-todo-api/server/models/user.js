var mongoose = require('mongoose');

var User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
}); 

var user = new User ({
	email: '  jlyu@wpi.edu '
})

// user.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 4));
// }, (e) => {
// 	console.log('Unable to save', e);
// })


module.exports = { User };