import Pitch from "../../snake-base/Pitch/Pitch.js";
import GameEvent from "../../snake-base/GameEvent/GameEvent.js";
import Snake from "../../snake-base/Snake/Snake.js";
import Prize from "../../snake-base/Prize/Prize.js";
import Score from "../../snake-base/Score/Score.js";
import SnakeHtml from "../snake-html/SnakeHtml.js";

class MockUi {
	drawPitch(pitch) {
		GameEvent.Emit(GameEvent.UI_DRAW_PITCH_COMPLETE);
	}
	resetPitch() {
		GameEvent.Emit(GameEvent.UI_RESET_PITCH_COMPLETE);
	}
	clearPitch() {
		GameEvent.Emit(GameEvent.UI_CLEAR_PITCH_COMPLETE);
	}
	drawSnake(snake) {
		GameEvent.Emit(GameEvent.UI_DRAW_SNAKE_COMPLETE);
	}
	updateSnake(snake) {
		GameEvent.Emit(GameEvent.UI_UPDATE_SNAKE_COMPLETE);
	}
	clearSnake(snake) {
		GameEvent.Emit(GameEvent.UI_CLEAR_SNAKE_COMPLETE);
	}
	drawPrize(prize) {
		GameEvent.Emit(GameEvent.UI_DRAW_PRIZE_COMPLETE);
	}
	clearPrize(prize) {
		GameEvent.Emit(GameEvent.UI_CLEAR_PRIZE_COMPLETE);
	}
	drawScore(score) {
		GameEvent.Emit(GameEvent.UI_DRAW_SCORE_COMPLETE);
	}
	clearScore(score) {
		GameEvent.Emit(GameEvent.UI_CLEAR_SCORE_COMPLETE);
	}
	updateScore(score) {
		GameEvent.Emit(GameEvent.UI_UPDATE_SCORE_COMPLETE);
	}
	drawGameOver() {
		GameEvent.Emit(GameEvent.UI_DRAW_GAME_OVER_COMPLETE);
	}
	clearGameOver() {
		GameEvent.Emit(GameEvent.UI_CLEAR_GAME_OVER_COMPLETE);
	}
	startCountdown(secondsToCountdown) {
		GameEvent.Emit(GameEvent.UI_START_COUNTDOWN_COMPLETE);
		let counter = secondsToCountdown;
		const countdown = setInterval(() => {
			GameEvent.Emit(GameEvent.UI_COUNTDOWN_TICK_COMPLETE);
			counter--;
			if (counter <= 0) {
				clearInterval(countdown);
				GameEvent.Emit(GameEvent.UI_COUNTDOWN_COMPLETE);
			}
		}, 1000)
	}
}

const uiFactory = {
	mock: MockUi,
	html: SnakeHtml,
}


export default class Ui {
	#id;
	#uiName;
	#uiData;
	#ui;
	#messages;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID(), uiName, uiData = {} } = args;
		if (typeof uiName !== 'string') {
			throw new Error(`'uiName' argument must be a string`);
		}
		this.#id = id;
		this.#uiName = uiName;
		this.#uiData = uiData;
		const factory = uiFactory[uiName];
		if (factory) {
			this.#ui = new factory(this.uiData);
		}
	};

	get id () {
		return this.#id;
	}

	get uiName () {
		return this.#uiName;
	}

	get uiData () {
		return this.#uiData;
	}

	addMessages(messages) {
		this.#messages = messages;
	}

	drawPitch(pitch) {
		if (!(pitch instanceof Pitch)) {
			throw new Error(`'pitch' argument must be an instance of Pitch`);
		}
		this.#ui.drawPitch(pitch);
	}

	resetPitch() {
		this.#ui.resetPitch();
	}

	clearPitch() {
		this.#ui.clearPitch();
	}

	drawSnake(snake) {
		if (!(snake instanceof Snake)) {
			throw new Error(`'snake' argument must be an instance of Snake`);
		}
		this.#ui.drawSnake(snake);
	}

	updateSnake(snake) {
		if (!(snake instanceof Snake)) {
			throw new Error(`'snake' argument must be an instance of Snake`);
		}
		this.#ui.updateSnake(snake);
	}

	clearSnake(snake) {
		if (!(snake instanceof Snake)) {
			throw new Error(`'snake' argument must be an instance of Snake`);
		}
		this.#ui.clearSnake(snake);
	}

	drawPrize(prize) {
		if (!(prize instanceof Prize)) {
			throw new Error(`'prize' argument must be an instance of Prize`);
		}
		this.#ui.drawPrize(prize);
	}

	clearPrize(prize) {
		if (!(prize instanceof Prize)) {
			throw new Error(`'prize' argument must be an instance of Prize`);
		}
		this.#ui.clearPrize(prize);
	}

	drawScore(score) {
		if (!(score instanceof Score)) {
			throw new Error(`'score' argument must be an instance of Score`);
		}
		this.#ui.drawScore(score);
	}

	updateScore(score) {
		if (!(score instanceof Score)) {
			throw new Error(`'score' argument must be an instance of Score`);
		}
		this.#ui.updateScore(score);
	}

	clearScore(score) {
		if (!(score instanceof Score)) {
			throw new Error(`'score' argument must be an instance of Score`);
		}
		this.#ui.clearScore(score);
	}

	drawGameOver() {
		this.#ui.drawGameOver();
	}

	clearGameOver() {
		this.#ui.clearGameOver();
	}

	startCountdown(secondsToCountdown = 5) {
		if (typeof secondsToCountdown !== 'number') {
			throw new Error(`'secondsToCountdown' argument must be a number`);
		}
		this.#ui.startCountdown(secondsToCountdown);
	}

	clearCountdown() {
		this.#ui.clearCountdown();
	}

	drawMessage(messageId) {
		this.#ui.drawMessage(messageId, this.#messages.get(messageId));
	}

	clearMessage(messageId) {
		this.#ui.clearMessage(messageId);
	}

	clearAllMessages() {
		this.#ui.clearAllMessages();
	}

	showMessage(messageId) {
		this.#ui.showMessage(messageId);
	}

	hideMessage(messageId) {
		this.#ui.hideMessage(messageId);
	}

	setInvisible(messageId) {
		this.#ui.setInvisible(messageId);
	}

	setVisible(messageId) {
		this.#ui.setVisible(messageId);
	}
}