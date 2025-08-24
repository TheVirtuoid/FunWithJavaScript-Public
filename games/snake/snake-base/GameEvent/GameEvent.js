let game;

export default class GameEvent {
	static GAME_OVER = 'game-over';
	static GAME_EVENT_INITIALIZED = 'game-event-initialized';

	static SNAKE_COLLISION_WALL = 'snake-collision-wall';
	static SNAKE_COLLISION_SELF = 'snake-collision-self';
	static SNAKE_COLLISION_PRIZE = 'snake-collision-prize';
	static SNAKE_MOVE = 'snake-move';
	static SNAKE_DIRECTION_INVALID = 'snake-direction-invalid';
	static SNAKE_DIRECTION_CHANGED = 'snake-direction-changed';
	static SNAKE_JUMP_INVALID = 'snake-jump-invalid';
	static SNAKE_JUMPED = 'snake-jumped';
	static SNAKE_RESET = 'snake-reset';

	static DETECT_WALL_COLLISION = 'detect-wall-collision';
	static DETECT_PRIZE_COLLISION = 'detect-prize-collision';
	static DETECT_SELF_COLLISION = 'detect-self-collision';

	static INPUT_MOVE = 'input-move';

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
		GameEvent.INPUT_MOVE
	]

	static Setup(gameObject) {
		game = gameObject;
		GameEvent.Emit(GameEvent.GAME_EVENT_INITIALIZED);
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