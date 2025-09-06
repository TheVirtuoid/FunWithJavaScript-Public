let game;

export default class GameEvent {
	static GAME_OVER = Symbol('game-over');
	static GAME_EVENT_INITIALIZED = Symbol('game-event-initialized');

	static SNAKE_COLLISION_WALL = Symbol('snake-collision-wall');
	static SNAKE_COLLISION_SELF = Symbol('snake-collision-self');
	static SNAKE_COLLISION_PRIZE = Symbol('snake-collision-prize');
	static SNAKE_MOVE = Symbol('snake-move');
	static SNAKE_DIRECTION_INVALID = Symbol('snake-direction-invalid');
	static SNAKE_DIRECTION_CHANGED = Symbol('snake-direction-changed');
	static SNAKE_JUMP_INVALID = Symbol('snake-jump-invalid');
	static SNAKE_JUMPED = Symbol('snake-jumped');
	static SNAKE_RESET = Symbol('snake-reset');

	static DETECT_WALL_COLLISION = Symbol('detect-wall-collision');
	static DETECT_PRIZE_COLLISION = Symbol('detect-prize-collision');
	static DETECT_SELF_COLLISION = Symbol('detect-self-collision');

	static INPUT_MOVE = Symbol('input-move');

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
		GameEvent.SNAKE_DIRECTION_INVALID,
		GameEvent.SNAKE_DIRECTION_CHANGED,
		GameEvent.SNAKE_JUMP_INVALID,
		GameEvent.SNAKE_JUMPED,
		GameEvent.SNAKE_RESET,
		GameEvent.DETECT_WALL_COLLISION,
		GameEvent.DETECT_PRIZE_COLLISION,
		GameEvent.DETECT_SELF_COLLISION,
		GameEvent.INPUT_MOVE,
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