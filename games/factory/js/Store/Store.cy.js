import Store from "./Store.js";

describe('Store', () => {
	describe('constructor', () => {
		it('should create a store with defaults', () => {
			const store = new Store();
			expect(store.level).to.equal(0);
			expect(store.conveyors.size).to.equal(0);
			expect(store.extractors.size).to.equal(0);
			expect(store.purifiers.size).to.equal(0);
			expect(store.combinators.size).to.equal(0);
			expect(store.id).to.be.a('string');
		});
	});

	describe('Properties', () => {
		let store;
		beforeEach(() => {
			store = new Store();
		});

		it('should throw error if trying to change level', () => {
			expect(() => store.level = 2).to.throw();
		});
		it('should throw error if trying to change conveyors', () => {
			expect(() => store.conveyors = new Map()).to.throw();
		});
		it('should throw error if trying to change extractors', () => {
			expect(() => store.extractors = new Map()).to.throw();
		});
		it('should throw error if trying to change purifiers', () => {
			expect(() => store.purifiers = new Map()).to.throw();
		});
		it('should throw error if trying to change combinators', () => {
			expect(() => store.combinators = new Map()).to.throw();
		});
	});

	describe('Methods', () => {
		let store;
		beforeEach(() => {
			store = new Store();
		});
		it('should increment the level', () => {
			const oldLevel = store.level;
			store.incrementLevel();
			expect(store.level).to.equal(oldLevel + 1);
		});
	});

	describe('Events', () => {});
});