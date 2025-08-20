let game;

export default class GameEvent {
	static GAME_OVER = 'game-over';

	static SNAKE_COLLISION_WALL = 'snake-collision-wall';
	static SNAKE_COLLISION_SELF = 'snake-collision-self';
	static SNAKE_COLLISION_PRIZE = 'snake-collision-prize';
	static SNAKE_MOVE = 'snake-move';
	static SNAKE_DIRECTION_INVALID = 'snake-direction-invalid';
	static SNAKE_DIRECTION_CHANGED = 'snake-direction-changed';
	static SNAKE_JUMP_INVALID = 'snake-jump-invalid';
	static SNAKE_JUMPED = 'snake-jumped';
	static SNAKE_RESET = 'snake-reset';

	static TYPES = [
		GameEvent.GAME_OVER,
		GameEvent.SNAKE_COLLISION_WALL,
		GameEvent.SNAKE_COLLISION_SELF,
		GameEvent.SNAKE_COLLISION_PRIZE,
		GameEvent.SNAKE_MOVE,
		GameEvent.SNAKE_DIRECTION_INVALID,
		GameEvent.SNAKE_DIRECTION_CHANGED,
		GameEvent.SNAKE_JUMP_INVALID,
		GameEvent.SNAKE_JUMPED,
		GameEvent.SNAKE_RESET
	]

	static Setup(gameObject) {
		game = gameObject;
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

}