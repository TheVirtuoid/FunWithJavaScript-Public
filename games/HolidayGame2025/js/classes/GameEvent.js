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
	static ELF_MISSILE_HIT_ASTEROID = Symbol('elf-missile-hit-asteroid');
	static GAME_STARTED = Symbol('game-started');
	static GAME_OVER = Symbol('game-over');
	static LEVEL_STARTED = Symbol('level-started');
	static LEVEL_COMPLETE = Symbol('level-complete');
	static LEVEL_NEXT = Symbol('level-next');

	static LAUNCH_ELF_SHIP = Symbol('launch-elf-ship');
	static LAUNCH_SANTA_SHIP = Symbol('launch-santa-ship');
	static REMOVE_ELF_SHIP = Symbol('remove-elf-ship');
	static REMOVE_SANTA_SHIP = Symbol('remove-santa-ship');
}