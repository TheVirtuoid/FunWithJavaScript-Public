let game;

export default class GameEvent {
	static Setup(incomingGame) {
		game = incomingGame;
	}

	static Emit(eventName, ...args) {
		game.onEvent(eventName, ...args);
	}

	static KRAMPUS_MISSILE_HIT_ASTEROID = Symbol('krampus-missile-hit-asteroid');
}