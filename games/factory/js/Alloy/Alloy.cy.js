/*

1. Ignisium: Aetherite (3) + Pyrotite (1)
2. Photonium: Aetherite (5) + Limunum (1)
3. Voidtissium: Aetherite (7) + Obsidianite (1)
4. Solarium: Pyrotite (2) + Luminium (1)
5. Magnanium: Pyrotite (4) + Obsidiantite (1)
6. Etherium: Luminium (9) + Zenithium (1)
7. Starforge: Pyrotite (12) + Luminium (7) + Zenithim (1)

 */

import Alloy from "./Alloy.js";
import Mineral from "../Mineral/Mineral.js";

describe('Alloy Class', () => {
	describe('Static Properties', () => {
		it('should have defined the alloys', () => {
			expect(Alloy.IGNISIUM).to.exist;
			expect(Alloy.PHOTONIUM).to.exist;
			expect(Alloy.VOIDTISSIUM).to.exist;
			expect(Alloy.SOLTARIUM).to.exist;
			expect(Alloy.MAGNANIUM).to.exist;
			expect(Alloy.ETHERIUM).to.exist;
			expect(Alloy.STARFORGE).to.exist;
		});

		it('should have TYPES array containing all alloy types', () => {
			expect(Alloy.TYPES).to.be.an('array');
			expect(Alloy.TYPES).to.have.lengthOf(7);
			expect(Alloy.TYPES).to.include(Alloy.IGNISIUM);
			expect(Alloy.TYPES).to.include(Alloy.PHOTONIUM);
			expect(Alloy.TYPES).to.include(Alloy.VOIDTISSIUM);
			expect(Alloy.TYPES).to.include(Alloy.SOLTARIUM);
			expect(Alloy.TYPES).to.include(Alloy.MAGNANIUM);
			expect(Alloy.TYPES).to.include(Alloy.ETHERIUM);
			expect(Alloy.TYPES).to.include(Alloy.STARFORGE);
		});
	});

	describe('Static Methods', () => {
		it('should return element using has()', () => {
			expect(Alloy.Has(Alloy.IGNISIUM)).to.be.true;
			expect(Alloy.Has(Alloy.PHOTONIUM)).to.be.true;
			expect(Alloy.Has(Alloy.VOIDTISSIUM)).to.be.true;
			expect(Alloy.Has(Alloy.SOLTARIUM)).to.be.true;
			expect(Alloy.Has(Alloy.MAGNANIUM)).to.be.true;
			expect(Alloy.Has(Alloy.ETHERIUM)).to.be.true;
			expect(Alloy.Has(Alloy.STARFORGE)).to.be.true;
		});

		it('should return false for has() if element is not listed', () => {
			expect(Alloy.Has(Symbol('invalid'))).to.be.false;
		});

		describe('Ingredients()', () => {

			it ('should throw an error if the alloy is invalid', () => {
				expect(() => Alloy.Ingredients('bad')).to.throw();
			});

			it('should return the ingredients for the alloy IGNISIUM', () => {
				const ingredients = Alloy.Ingredients(Alloy.IGNISIUM);
				expect(ingredients.size).to.equal(2);
				expect(ingredients.get(Mineral.AETHERITE)).to.equal(3);
				expect(ingredients.get(Mineral.PYROTITE)).to.equal(1);
			});

			it('should return the ingredients for the alloy PHOTONIUM', () => {
				const ingredients = Alloy.Ingredients(Alloy.PHOTONIUM);
				expect(ingredients.size).to.equal(2);
				expect(ingredients.get(Mineral.AETHERITE)).to.equal(5);
				expect(ingredients.get(Mineral.LUMINITE)).to.equal(1);
			});

			it('should return the ingredients for the alloy VOIDTISSIUM', () => {
				const ingredients = Alloy.Ingredients(Alloy.VOIDTISSIUM);
				expect(ingredients.size).to.equal(2);
				expect(ingredients.get(Mineral.AETHERITE)).to.equal(7);
				expect(ingredients.get(Mineral.OBSIDIANITE)).to.equal(1);
			});

			it('should return the ingredients for the alloy SOLTARIUM', () => {
				const ingredients = Alloy.Ingredients(Alloy.SOLTARIUM);
				expect(ingredients.size).to.equal(2);
				expect(ingredients.get(Mineral.PYROTITE)).to.equal(2);
				expect(ingredients.get(Mineral.LUMINITE)).to.equal(1);
			});

			it('should return the ingredients for the alloy MAGNANIUM', () => {
				const ingredients = Alloy.Ingredients(Alloy.MAGNANIUM);
				expect(ingredients.size).to.equal(2);
				expect(ingredients.get(Mineral.PYROTITE)).to.equal(4);
				expect(ingredients.get(Mineral.OBSIDIANITE)).to.equal(1);
			});

			it('should return the ingredients for the alloy ETHERIUM', () => {
				const ingredients = Alloy.Ingredients(Alloy.ETHERIUM);
				expect(ingredients.size).to.equal(2);
				expect(ingredients.get(Mineral.LUMINITE)).to.equal(9);
				expect(ingredients.get(Mineral.ZENITHITE)).to.equal(1);
			});

			it('should return the ingredients for the alloy STARFORGE', () => {
				const ingredients = Alloy.Ingredients(Alloy.STARFORGE);
				expect(ingredients.size).to.equal(3);
				expect(ingredients.get(Mineral.PYROTITE)).to.equal(12);
				expect(ingredients.get(Mineral.LUMINITE)).to.equal(7);
				expect(ingredients.get(Mineral.ZENITHITE)).to.equal(1);
			});

		});

	});

	describe('constructor', () => {
		const type = Alloy.ETHERIUM;
		const purity = 10;
		it('should throw an error if the allow type is invalid', () => {
			expect(() => new Alloy({ type: 'bad', purity })).to.throw();
		});

		it('should throw an error if the purity is invalid', () => {
			expect(() => new Alloy({ type, purity: 'bad' })).to.throw();
		});

		it('should throw an error if the purity is out of range', () => {
			expect(() => new Alloy({ type, purity: -1 })).to.throw();
			expect(() => new Alloy({ type, purity: 101 })).to.throw();
		});
		it('should construct an alloy', () => {
			const alloy = new Alloy({ type, purity });
			expect(alloy.type).to.equal(type);
			expect(alloy.purity).to.equal(purity);
		});
	});

	describe('Methods', () => {
		it('should set a new image using setImage()', () => {
			const alloy = new Alloy({ type: Alloy.IGNISIUM, purity: 50 });
			const newImage = 'custom-image';
			alloy.setImage(newImage);
			expect(alloy.image).to.equal(newImage);
		});
	});

	describe('Properties', () => {
		let alloy;
		beforeEach(() => {
			alloy = new Alloy({ type: Alloy.IGNISIUM, purity: 50 });
		});

		it('should have type property set correctly', () => {
			expect(alloy.type).to.equal(Alloy.IGNISIUM);
		});

		it('should have purity property as read-only', () => {
			const originalPurity = alloy.purity;
			expect(originalPurity).to.equal(50);
			expect(() => { alloy.purity = 75; }).to.throw();
			expect(alloy.purity).to.equal(originalPurity);
		});

		it('should have image property with correct default value', () => {
			expect(alloy.image).to.equal('ingot-Ignisium');
		});

		it('should return the image value using the image getter', () => {
			const etheriumAlloy = new Alloy({ type: Alloy.ETHERIUM, purity: 75 });
			expect(etheriumAlloy.image).to.equal('ingot-Etherium');
		});
	});

	describe('Events', () => {});

});