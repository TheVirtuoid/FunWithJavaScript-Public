/*

6. Distribution Center
   - Sells good to the outside world for profit.
   - Is always situated in the middle of the map.
   - Has a connection to the outside world in which a "company" truck moves goods from the center to the outside world. This is when the sell is made.
   - Can increase warehouse capacity.
   - The footprint of the distribution center is 2 squares by 2 squares.

 */

import DistributionCenter from "./DistributionCenter.js";

describe('Distribution Center Class', () => {
	describe('Static Properties', () => {});

	describe('constructor', () => {
		it('should create a class with the default values', () => {
			const distributionCenter = new DistributionCenter();
			expect(distributionCenter).to.be.an.instanceOf(DistributionCenter);
			expect(distributionCenter.cash).to.equal(0);
			expect(distributionCenter.name).to.equal('');
		});
	});

	describe('Methods', () => {
		it('should report on sales')
	});

	describe('Properties', () => {
		let distributionCenter;
		beforeEach(() => {
			distributionCenter = new DistributionCenter();
		});

		it('should throw error if trying to change cash', () => {
			expect(() => distributionCenter.cash = 2).to.throw();
		});

		it('should throw error if trying to change name', () => {
			expect(() => distributionCenter.name = 'newName').to.throw();
		});

		describe('initialize()', () => {
			it('should throw an error if no name is specified', () => {
				expect(() => distributionCenter.initialize()).to.throw();
			});

			it('should throw an error if blank name is specified', () => {
				expect(() => distributionCenter.initialize('')).to.throw();
			});

			it('should throw an error if the name is too long or invalid', () => {
				expect(() => distributionCenter.initialize('a'.repeat(31))).to.throw();
				expect( () => distributionCenter.initialize(123)).to.throw();
			});

			it('should initialize the game', () => {
				distributionCenter.initialize('test');
				expect(distributionCenter.name).to.equal('test');
				expect(distributionCenter.cash).to.equal(1000);
			});
		});

	});

	describe('Events', () => {});

});