import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";

export default class Game {
	#pitch;
	#snake;
	#id;
	#gameEventInitialized = false;

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

	emit(event, ...data) {
		if (!GameEvent.TYPES.includes(event)) {
			throw new Error(`'event' argument must be a valid event`);
		}
		if (event === GameEvent.GAME_EVENT_INITIALIZED) this.#onGameEventInitialized(...data);
		else if (event === GameEvent.SNAKE_COLLISION_WALL) this.#onSnakeCollisionWall(...data);
		else if (event === GameEvent.SNAKE_COLLISION_SELF) this.#onSnakeCollisionSelf(...data);
		else if (event === GameEvent.GAME_EXIT) this.#onGameExit(...data);
		else if (event === GameEvent.GAME_RESET) this.#onGameReset(...data);
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

	moveSnake(speed) {
		const newPosition = this.#snake.getProjectedPosition(speed);
		if (!this.#pitch.collision(newPosition) && !this.#snake.collision(newPosition)) {
			this.#snake.move(speed);
		}
		/*const collidedWithWall = this.#pitch.collision(newPosition);
		if (!collidedWithWall) {
			this.#snake.move(speed);
		}*/
	}

	changeSnakeDirection(newDirection) {
		this.#snake.changeDirection(newDirection);
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

}