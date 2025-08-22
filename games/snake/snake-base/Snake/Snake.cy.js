import {MockGame, MockVector} from "../../tdd-utilities/tddUtilities.js";
import Snake from "./Snake.js";

describe('And when I work with the Snake class', () => {
	let game = MockGame;

	it('should throw an error if no game instance is provided', () => {
		expect(() => new Snake()).to.throw(`'game' property must be an instance of Game`);
	});

	it('should create an instance of Snake with default properties', () => {
		const snake = new Snake({ game });
		expect(snake.id).to.be.a('string');
	});

	describe('And when I work with the Public properties', () => {
		let snake;
		beforeEach(() => {
			snake = new Snake({ game, id: 'snake-test' });
		});

		describe('and when I work with "id"', () => {
			it('should set the id', () => {
				expect(snake.id).to.equal('snake-test');
			});

			it('should throw exception if trying to change id', () => {
				expect(() => snake.id = 'new-id').to.throw();
			});
		});
	});

});