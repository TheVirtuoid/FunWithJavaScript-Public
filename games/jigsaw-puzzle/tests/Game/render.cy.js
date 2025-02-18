import Game from "../../src/classes/Game/Game.js";
import GameStatus from "../../src/classes/Game/GameStatus.js";
import RenderStatus from '../../src/classes/Ui/RenderStatus.js';

describe('When I render the different screens', () => {
	let game;

	beforeEach(() => {
		game = new Game();
	});

	it('should correctly render the BEGIN screen', () => {
		const status = game.render(GameStatus.BEGIN);
		expect(status.code).to.equal(RenderStatus.BEGIN);
		expect(game.statistics.time).to.equal(0);
		expect(game.statistics.moves).to.equal(0);
	});
	xit('should correctly render the EXIT screen', () => {});
	xit('should correctly render the NEW screen', () => {});
	xit('should correctly render the READY screen', () => {});
	xit('should correctly render the START screen', () => {});
	xit('should correctly render the PLAY screen', () => {});
	xit('should correctly render the PAUSED screen', () => {});
	xit('should correctly render the FINISHED screen', () => {});
});
