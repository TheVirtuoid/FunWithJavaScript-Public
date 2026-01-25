import Store from "./Store.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";

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
		it('should start the store', () => {
			store.start();
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(1);
			// rest of data is check when checking the levels
		});
		it('should reset the store', () => {
			store.start();
			store.reset();
			expect(store.level).to.equal(0);
			expect(store.conveyors.size).to.equal(0);
			expect(store.extractors.size).to.equal(0);
			expect(store.purifiers.size).to.equal(0);
			expect(store.combinators.size).to.equal(0);
		});
	});

	describe('Events', () => {});

	describe('Levels', () => {
		let store;
		beforeEach(() => {
			store = new Store();
		});
		it('should correctly set the data for Level 1', () => {
			store.start();
			expect(store.level).to.equal(1);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(1);
			expect(store.purifiers.size).to.equal(0);
			expect(store.combinators.size).to.equal(0);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
		});
		it('should correctly set the data for Level 2', () => {
			store.start();
			store.incrementLevel();
			expect(store.level).to.equal(2);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(2);
			expect(store.purifiers.size).to.equal(1);
			expect(store.combinators.size).to.equal(0);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
		});
		it('should correctly set the data for Level 3', () => {
			store.start();
			store.incrementLevel();
			store.incrementLevel();
			expect(store.level).to.equal(3);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(3);
			expect(store.purifiers.size).to.equal(2);
			expect(store.combinators.size).to.equal(1);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getExtractor(Extractor.LUMINITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
			expect(store.getPurifier(Purifier.PYROTITE)).to.exist;
			expect(store.getCombinator(Combinator.IGNISIUM)).to.exist;
		});
		it('should correctly set the data for Level 4', () => {
			store.start();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			expect(store.level).to.equal(4);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(4);
			expect(store.purifiers.size).to.equal(3);
			expect(store.combinators.size).to.equal(2);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getExtractor(Extractor.LUMINITE)).to.exist;
			expect(store.getExtractor(Extractor.OBSIDIANITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
			expect(store.getPurifier(Purifier.PYROTITE)).to.exist;
			expect(store.getPurifier(Purifier.LUMINITE)).to.exist;
			expect(store.getCombinator(Combinator.IGNISIUM)).to.exist;
			expect(store.getCombinator(Combinator.PHOTONIUM)).to.exist;
		});
		it('should correctly set the data for Level 5', () => {
			store.start();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			expect(store.level).to.equal(5);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(5);
			expect(store.purifiers.size).to.equal(4);
			expect(store.combinators.size).to.equal(3);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getExtractor(Extractor.LUMINITE)).to.exist;
			expect(store.getExtractor(Extractor.OBSIDIANITE)).to.exist;
			expect(store.getExtractor(Extractor.ZENITHITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
			expect(store.getPurifier(Purifier.PYROTITE)).to.exist;
			expect(store.getPurifier(Purifier.LUMINITE)).to.exist;
			expect(store.getPurifier(Purifier.OBSIDIANITE)).to.exist;
			expect(store.getCombinator(Combinator.IGNISIUM)).to.exist;
			expect(store.getCombinator(Combinator.PHOTONIUM)).to.exist;
			expect(store.getCombinator(Combinator.VOIDTISSIUM)).to.exist;
		});
		it('should correctly set the data for Level 6', () => {
			store.start();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			expect(store.level).to.equal(6);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(5);
			expect(store.purifiers.size).to.equal(5);
			expect(store.combinators.size).to.equal(5);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getExtractor(Extractor.LUMINITE)).to.exist;
			expect(store.getExtractor(Extractor.OBSIDIANITE)).to.exist;
			expect(store.getExtractor(Extractor.ZENITHITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
			expect(store.getPurifier(Purifier.PYROTITE)).to.exist;
			expect(store.getPurifier(Purifier.LUMINITE)).to.exist;
			expect(store.getPurifier(Purifier.OBSIDIANITE)).to.exist;
			expect(store.getPurifier(Purifier.ZENITHITE)).to.exist;
			expect(store.getCombinator(Combinator.IGNISIUM)).to.exist;
			expect(store.getCombinator(Combinator.PHOTONIUM)).to.exist;
			expect(store.getCombinator(Combinator.VOIDTISSIUM)).to.exist;
			expect(store.getCombinator(Combinator.SOLTARIUM)).to.exist;
			expect(store.getCombinator(Combinator.MAGNANIUM)).to.exist;
		});
		it('should correctly set the data for Level 7', () => {
			store.start();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			expect(store.level).to.equal(7);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(5);
			expect(store.purifiers.size).to.equal(5);
			expect(store.combinators.size).to.equal(6);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getExtractor(Extractor.LUMINITE)).to.exist;
			expect(store.getExtractor(Extractor.OBSIDIANITE)).to.exist;
			expect(store.getExtractor(Extractor.ZENITHITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
			expect(store.getPurifier(Purifier.PYROTITE)).to.exist;
			expect(store.getPurifier(Purifier.LUMINITE)).to.exist;
			expect(store.getPurifier(Purifier.OBSIDIANITE)).to.exist;
			expect(store.getPurifier(Purifier.ZENITHITE)).to.exist;
			expect(store.getCombinator(Combinator.IGNISIUM)).to.exist;
			expect(store.getCombinator(Combinator.PHOTONIUM)).to.exist;
			expect(store.getCombinator(Combinator.VOIDTISSIUM)).to.exist;
			expect(store.getCombinator(Combinator.SOLTARIUM)).to.exist;
			expect(store.getCombinator(Combinator.MAGNANIUM)).to.exist;
			expect(store.getCombinator(Combinator.ETHERIUM)).to.exist;
		});
		it('should correctly set the data for Level 8', () => {
			store.start();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			store.incrementLevel();
			expect(store.level).to.equal(8);
			expect(store.conveyors.size).to.equal(Conveyor.TYPES.length);
			expect(store.extractors.size).to.equal(5);
			expect(store.purifiers.size).to.equal(5);
			expect(store.combinators.size).to.equal(7);
			expect(store.getExtractor(Extractor.AETHERITE)).to.exist;
			expect(store.getExtractor(Extractor.PYROTITE)).to.exist;
			expect(store.getExtractor(Extractor.LUMINITE)).to.exist;
			expect(store.getExtractor(Extractor.OBSIDIANITE)).to.exist;
			expect(store.getExtractor(Extractor.ZENITHITE)).to.exist;
			expect(store.getPurifier(Purifier.AETHERITE)).to.exist;
			expect(store.getPurifier(Purifier.PYROTITE)).to.exist;
			expect(store.getPurifier(Purifier.LUMINITE)).to.exist;
			expect(store.getPurifier(Purifier.OBSIDIANITE)).to.exist;
			expect(store.getPurifier(Purifier.ZENITHITE)).to.exist;
			expect(store.getCombinator(Combinator.IGNISIUM)).to.exist;
			expect(store.getCombinator(Combinator.PHOTONIUM)).to.exist;
			expect(store.getCombinator(Combinator.VOIDTISSIUM)).to.exist;
			expect(store.getCombinator(Combinator.SOLTARIUM)).to.exist;
			expect(store.getCombinator(Combinator.MAGNANIUM)).to.exist;
			expect(store.getCombinator(Combinator.ETHERIUM)).to.exist;
			expect(store.getCombinator(Combinator.STARFORGE)).to.exist;
		});
	});
});