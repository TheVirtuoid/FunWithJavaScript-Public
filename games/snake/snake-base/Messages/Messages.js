import GameEvent from "../GameEvent/GameEvent.js";

export default class Messages {

	static TITLE = Symbol('title');
	static STATS_TITLE = Symbol('stats-title');
	static STATS_SCORE = Symbol('stats-score');
	static STATS_LENGTH = Symbol('stats-length');

	#id;
	#messages = new Map([
		[GameEvent.GAME_OVER, 'Game over'],
		[GameEvent.GAME_EVENT_INITIALIZED, 'Game eventing system initialized'],
		[GameEvent.SNAKE_COLLISION_WALL, 'Collided with wall'],
		[GameEvent.SNAKE_COLLISION_SELF, 'Collided with self'],
		[GameEvent.SNAKE_COLLISION_PRIZE, 'Collided with prize'],
		[GameEvent.SNAKE_COLLISION_BOMB, 'Collided with bomb'],
		[GameEvent.SNAKE_MOVE, 'Snake has moved'],
		[GameEvent.SNAKE_DIRECTION_CHANGED, 'Snake has changed direction'],
		[GameEvent.SNAKE_JUMPED, 'Snake has jumped'],
		[GameEvent.INPUT_CHANGE_DIRECTION, 'Change direction from input'],
		[GameEvent.INPUT_CHANGE_SPEED, 'Change speed from input'],
		[GameEvent.INPUT_GAME_EXIT, 'Game exit from input'],
		[GameEvent.INPUT_GAME_PAUSE, 'Game pause from input'],
		[GameEvent.INPUT_GAME_RESUME, 'Game resume from input'],
		[GameEvent.INPUT_GAME_RESET, 'Game reset from input'],
		[GameEvent.INPUT_GAME_START, 'Game start from input'],
		[GameEvent.GAME_EXIT, 'Game exit'],
		[GameEvent.GAME_PAUSE, 'Game pause'],
		[GameEvent.GAME_RESUME, 'Game resume'],
		[GameEvent.GAME_RESET, 'Game reset'],
		[GameEvent.GAME_START, 'Game start'],
		[GameEvent.DEVICE_CHANGE_DIRECTION, 'Change direction from device'],
		[GameEvent.DEVICE_GAME_EXIT, 'Game exit from device'],
		[GameEvent.DEVICE_GAME_PAUSE, 'Game pause from device'],
		[GameEvent.DEVICE_GAME_RESUME, 'Game resume from device'],
		[GameEvent.UI_START_COUNTDOWN_COMPLETE, 'Countdown start rendering complete'],
		[GameEvent.UI_COUNTDOWN_COMPLETE, 'Countdown rendering complete'],
		[GameEvent.UI_COUNTDOWN_TICK_COMPLETE, 'Countdown tick rendering complete'],
		[GameEvent.UI_CLEAR_COUNTDOWN_COMPLETE, 'Countdown clear rendering complete'],
		[GameEvent.UI_CLEAR_GAME_OVER_COMPLETE, 'Game over clear rendering complete'],
		[GameEvent.UI_DRAW_GAME_OVER_COMPLETE, 'Game over draw rendering complete'],
		[GameEvent.UI_CLEAR_SCORE_COMPLETE, 'Score clear rendering complete'],
		[GameEvent.UI_UPDATE_SCORE_COMPLETE, 'Score update rendering complete'],
		[GameEvent.UI_DRAW_SCORE_COMPLETE, 'Score draw rendering complete'],
		[GameEvent.UI_CLEAR_PRIZE_COMPLETE, 'Prize clear rendering complete'],
		[GameEvent.UI_DRAW_PRIZE_COMPLETE, 'Prize draw rendering complete'],
		[GameEvent.UI_CLEAR_SNAKE_COMPLETE, 'Snake clear rendering complete'],
		[GameEvent.UI_DRAW_SNAKE_COMPLETE, 'Snake draw rendering complete'],
		[GameEvent.UI_UPDATE_SNAKE_COMPLETE, 'Snake update rendering complete'],
		[GameEvent.UI_CLEAR_PITCH_COMPLETE, 'Pitch clear rendering complete'],
		[GameEvent.UI_DRAW_PITCH_COMPLETE, 'Pitch draw rendering complete'],
		[GameEvent.UI_RESET_PITCH_COMPLETE, 'Pitch reset rendering complete'],
		[GameEvent.UI_DRAW_MESSAGE_COMPLETE, 'Message draw rendering complete'],
		[GameEvent.UI_CLEAR_MESSAGE_COMPLETE, 'Message clear rendering complete'],
		[GameEvent.UI_CLEAR_ALL_MESSAGES_COMPLETE, 'Clear all messages rendering complete'],

		[Messages.TITLE, 'Snake on HTML'],
		[Messages.STATS_TITLE, 'Statistics'],
		[Messages.STATS_SCORE, 'Score'],
		[Messages.STATS_LENGTH, 'Length'],
	]);

	constructor(args = {}) {
		const { id = window.crypto.randomUUID() } = args;
		this.#id = id;
	}

	get id() {
		return this.#id;
	}

	add(key, value) {
		this.#messages.set(key, value);
	}

	get(key) {
		return this.#messages.get(key);
	}

	getAll() {
		const allMessages = new Map();
		this.#messages.forEach((value, key) => allMessages.set(key, value));
		return allMessages;
	}

	remove(key) {
		this.#messages.delete(key);
	}

	removeAll() {
		this.#messages.clear();
	}
}