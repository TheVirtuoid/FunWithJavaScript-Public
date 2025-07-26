import Position from "../src/classes/Position.js";
import PrizeType from "../src/enums/PrizeType.js";
import Prize from "../src/classes/Prize.js";
import PrizeUi from "../src/classes/Ui/Prize.js";
import MockScene from "./MockScene.js";

describe('When I work with the Prize class', () => {
	let prize;
	const value = 100;
	const type = PrizeType.GUN;
	const position = new Position(10, 20);
	const mockScene = new MockScene();
	const options = { value, type, position, scene: mockScene };

	describe('And when I do the constructor', () => {
		it('should create a new Prize instance', () => {
			prize = new Prize(options);
			expect(prize).to.be.an.instanceof(Prize);
			expect(prize.type).to.equal(type);
			expect(prize.value).to.equal(value);
			expect(prize.position).to.be.an.instanceof(Position);
			expect(prize.ui).to.be.instanceof(PrizeUi);
		});

		it('should throw error if type is not specified', () => {
			expect(() => new Prize({ value, position })).to.throw();
		});

		it('should throw error if value is not specified', () => {
			expect(() => new Prize({ type, position })).to.throw();
		});

		it('should throw error as type is read-only', () => {
			prize = new Prize(options);
			expect(() => prize.type = PrizeType.TOWER).to.throw();
		});

		it('should throw error as value is read-only', () => {
			prize = new Prize(options);
			expect(() => prize.value = 200).to.throw();
		});

		it('should throw error for invalid prize type', () => {
			expect(() => new Prize({
				value: 100,
				type: 'invalid_type',
				scene: mockScene
			})).to.throw();
		});

		it('should throw error when value is null', () => {
			expect(() => new Prize({
				value: null,
				type: PrizeType.GUN,
				scene: mockScene
			})).to.throw();
		});

		it('should throw error when value is undefined', () => {
			expect(() => new Prize({
				value: undefined,
				type: PrizeType.GUN,
				scene: mockScene
			})).to.throw();
		});

		it('should throw error when value is zero', () => {
			expect(() => new Prize({
				value: 0,
				type: PrizeType.GUN,
				scene: mockScene
			})).to.throw();
		});

		it('should handle constructor without scene parameter', () => {
			expect(() => new Prize({
				value: 100,
				type: PrizeType.GUN
			})).to.throw();
		});
	});



	describe('And when I work with the Position property', () => {
		it('should throw error if position is changed', () => {
			prize = new Prize(options);
			expect(() => prize.position = new Position(30, 40)).to.throw();
		});

		it('should change using setPosition method', () => {
			prize = new Prize(options);
			const newPosition = new Position(30, 40);
			prize.setPosition(newPosition);
			expect(prize.position.x).to.equal(newPosition.x);
			expect(prize.position.y).to.equal(newPosition.y);
		});

		it('should initialize with null position when not provided', () => {
			const prize = new Prize({
				value: 100,
				type: PrizeType.GUN,
				scene: mockScene
			});
			expect(prize.position).to.be.null;
		});

		it('should throw error when setPosition receives invalid input', () => {
			const prize = new Prize(options);

			expect(() => prize.setPosition(null)).to.throw('Position must be an instance of Position class');
			expect(() => prize.setPosition(undefined)).to.throw('Position must be an instance of Position class');
			expect(() => prize.setPosition({ x: 10, y: 20 })).to.throw('Position must be an instance of Position class');
			expect(() => prize.setPosition("position")).to.throw('Position must be an instance of Position class');
		});

		it('should clone position when setting new position', () => {
			const prize = new Prize({
				value: 100,
				type: PrizeType.GUN,
				scene: mockScene
			});
			const originalPosition = new Position(50, 60);
			cy.spy(originalPosition, 'clone');

			prize.setPosition(originalPosition);

			expect(originalPosition.clone).to.have.been.called;
			expect(prize.position).to.not.equal(originalPosition); // Should be a clone, not the same reference
		});
	});
});
