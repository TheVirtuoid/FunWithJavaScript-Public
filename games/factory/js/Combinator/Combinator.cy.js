/*
3. Combinators
   - Combines two or more minerals into a new alloy
   - There is one combinator for each alloy.
   - When combining, there is some loss. This loss can be reduced by leveling up the combinator.
   - There can be two or three inputs and only one output. These can be on any side.
   - Inputs can only take in one type of mineral.
   - The footprint is 2 sqaures by 2 squares.
     - Each side can only handle one input or one output,
     - The entrance and exit squares can be moved from one square to the other.
 */

import Combinator from "./Combinator.js";
import Alloy from "../Alloy/Alloy.js";

describe('Combinator Class', () => {

	describe('Static Properties', () => {});

	describe('constructor', () => {
		it('should throw error if type is not specified', () => {
			expect(() => new Combinator()).to.throw();
		})
		it('should create a combinator with default level of 1', () => {
			const combinator = new Combinator({ type: Alloy.IGNISIUM});
			expect(combinator.level).to.equal(1);
			expect(combinator.id).to.be.a('string');
			expect(combinator.type).to.equal(Alloy.IGNISIUM);
		});
	});

	describe('Methods', () => {

		describe('combine()', () => {
			let combinator;
			beforeEach(() => {
				combinator = new Combinator();
			});

			it('should throw error if argument is not an array', () => {});

			it('should throw error if array does not have two elements', () => {});

			it('should throw error if both elements are invalid minerals', () => {});

			it('should throw error if the minerals cannot be combined', () => {});

			it('should return the new alloy', () => {});
		});
	});

	describe('Properties', () => {
		it('should throw error if level is changed', () => {
			const combinator = new Combinator();
			expect(() => combinator.level = 2).to.throw();
		});
		it('should throw error if id is changed', () => {
			const combinator = new Combinator();
			expect(() => combinator.id = 'newId').to.throw();
		});
	});

	describe('Events', () => {});

});