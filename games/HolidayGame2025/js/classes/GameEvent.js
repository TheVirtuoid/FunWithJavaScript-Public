let game;

export default class GameEvent {
	static Setup(incomingGame) {
		game = incomingGame;
	}

	static Emit(eventName, ...args) {
		game.onEvent(eventName, ...args);
	}

	static KRAMPUS_HIT_ASTEROID = Symbol('krampus-hit-asteroid');
	static KRAMPUS_HIT_ELF = Symbol('krampus-hit-elf');
	static KRAMPUS_HIT_SANTA = Symbol('krampus-hit-santa');
	static KRAMPUS_MISSILE_HIT_ELF = Symbol('krampus-missile-hit-elf');
	static KRAMPUS_MISSILE_HIT_SANTA = Symbol('krampus-missile-hit-santa');
	static KRAMPUS_MISSILE_HIT_ASTEROID = Symbol('krampus-missile-hit-asteroid');

	static ELF_MISSILE_HIT_KRAMPUS = Symbol('elf-missile-hit-krampus');
	static ELF_MISSILE_HIT_ASTEROID = Symbol('elf-missile-hit-asteroid');

	static SANTA_MISSILE_HIT_KRAMPUS = Symbol('santa-missile-hit-krampus');
	static SANTA_MISSILE_HIT_ASTEROID = Symbol('santa-missile-hit-asteroid');

	static ASTEROID_HIT_ASTEROID = Symbol('asteroid-hit-asteroid');

	static GAME_STARTED = Symbol('game-started');
	static GAME_OVER = Symbol('game-over');
	static GAME_RESET = Symbol('game-reset');
	static LEVEL_STARTED = Symbol('level-started');
	static LEVEL_COMPLETE = Symbol('level-complete');
	static LEVEL_NEXT = Symbol('level-next');

	static LAUNCH_ELF_SHIP = Symbol('launch-elf-ship');
	static LAUNCH_SANTA_SHIP = Symbol('launch-santa-ship');
	static REMOVE_ELF_SHIP = Symbol('remove-elf-ship');
	static REMOVE_SANTA_SHIP = Symbol('remove-santa-ship');

	static COUNTDOWN_STARTED = Symbol('countdown-started');
	static COUNTDOWN_COMPLETE = Symbol('countdown-complete');
}