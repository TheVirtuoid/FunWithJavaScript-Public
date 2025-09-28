import Input from "./Input.js";

describe('And when I work with the Input class', () => {
	describe('And when I work with the constructor', () => {
		it('should create the class', () => {
			const input = new Input();
			expect(input).to.be.an.instanceof(Input);
		});
	});

	describe('And when I work with the methods', () => {
		let input;

		beforeEach(() => {
			input = new Input();
		});

		describe('And when all the methods are called', () => {
			it('should throw an error because onChangeDirection is not implemented', () => {
				expect(() => input.onChangeDirection()).to.throw('You must implement the method onChangeDirection.');
			});

			it('should throw an error because it is not implemented', () => {
				expect(() => input.onChangeSpeed()).to.throw('You must implement the method onChangeSpeed.');
			});

			it('should throw an error because onGamePaused is not implemented', () => {
				expect(() => input.onGamePaused()).to.throw('You must implement the method onGamePaused.');
			});

			it('should throw an error because onGameResumed is not implemented', () => {
				expect(() => input.onGameResumed()).to.throw('You must implement the method onGameResumed.');
			});

			it('should throw an error because onGameEnded is not implemented', () => {
				expect(() => input.onGameEnded()).to.throw('You must implement the method onGameEnded.');
			});

			it('should throw an error because onInput is not implemented', () => {
				expect(() => input.onInput()).to.throw('You must implement the method onInput.');
			});

		});

	});
});
