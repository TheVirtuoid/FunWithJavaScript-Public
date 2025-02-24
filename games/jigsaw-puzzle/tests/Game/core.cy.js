import Game from "./../../src/classes/Game/Game.js";
import Ui from "../../src/classes/Ui/Ui.js";
import GameStatus from "../../src/classes/Game/GameStatus.js";

describe('When I create a new Game', () => {
	it('should have an empty table', () => {
		const game = new Game();
		expect(game.table).to.be.null;
	});
	it('should have a POPULATED UI', () => {
		const game = new Game();
		expect(game.ui instanceof Ui).to.be.true;
	});

	it('should start with a GameStatus.BEGIN', () => {
		const game = new Game();
		cy.stub(game.ui, 'initialize').returns(null);
		cy.stub(game, 'render').returns(null);
		game.initialize();
		expect(game.status).to.equal(GameStatus.BEGIN);
	});
});