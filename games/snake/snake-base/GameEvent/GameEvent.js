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
	static INPUT_GAME_EXIT = Symbol('input-game-exit');
	static INPUT_GAME_PAUSE = Symbol('input-game-pause');
	static INPUT_GAME_RESUME = Symbol('input-game-resume');
	static INPUT_GAME_RESET = Symbol('input-game-reset');
	static INPUT_GAME_START = Symbol('input-game-start');

	static GAME_EXIT = Symbol('game-exit');
	static GAME_PAUSE = Symbol('game-pause');
	static GAME_RESUME = Symbol('game-resume');
	static GAME_RESET = Symbol('game-reset');
	static GAME_START = Symbol('game-start');

	static DEVICE_CHANGE_DIRECTION = Symbol('device-change-direction');
	static DEVICE_GAME_EXIT = Symbol('device-exit');
	static DEVICE_GAME_PAUSE = Symbol('device-pause');
	static DEVICE_GAME_RESUME = Symbol('device-resume');

	static UI_START_COUNTDOWN_COMPLETE = Symbol('ui-start-countdown-complete');
	static UI_COUNTDOWN_COMPLETE = Symbol('ui-countdown-complete');
	static UI_COUNTDOWN_TICK_COMPLETE = Symbol('ui-countdown-tick-complete');
	static UI_CLEAR_GAME_OVER_COMPLETE = Symbol('ui-clear-game-over-complete');
	static UI_DRAW_GAME_OVER_COMPLETE = Symbol('ui-draw-game-over-complete');
	static UI_CLEAR_SCORE_COMPLETE = Symbol('ui-clear-score-complete');
	static UI_UPDATE_SCORE_COMPLETE = Symbol('ui-update-score-complete');
	static UI_DRAW_SCORE_COMPLETE = Symbol('ui-draw-score-complete');
	static UI_CLEAR_PRIZE_COMPLETE = Symbol('ui-clear-prize-complete');
	static UI_DRAW_PRIZE_COMPLETE = Symbol('ui-draw-prize-complete');
	static UI_CLEAR_SNAKE_COMPLETE = Symbol('ui-clear-snake-complete');
	static UI_DRAW_SNAKE_COMPLETE = Symbol('ui-draw-snake-complete');
	static UI_UPDATE_SNAKE_COMPLETE = Symbol('ui-update-snake-complete');
	static UI_CLEAR_PITCH_COMPLETE = Symbol('ui-clear-pitch-complete');
	static UI_DRAW_PITCH_COMPLETE = Symbol('ui-draw-pitch-complete');
	static UI_RESET_PITCH_COMPLETE = Symbol('ui-reset-pitch-complete');

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
		GameEvent.INPUT_GAME_EXIT,
		GameEvent.INPUT_GAME_PAUSE,
		GameEvent.INPUT_GAME_RESUME,
		GameEvent.INPUT_GAME_RESET,
		GameEvent.INPUT_GAME_START,
		GameEvent.GAME_EXIT,
		GameEvent.GAME_PAUSE,
		GameEvent.GAME_RESUME,
		GameEvent.GAME_RESET,
		GameEvent.GAME_START,
		GameEvent.DEVICE_CHANGE_DIRECTION,
		GameEvent.DEVICE_GAME_EXIT,
		GameEvent.DEVICE_GAME_PAUSE,
		GameEvent.DEVICE_GAME_RESUME,
		GameEvent.UI_START_COUNTDOWN_COMPLETE,
		GameEvent.UI_COUNTDOWN_COMPLETE,
		GameEvent.UI_COUNTDOWN_TICK_COMPLETE,
		GameEvent.UI_CLEAR_GAME_OVER_COMPLETE,
		GameEvent.UI_DRAW_GAME_OVER_COMPLETE,
		GameEvent.UI_CLEAR_SCORE_COMPLETE,
		GameEvent.UI_UPDATE_SCORE_COMPLETE,
		GameEvent.UI_DRAW_SCORE_COMPLETE,
		GameEvent.UI_CLEAR_PRIZE_COMPLETE,
		GameEvent.UI_DRAW_PRIZE_COMPLETE,
		GameEvent.UI_CLEAR_SNAKE_COMPLETE,
		GameEvent.UI_DRAW_SNAKE_COMPLETE,
		GameEvent.UI_UPDATE_SNAKE_COMPLETE,
		GameEvent.UI_CLEAR_PITCH_COMPLETE,
		GameEvent.UI_DRAW_PITCH_COMPLETE,
		GameEvent.UI_RESET_PITCH_COMPLETE
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