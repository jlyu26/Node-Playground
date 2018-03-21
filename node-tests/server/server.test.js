const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {
	describe('Root', () => {
		it('should return hello there reqponse', (done) => {
			request(app)
				.get('/')
				.expect(404)
				.expect((res) => {
					expect(res.body).toInclude({
						error: 'Page not found.'
					});
				})
				.end(done);
		})
	});

	describe('Users', () => {
		it('should return my users object', (done) => {
			request(app)
				.get('/users')
				.expect(200)	// default status code used by Express
				.expect((res) => {
					expect(res.body).toInclude({
						name: 'Jinyan', 
						age: 28
					});
				})
				.end(done);
		});
	});
});