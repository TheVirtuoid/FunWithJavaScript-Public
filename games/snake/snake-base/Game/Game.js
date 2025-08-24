import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";

export default class Game {
	#vectorFactory;
	#pitch;
	#snake;
	#ui;
	#gameEventInitialized = false;
	#pitchDimensions;

	constructor(args = {}) {
		const { vectorFactory, ui } = args;

		if (!vectorFactory) {
			throw new Error(`'vectorFactory' property must be specified`);
		}

		this.#vectorFactory = vectorFactory;
		this.#ui = ui;
		GameEvent.Setup(this);
	}

	get vectorFactory() {
		return this.#vectorFactory;
	}

	get gameEventInitialized() {
		return this.#gameEventInitialized;
	}

	emit(event, ...data) {
		if (typeof event !== 'string') {
			throw new Error(`'event' argument must be a string`);
		}
		if (event === GameEvent.GAME_EVENT_INITIALIZED) this.#onGameEventInitialized(...data);
		else if (event === GameEvent.INPUT_MOVE) this.#onInputMove(...data)
	}

	addPitch(pitch) {
		if (!(pitch instanceof Pitch)) {
			throw new Error(`'pitch' argument must be an instance of Pitch`);
		}
		this.#pitch = pitch;
		this.#pitchDimensions = pitch.dimensions;
	}

	getPitchId() {
		return this.#pitch?.id;
	}

	addSnake(snake) {
		if (!(snake instanceof Snake)) {
			throw new Error(`'snake' argument must be an instance of Snake`);
		}
		console.log('adding snake to game', snake);
		this.#snake = snake;
	}

	getSnakeId() {
		return this.#snake?.id;
	}

	getSnakePosition() {
		return this.#snake?.position.clone();
	}

	getSnakeDirection() {
		return this.#snake?.direction.clone();
	}

	get pitchDimensions() {
		return this.#pitchDimensions?.clone();
	}

	#onGameEventInitialized() {
		this.#gameEventInitialized = true;
	}

	#onInputMove(direction = this.getSnakeDirection()) {
		console.log('ONINPUTMOVE', direction);
		console.log(this.#snake);
		this.#snake.move();
	}

}