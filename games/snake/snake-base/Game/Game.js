import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";
import Prize from "../Prize/Prize.js";
import Ui from "../../snake-ui/Ui/Ui.js";
import Input from "../../snake-input/Input/Input.js";

export default class Game {
	#pitch;
	#snake;
	#id;
	#gameEventInitialized = false;
	#prize;
	#ui;
	#input;
	#snakeMove;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID() } = args;
		this.#id = id;
		GameEvent.Setup(this);
	}

	get gameEventInitialized() {
		return this.#gameEventInitialized;
	}

	get id () {
		return this.#id;
	}

	get snakePosition() {
		return this.#snake?.position.clone();
	}

	get snakeDirection() {
		return this.#snake?.direction.clone();
	}

	get snakeBody() {
		return this.#snake?.body;
	}

	get pitchDimensions() {
		return this.#pitch?.dimensions.clone();
	}

	get prizeType() {
		return this.#prize?.type;
	}

	get prizeValue() {
		return this.#prize?.value;
	}

	get prizePosition() {
		return this.#prize?.position;
	}

	emit(event, ...data) {
		if (!GameEvent.TYPES.includes(event)) {
			throw new Error(`'event' argument must be a valid event`);
		}
		if (event === GameEvent.GAME_EVENT_INITIALIZED) this.#onGameEventInitialized(...data);
		else if (event === GameEvent.SNAKE_COLLISION_WALL) this.#onSnakeCollisionWall(...data);
		else if (event === GameEvent.SNAKE_COLLISION_SELF) this.#onSnakeCollisionSelf(...data);
		else if (event === GameEvent.GAME_EXIT) this.#onGameExit(...data);
		else if (event === GameEvent.GAME_RESET) this.#onGameReset(...data);
		else if (event === GameEvent.INPUT_CHANGE_DIRECTION) this.#onInputChangeDirection(...data);
		else if (event === GameEvent.INPUT_GAME_PAUSE) this.#onInputGamePause(...data);
	}

	addPitch(pitch) {
		if (!(pitch instanceof Pitch)) {
			throw new Error(`'pitch' argument must be an instance of Pitch`);
		}
		this.#pitch = pitch;
	}

	addSnake(snake) {
		if (!(snake instanceof Snake)) {
			throw new Error(`'snake' argument must be an instance of Snake`);
		}
		this.#snake = snake;
	}

	addUi(ui) {
		if (!(ui instanceof Ui)) {
			throw new Error(`'ui' argument must be an instance of Ui`);
		}
		this.#ui = ui;
	}

	addInput(input) {
		if (!(input instanceof Input)) {
			throw new Error(`'input' argument must be an instance of Input`);
		}
		this.#input = input;
	}

	moveSnake(speed) {
		const newPosition = this.#snake.getProjectedPosition(speed);
		if (this.#pitch.collision(newPosition)) {
			GameEvent.Emit(GameEvent.SNAKE_COLLISION_WALL);
		} else if (this.#snake.collision(newPosition)) {
			GameEvent.Emit(GameEvent.SNAKE_COLLISION_SELF);
		} else {
			if (this.#prize?.collision(newPosition)) {
				GameEvent.Emit(GameEvent.SNAKE_COLLISION_PRIZE);
			}
			this.#snake.move(speed);
		}
	}

	generatePrize() {
		if (!this.#pitch || !this.#snake) {
			throw new Error(`'pitch' and 'snake' must be defined before generating a prize`);
		}
		this.#prize = new Prize({ pitch: this.#pitch, snake: this.#snake });
	}

	changeSnakeDirection(newDirection) {
		this.#snake.changeDirection(newDirection);
	}

	start() {
		if (!this.#pitch) {
			throw new Error(`'pitch' must be defined before starting the game`);
		}
		if (!this.#snake) {
			throw new Error(`'snake' must be defined before starting the game`);
		}
		if (!this.#ui) {
			throw new Error(`'ui' must be defined before starting the game`);
		}
		if (!this.#input) {
			throw new Error(`'input' must be defined before starting the game`);
		}
		this.#ui.drawPitch(this.#pitch);
		this.#ui.drawSnake(this.#snake);
		this.#snakeMove = setInterval(() => {
			this.moveSnake();
			this.#ui.updateSnake(this.#snake);
		}, 500);
	}

	#onGameEventInitialized() {
		this.#gameEventInitialized = true;
	}

	#onSnakeCollisionWall(data) {
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onSnakeCollisionSelf(data) {
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onGameExit(data) {
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onGameReset(data) {
		GameEvent.Emit(GameEvent.GAME_OVER);
	}
	// TODO: Possible updates:
	// 1. Accept speed parameter to move at different speeds - will need to determine speed and direction from args
	/*#onInputMove(direction = this.getSnakeDirection()) {
		if (!direction.equals(this.getSnakeDirection())) {
			this.#snake.changeDirection(direction);
		}
		this.#snake.move();
	}*/

	#onInputChangeDirection(args) {
		this.#snake.changeDirection(args.direction);
	}

	#onInputGamePause(args) {
		clearInterval(this.#snakeMove);
	}

}