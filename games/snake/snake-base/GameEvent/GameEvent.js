let game;

export default class GameEvent {
	static GAME_OVER = Symbol('game-over');
	static GAME_EVENT_INITIALIZED = Symbol('game-event-initialized');

	static SNAKE_COLLISION_WALL = Symbol('snake-collision-wall');
	static SNAKE_COLLISION_SELF = Symbol('snake-collision-self');
	static SNAKE_COLLISION_PRIZE = Symbol('snake-collision-prize');
	static SNAKE_MOVE = Symbol('snake-move');
	static SNAKE_DIRECTION_CHANGED = Symbol('snake-direction-changed');
	static SNAKE_JUMPED = Symbol('snake-jumped');

	static INPUT_CHANGE_DIRECTION = Symbol('input-change-direction');
	static INPUT_CHANGE_SPEED = Symbol('input-change-speed');

	static GAME_EXIT = Symbol('game-exit');
	static GAME_PAUSE = Symbol('game-pause');
	static GAME_RESUME = Symbol('game-resume');
	static GAME_RESET = Symbol('game-reset');
	static GAME_START = Symbol('game-start');

	static TYPES = [
		GameEvent.GAME_OVER,
		GameEvent.GAME_EVENT_INITIALIZED,
		GameEvent.SNAKE_COLLISION_WALL,
		GameEvent.SNAKE_COLLISION_SELF,
		GameEvent.SNAKE_COLLISION_PRIZE,
		GameEvent.SNAKE_MOVE,
		GameEvent.SNAKE_DIRECTION_CHANGED,
		GameEvent.SNAKE_JUMPED,
		GameEvent.INPUT_CHANGE_DIRECTION,
		GameEvent.INPUT_CHANGE_SPEED,
		GameEvent.GAME_EXIT,
		GameEvent.GAME_PAUSE,
		GameEvent.GAME_RESUME,
		GameEvent.GAME_RESET,
		GameEvent.GAME_START
	]

	static Setup(gameObject) {
		game = gameObject;
		GameEvent.Emit(GameEvent.GAME_EVENT_INITIALIZED);
	}

	static TakeDown() {
		game = null;
	}

	static Game() {
		return {
			vectorFactory: game.vectorFactory
		};
	}

	static Emit(eventName, ...args) {
		if (!game) {
			throw new Error('GameEvent object has not been set up');
		}
		if (!GameEvent.TYPES.includes(eventName)) {
			throw new Error(`Event '${eventName}' is not defined in GameEvent`);
		}
		game.emit(eventName, ...args);
	}

	constructor() {
		throw(new Error('GameEvent is static and cannot be instantiated'));
	}

}