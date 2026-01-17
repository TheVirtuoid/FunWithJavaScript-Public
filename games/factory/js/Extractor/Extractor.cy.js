/*

1. Extractors
   - Can be leveled up to extract more minerals OR better minerals.
   - There are 5 types of extractors - one for each of the minerals
   - "Level" is the speed in which the mineral is extracted.
   - An Extractor has only one output for the minerals.
   - Produces 'ore', which is the unpurified mineral.
   - The extractor footprint is one square.

 */

import Extractor from './Extractor';
import Mineral from "../Mineral/Mineral.js";

describe('Extractor Class', () => {

	describe('Static Methods', () => {
		it('should have the database functions', () => {
			expect(Extractor.Cost).to.be.a('function');
			expect(Extractor.Speed).to.be.a('function');
		});
	});

	describe('constructor', () => {
		it('should throw error if type is not specified', () => {
			expect(() => new Extractor()).to.throw();
		});

		it('should throw error if type is invalid', () => {
			expect(() => new Extractor({type: 'bad' })).to.throw();
		});

		it('should create the instance with the specified type and the defaults', () => {
			const extractor = new Extractor({ type: Mineral.AETHERITE });
			expect(extractor.speed).to.equal(Extractor.Speed(Mineral.AETHERITE));
		});
	});

	describe('Methods', () => {
		let extractor;
		beforeEach(() => {
			extractor = new Extractor({ type: Mineral.AETHERITE });
		});

		it('should sell the machine', () => {
			expect(extractor.sell()).to.be.a('number');
		});
	});

	describe('Properties', () => {
		let extractor;
		beforeEach(() => {
			extractor = new Extractor({ type: Mineral.AETHERITE });
		});

		it('should throw error if trying to change speed', () => {
			expect(() => extractor.speed = 2).to.throw();
		});
	});

	describe('Events', () => {});
});
