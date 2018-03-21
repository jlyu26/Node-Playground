const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App' ,() => {
	var db = {
		saveUser: expect.createSpy()
	};

	app.__set__('db', db);

	it('should call the spy correctly', () => {
		var spy = expect.createSpy();
		spy();
		expect(spy).toHaveBeenCalled();
	});

	it('should call saveUser with user object', () => {
		var email = 'jlyu@wpi.edu';
		var password = 'password';

		app.handleSignup(email, password);
		expect(db.saveUser).toHaveBeenCalledWith({ email, password });
	});
});