import CardUpgradeType from "../src/enums/CardUpgradeType.js";
import CardType from "../src/enums/CardType.js";
import Card from "../src/classes/Card.js";

describe('When I work with the Card class', () => {
	const type = CardType.GUN;
	const upgradeAmount = 10;
	const upgradeType = CardUpgradeType.DAMAGE;
	const upgradeCalculation = (amount) => amount * 2; // Example calculation function
	const description = "Increases gun damage by 10";

	it('should create the class', () => {
		const card = new Card({
			type,
			upgradeAmount,
			upgradeType,
			upgradeCalculation,
			description
		});
		expect(card).to.be.an.instanceof(Card);
		expect(card.type).to.equal(type);
		expect(card.upgradeAmount).to.equal(upgradeAmount);
		expect(card.upgradeType).to.equal(upgradeType);
		expect(card.upgradeCalculation).to.equal(upgradeCalculation);
		expect(card.description).to.equal(description);
	});

	it('should throw if type is not specified', () => {
		expect(() => new Card({
			upgradeAmount,
			upgradeType,
			upgradeCalculation,
			description
		})).to.throw();
	});

	it('should throw if upgradeAmount is not specified', () => {
		expect(() => new Card({
			type,
			upgradeType,
			upgradeCalculation,
			description
		})).to.throw();
	});

	it('should throw if upgradeType is not specified', () => {
		expect(() => new Card({
			type,
			upgradeAmount,
			upgradeCalculation,
			description
		})).to.throw();
	});

	it('should throw if upgradeCalculation is not specified', () => {
		expect(() => new Card({
			type,
			upgradeAmount,
			upgradeType,
			description
		})).to.throw();
	});

	it('should throw if description is not specified', () => {
		expect(() => new Card({
			type,
			upgradeAmount,
			upgradeType,
			upgradeCalculation
		})).to.throw();
	});

	describe('And when I work with the properties', () => {
		let card;
		beforeEach(() => {
			card = new Card({
				type,
				upgradeAmount,
				upgradeType,
				upgradeCalculation,
				description
			});
		})

		it('should have a read-only type property', () => {
			expect(card.type).to.equal(type);
			expect(() => card.type = CardType.TOWER).to.throw();
		});

		it('should have a read-only upgradeAmount property', () => {
			expect(card.upgradeAmount).to.equal(upgradeAmount);
			expect(() => card.upgradeAmount = 20).to.throw();
		});

		it('should have a read-only upgradeType property', () => {
			expect(card.upgradeType).to.equal(upgradeType);
			expect(() => card.upgradeType = CardUpgradeType.SPEED).to.throw();
		});

		it('should have a read-only upgradeCalculation property', () => {
			expect(card.upgradeCalculation).to.equal(upgradeCalculation);
			expect(() => card.upgradeCalculation = (amount) => amount + 5).to.throw();
		});

		it('should have a read-only description property', () => {
			expect(card.description).to.equal(description);
			expect(() => card.description = "New description").to.throw();
		});
	});
});
