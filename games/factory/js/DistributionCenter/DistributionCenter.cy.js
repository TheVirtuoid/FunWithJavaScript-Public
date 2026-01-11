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
			expect(distributionCenter.warehouseCapacity).to.equal(100);
		});
	});

	describe('Methods', () => {});

	describe('Properties', () => {});

	describe('Events', () => {});

});