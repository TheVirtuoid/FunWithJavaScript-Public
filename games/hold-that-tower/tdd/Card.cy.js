import CardUpgradeType from "../src/enums/CardUpgradeType.js";
import CardType from "../src/enums/CardType.js";
import Card from "../src/classes/Card.js";
import MockScene from "./MockScene.js";
import Position from "../src/classes/Position.js";

describe('When I work with the Card class', () => {
	const type = CardType.GUN;
	const upgradeAmount = 10;
	const upgradeType = CardUpgradeType.DAMAGE;
	const description = "Increases gun damage by 10";
	const scene = new MockScene();
	const position = new Position(10, 10);

	it('should create the class', () => {
		const card = new Card({
			type,
			upgradeAmount,
			description,
			scene,
			position
		});
		expect(card).to.be.an.instanceof(Card);
		expect(card.type).to.equal(type);
		expect(card.upgradeAmount).to.equal(upgradeAmount);
		expect(card.description).to.equal(description);
	});

	it('should throw if type is not specified', () => {
		expect(() => new Card({
			upgradeAmount,
			description,
			scene,
			position
		})).to.throw();
	});

	it('should throw if upgradeAmount is not specified', () => {
		expect(() => new Card({
			type,
			description,
			scene,
			position
		})).to.throw();
	});

	it('should throw if description is not specified', () => {
		expect(() => new Card({
			type,
			upgradeAmount,
			scene,
			position
		})).to.throw();
	});

	describe('And when I work with the properties', () => {
		let card;
		beforeEach(() => {
			card = new Card({
				type,
				upgradeAmount,
				description,
				scene,
				position
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

		it('should have a read-only description property', () => {
			expect(card.description).to.equal(description);
			expect(() => card.description = "New description").to.throw();
		});
	});
});
