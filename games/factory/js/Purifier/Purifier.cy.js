/*

2. Purifiers
   - Can be leveled up to purify the mineral more effectively.
   - "Level" is represented by a single number that determines the % chance of purifying the mineral.
   - The more "pure" a mineral is, the higher the sale price.
   - Purifiers have only one input and one output. These can be on any of the four sides, just not on the same side.
   - Produces 'ingots,' which is the purified mineral (actually, just sets the purity rating on the mineral)
   - Footprint is 2 squares. The input and output are on opposite sides along the long width of the purifier.

 */

import Purifier from "./Purifier.js";
import Mineral from "../Mineral/Mineral.js";

describe('Purifier Class', () => {
	describe('Static Properties', () => {});

	describe('constructor', () => {
		it('should create a purifier with default level 1', () => {
			const purifier = new Purifier();
			expect(purifier).to.be.instanceOf(Purifier);
		});
	});

	describe('Methods', () => {
		let purifier;
		beforeEach(() => {
			purifier = new Purifier();
		});

		it('should throw error if trying to purify a non-mineral', () => {
			expect(() => purifier.purify('invalid')).to.throw();
		});

		it('should purify the mineral', () => {
			const mineral = new Mineral({ type: Mineral.AETHERITE });
			const purity = mineral.purity;
			purifier.purify(mineral);
			expect(mineral.purity).to.be.above(purity);
		});
	});

	describe('Properties', () => {});

	describe('Events', () => {});
});