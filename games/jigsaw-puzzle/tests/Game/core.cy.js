import Game from "./../../src/classes/Game/Game.js";

describe('When I create a new Game', () => {
	it('should have an empty table', () => {
		const game = new Game();
		expect(game.table).to.be.null;
	});
	it('should have an empty UI', () => {
		const game = new Game();
		expect(game.ui).to.be.null;
	});
});