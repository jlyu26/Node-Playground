const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {

	describe('#add', () => {
		it('should add two numbers', () => {
			var res = utils.add(33, 11);
			
			expect(res).toBe(44).toBeA('number');
			// if (res !== 44) {
			// 	throw new Error(`Expected 44, but got ${res}.`)
			// }	
		});
	});
	

	it('should async add two numbers', (done) => {
		utils.asyncAdd(4, 3, (sum) => {
			expect(sum).toBe(7).toBeA('number');
			done();
		});
	})


	it('should square a number', () => {
		var res = utils.square(11);

		expect(res).toBe(121).toBeA('number');
		// if (res !== 121) {
		// 	throw new Error(`Expected 121, but got ${res}.`)
		// }
	});

	it('should async square a number', (done) => {
		var res = utils.square(11);

		utils.asyncSquare(15, (square) => {
			expect(square).toBe(225).toBeA('number');
			done();
		});
	});
});



it('should verify first and last names are set', ()=> {
	var user = {
		age: 28,
		Location: 'Worcester, MA'
	};
	var res = utils.setName(user, 'Jinyan Lyu');

	expect(res)
	.toBeA('object')
	.toInclude({
		firstName: 'Jinyan',
		lastName: 'Lyu'
	});
});


it('should expect some values', () => {
	// expect(12).toNotBe(11);
	// toBe() use '===', which only true when two object are the same
	// expect({name: 'Jinyan'}).toBe({name: "Jinyan"});	// will fail
	// expect({name: 'Jinyan'}).toEqual({name: "Jinyan"}); // will pass
	expect({
		name: 'Jinyan',
		age: 28,
		location: 'Worcester, MA'
	}).toInclude({
		age: 28

	});	// will pass

	// expect([2, 3, 4]).toInclude(2);
});