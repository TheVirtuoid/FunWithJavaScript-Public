import Mineral from "./Mineral.js";

describe('Element Class', () => {
	it('should throw error when using constructor', () => {
		expect(() => new Mineral()).to.throw();
	});

	describe('Static Properties', () => {
		it('should have definitions for the 5 extractor types', () => {
			expect(Mineral.AETHERITE).to.exist;
			expect(Mineral.PYROTITE).to.exist;
			expect(Mineral.LUMINUM).to.exist;
			expect(Mineral.OBSIDIANITE).to.exist;
			expect(Mineral.ZENITHIUM).to.exist;
		});
	});

	describe('Static Methods', () => {
		it('should return element using has()', () => {
			expect(Mineral.Has(Mineral.AETHERITE)).to.be.true;
			expect(Mineral.Has(Mineral.PYROTITE)).to.be.true;
			expect(Mineral.Has(Mineral.LUMINUM)).to.be.true;
			expect(Mineral.Has(Mineral.OBSIDIANITE)).to.be.true;
			expect(Mineral.Has(Mineral.ZENITHIUM)).to.be.true;
		});

		it('should return false for has() if element is not listed', () => {
			expect(Mineral.Has(Symbol('invalid'))).to.be.false;
		});
	});
})