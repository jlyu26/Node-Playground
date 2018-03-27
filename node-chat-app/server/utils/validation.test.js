const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
	it('should reject none-string values', () => {
		var res = isRealString(999);
		expect(res).toBe(false);
	});
	
	it('should reject string with only spaces', () => {
		var res = isRealString('        ');
		expect(res).toBe(false);
	});

	it('should allow string with none-space characters', () => {
		var res = isRealString('  Jinyan  ');
		expect(res).toBe(true);
	});
});