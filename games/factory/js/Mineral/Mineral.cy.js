import Mineral from "./Mineral.js";

describe('Element Class', () => {

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

	describe('constructor', () => {
		it('should throw error if type is invalid', () => {
			expect(() => new Mineral({ type: 'bad' })).to.throw();
		});

		it('should create a mineral with the specified type', () => {
			const mineral = new Mineral({ type: Mineral.AETHERITE });
			expect(mineral.type).to.equal(Mineral.AETHERITE);
			expect(mineral.purity).to.be.a('number');
		})
	});

	describe('Properties', () => {
		it('should throw error if trying to change type', () => {
			const mineral = new Mineral({ type: Mineral.AETHERITE });
			expect(() => mineral.type = Mineral.PYROTITE).to.throw();
		});
		it('should throw error if trying to change purity', () => {
			const mineral = new Mineral({ type: Mineral.AETHERITE });
			expect(() => mineral.purity = 2).to.throw();
		});
	});

	describe('Methods', () => {});
})