/*

4. Conveyor Belts
   - Can be leveled up to increase the speed of transport.
   - "Level" is represented by a single number that determines the speed of transport.
   - There are a number of different belts:
     1. Straight
     2. Curve. Curves 90 degrees
     3. Bridge. Goes over another conveyor belt.
     4. T-intersection. Intersects two conveyor bets
     5. X-intersection. Intersects two conveyor bets
     6. The footprint of all conveyor belts is 1 square.

 */

import Conveyor from "./Conveyor.js";

describe('Conveyor Class', () => {
	describe('Static Properties', () => {
		it('should define the different types', () => {
			expect(Conveyor.STRAIGHT).to.exist;
			expect(Conveyor.CURVE).to.exist;
			expect(Conveyor.BRIDGE).to.exist;
			expect(Conveyor.T_INTERSECTION).to.exist;
			expect(Conveyor.X_INTERSECTION).to.exist;
		});
	});

	describe('constructor', () => {
		it('should throw error if type is not specified or is invalid', () => {
			expect(() => new Conveyor({ type: 'bad' })).to.throw();
		});

		it('should create a new conveyor with defaults', () => {
			const conveyor = new Conveyor({ type: Conveyor.STRAIGHT });
			expect(conveyor).to.be.an.instanceOf(Conveyor);
			expect(conveyor.orientation).to.equal(0);
		});
	});

	describe('Methods', () => {});

	describe('Properties', () => {
		let conveyor;
		beforeEach(() => {
			conveyor = new Conveyor({ type: Conveyor.STRAIGHT });
		})
		it('should throw error if changing id', () => {
			expect(() => conveyor.id = 'newId').to.throw();
		});
		it('should throw error if changing orientation', () => {
			expect(() => conveyor.orientation = 2).to.throw();
		});
		it('should throw error if changing type', () => {
			expect(() => conveyor.type = Conveyor.BRIDGE).to.throw();
		});
	});

	describe('Events', () => {});

});