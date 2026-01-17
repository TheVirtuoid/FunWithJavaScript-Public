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
import Vector2d from "../Vector/Vector2d/Vector2d.js";

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

	describe('Properties', () => {});

	describe('Events', () => {});

});