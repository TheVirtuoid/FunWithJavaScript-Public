import Game from "./../../src/classes/Game/Game.js";
import Ui from "../../src/classes/Ui/Ui.js";

describe('When I create a new Game', () => {
	it('should have an empty table', () => {
		const game = new Game();
		expect(game.table).to.be.null;
	});
	it('should have a POPULATED UI', () => {
		const game = new Game();
		expect(game.ui instanceof Ui).to.be.true;
	});
});