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

	describe('Static Properties', () => {
		it('should have defined the combinator types', () => {
			expect(Combinator.IGNISIUM).to.exist;
			expect(Combinator.PHOTONIUM).to.exist;
			expect(Combinator.VOIDTISSIUM).to.exist;
			expect(Combinator.SOLTARIUM).to.exist;
			expect(Combinator.MAGNANIUM).to.exist;
			expect(Combinator.ETHERIUM).to.exist;
			expect(Combinator.STARFORGE).to.exist;
		});

		it('should have TYPES array containing all combinator types', () => {
			expect(Combinator.TYPES).to.be.an('array');
			expect(Combinator.TYPES).to.have.lengthOf(7);
			expect(Combinator.TYPES).to.include(Combinator.IGNISIUM);
			expect(Combinator.TYPES).to.include(Combinator.PHOTONIUM);
			expect(Combinator.TYPES).to.include(Combinator.VOIDTISSIUM);
			expect(Combinator.TYPES).to.include(Combinator.SOLTARIUM);
			expect(Combinator.TYPES).to.include(Combinator.MAGNANIUM);
			expect(Combinator.TYPES).to.include(Combinator.ETHERIUM);
			expect(Combinator.TYPES).to.include(Combinator.STARFORGE);
		});

		it('should have SYMBOLS map containing all combinator type mappings', () => {
			expect(Combinator.SYMBOLS).to.be.an.instanceOf(Map);
			expect(Combinator.SYMBOLS.size).to.equal(7);
			expect(Combinator.SYMBOLS.get('combinator-ignisium')).to.equal(Combinator.IGNISIUM);
			expect(Combinator.SYMBOLS.get('combinator-photonium')).to.equal(Combinator.PHOTONIUM);
			expect(Combinator.SYMBOLS.get('combinator-voidtissium')).to.equal(Combinator.VOIDTISSIUM);
			expect(Combinator.SYMBOLS.get('combinator-soltarium')).to.equal(Combinator.SOLTARIUM);
			expect(Combinator.SYMBOLS.get('combinator-magnanium')).to.equal(Combinator.MAGNANIUM);
			expect(Combinator.SYMBOLS.get('combinator-etherium')).to.equal(Combinator.ETHERIUM);
			expect(Combinator.SYMBOLS.get('combinator-starforge')).to.equal(Combinator.STARFORGE);
		});
	});

	describe('Static Methods', () => {
		it('should return true using Has() for valid combinator types', () => {
			expect(Combinator.Has(Combinator.IGNISIUM)).to.be.true;
			expect(Combinator.Has(Combinator.PHOTONIUM)).to.be.true;
			expect(Combinator.Has(Combinator.VOIDTISSIUM)).to.be.true;
			expect(Combinator.Has(Combinator.SOLTARIUM)).to.be.true;
			expect(Combinator.Has(Combinator.MAGNANIUM)).to.be.true;
			expect(Combinator.Has(Combinator.ETHERIUM)).to.be.true;
			expect(Combinator.Has(Combinator.STARFORGE)).to.be.true;
		});

		it('should return false using Has() for invalid combinator types', () => {
			expect(Combinator.Has(Symbol('invalid'))).to.be.false;
			expect(Combinator.Has('invalid')).to.be.false;
		});
	});

	describe('constructor', () => {
		it('should throw error if type is not specified', () => {
			expect(() => new Combinator()).to.throw();
		})
		it('should create a combinator with default level of 1', () => {
			const combinator = new Combinator({ type: Alloy.IGNISIUM });
			expect(combinator.capacity).to.equal(100);
			expect(combinator.inventorySize).to.equal(0);
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

			it('should throw error if minerals array contains invalid mineral', () => {
				expect(() => combinator.combine([Symbol('invalid')])).to.throw('Invalid minerals provided');
				expect(() => combinator.combine([Mineral.AETHERITE, 'invalid'])).to.throw('Invalid minerals provided');
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

	});

	describe('Properties', () => {
		let combinator;
		beforeEach(() => {
			combinator = new Combinator({ type: Alloy.IGNISIUM });
		});

		it('should have type property set correctly', () => {
			expect(combinator.type).to.equal(Alloy.IGNISIUM);
		});

		it('should throw error if capacity is changed', () => {
			expect(() => combinator.capacity = 2).to.throw();
		});

		it('should have inventorySize property that returns the total count', () => {
			expect(combinator.inventorySize).to.equal(0);
			combinator.combine([Mineral.AETHERITE]);
			expect(combinator.inventorySize).to.equal(1);
			combinator.combine([Mineral.PYROTITE]);
			expect(combinator.inventorySize).to.equal(2);
			combinator.combine([Mineral.AETHERITE, Mineral.AETHERITE]);
			expect(combinator.inventorySize).to.equal(4);
		});

		it('should throw error if inventorySize is changed', () => {
			expect(() => combinator.inventorySize = 10).to.throw();
		});

		it('should have image property', () => {
			expect(combinator.image).to.be.undefined;
		});

		it('should throw error if image is changed directly', () => {
			expect(() => combinator.image = 'test').to.throw();
		});
	});

	describe('Methods - setImage', () => {
		it('should set a new image using setImage()', () => {
			const combinator = new Combinator({ type: Alloy.IGNISIUM });
			const newImage = 'combinator-image';
			combinator.setImage(newImage);
			expect(combinator.image).to.equal(newImage);
		});
	});

	describe('Events', () => {});

});