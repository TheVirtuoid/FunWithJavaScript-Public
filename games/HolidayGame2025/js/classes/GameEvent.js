let game;

export default class GameEvent {
	static Setup(incomingGame) {
		game = incomingGame;
	}

	static Emit(eventName, ...args) {
		game.onEvent(eventName, ...args);
	}

	static KRAMPUS_MISSILE_HIT_ASTEROID = Symbol('krampus-missile-hit-asteroid');
	static ELF_SHIP_HIT_ASTEROID = Symbol('elf-ship-hit-asteroid');
	static ELF_SHIP_HIT_KRAMPUS = Symbol('elf-ship-hit-krampus');
	static ELF_SHIP_HIT_KRAMPUS_MISSILE = Symbol('elf-ship-hit-krampus-missile');
	static ELF_MISSILE_HIT_KRAMPUS = Symbol('elf-missile-hit-krampus');
}