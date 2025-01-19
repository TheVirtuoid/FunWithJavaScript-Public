import CutType from "../../src/classes/support/CutType.js";

describe('When I work with the CutType class', () => {
	it('should throw error when instantiated', () => {
		expect(() => {
			new CutType();
		}).to.throw('CutType is a singleton and cannot be instantiated');
	});
	it('should return true for a valid cut type', () => {
		expect(CutType.valid(CutType.NONE)).to.be.true;
	});
	it('should return false for an invalid cut type', () => {
		expect(CutType.valid('invalid')).to.be.false;
	});
});