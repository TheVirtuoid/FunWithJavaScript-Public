import GameEvent from "./GameEvent.js";

const mockGame = {
	emit: () => {}
};

describe('When I work with the GameEvent class', () => {

	it('should throw error if trying to instantiate', () => {
		expect(() => new GameEvent()).to.throw('GameEvent is static and cannot be instantiated');
	});

	it('should throw an error if there has been no setup', () => {
		expect(() => GameEvent.Emit('some-event')).to.throw('GameEvent object has not been set up');
	});

	it('should throw an error if the event requested has not been defined', () => {
		GameEvent.Setup(mockGame);
		expect(() => GameEvent.Emit('some-event')).to.throw(`Event 'some-event' is not defined in GameEvent`);

	});

	describe('And when the event is valid', () => {
		beforeEach(() => {
			cy.spy(mockGame, 'emit').as('gameEmit');
			GameEvent.Setup(mockGame);
		});

		it('should have a Game property', () => {
			expect(GameEvent.Game).not.to.be.undefined;
		});

		it('should have signaled that the game event has been initialized', () => {
			cy.get('@gameEmit').should('have.been.calledWith', GameEvent.GAME_EVENT_INITIALIZED);
		});

		it('should emit the defined event with no arguments', () => {
			GameEvent.Emit(GameEvent.GAME_OVER);
			cy.get('@gameEmit').should('have.been.calledWith', GameEvent.GAME_OVER);
		});

		it('should emit the defined event with arguments', () => {
			GameEvent.Emit(GameEvent.GAME_OVER, 'a', 1, true);
			cy.get('@gameEmit').should('have.been.calledWith', GameEvent.GAME_OVER, 'a', 1, true);
		});
	});

});