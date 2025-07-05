import Position from "../src/classes/Position.js";
import PrizeType from "../src/enums/PrizeType.js";
import Prize from "../src/classes/Prize.js";
import PrizeUi from "../src/classes/Ui/Prize.js";

describe('When I work with the Prize class', () => {
	let prize;
	const value = 100;
	const type = PrizeType.GUN;
	const position = new Position(10, 20);
	const mockScene = {};
	const options = { value, type, position, scene: mockScene };


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
	});
});
