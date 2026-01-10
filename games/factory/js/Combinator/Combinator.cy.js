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
import Mineral from "../Mineral/Mineral.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";

describe('Combinator Class', () => {

	describe('Static Properties', () => {});

	describe('constructor', () => {
		it('should throw error if type is not specified', () => {
			expect(() => new Combinator()).to.throw();
		})
		it('should create a combinator with default level of 1', () => {
			const combinator = new Combinator({ type: Alloy.IGNISIUM });
			expect(combinator.level).to.equal(1);
			expect(combinator.id).to.be.a('string');
			expect(combinator.type).to.equal(Alloy.IGNISIUM);
			expect(combinator.capacity).to.equal(100);
			expect(combinator.inventorySize).to.equal(0);
			expect(combinator.position.equal(new Vector2d(0, 0))).to.be.true;
		});
	});

	describe('Methods', () => {

		describe('combine()', () => {
			let combinator;
			beforeEach(() => {
				combinator = new Combinator({ type: Alloy.IGNISIUM });
			});

			it('should throw error if argument is not an array', () => {
				expect(() => combinator.combine('invalid')).to.throw();
			});

			it('should throw error if there is no enough capacity', () => {
				// fill up the capacity;
				while (combinator.inventorySize < combinator.capacity) {
					combinator.combine([Mineral.OBSIDIANITE]);
				}
				expect(() => combinator.combine([Mineral.OBSIDIANITE])).to.throw('Inventory full');
			})

			it('should return undefined if the elements are not part of the combinator alloy mineral assignment', () => {
				const alloy = combinator.combine([Mineral.OBSIDIANITE]);
				expect(alloy).to.be.undefined;
			});

			it('should return the new alloy', () => {
				const recipe = Alloy.Ingredients(combinator.type);
				// load up the inventory, giving one less than what we need.
				recipe.forEach((count, mineral) => {
					for (let i = 1; i < count; i++) {
						combinator.combine([mineral]);
					}
				});
				const alloy = combinator.combine([...recipe.keys()]);
				expect(alloy).to.be.an.instanceOf(Alloy);
				expect(alloy.type).to.equal(combinator.type);
			});
		});

		describe('setPosition', () => {
			it('should throw error if not a value position', () => {});
		});
	});

	describe('Properties', () => {
		let combinator;
		beforeEach(() => {
			combinator = new Combinator({ type: Alloy.IGNISIUM });
		});
		it('should throw error if level is changed', () => {
			expect(() => combinator.level = 2).to.throw();
		});
		it('should throw error if id is changed', () => {
			expect(() => combinator.id = 'newId').to.throw();
		});
		it('should throw error if type is changed', () => {
			expect(() => combinator.type = Alloy.STARFORGE).to.throw();
		});
		it('should throw error if capacity is changed', () => {
			expect(() => combinator.capacity = 2).to.throw();
		});
	});

	describe('Events', () => {});

});