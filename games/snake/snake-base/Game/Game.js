import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";
import Prize from "../Prize/Prize.js";
import Ui from "../../snake-ui/Ui/Ui.js";
import Input from "../../snake-input/Input/Input.js";
import Score from "../Score/Score.js";
import Messages from "../Messages/Messages.js";
import PrizeType from "../Prize/PrizeType.js";

export default class Game {
	#pitch;
	#snake;
	#id;
	#gameEventInitialized = false;
	#prize;
	#ui;
	#input;
	#snakeMove;
	#score;
	#messages;
	#prizes;
	#paused;
	#movementDelay;
	#movementTimestamp;
	#actionButtons;

	static BUTTON_TRY_AGAIN = Symbol("tryAgain");
	static BUTTON_GO_BACK = Symbol("goBack");

	constructor(args = {}) {
		const { id = window.crypto.randomUUID() } = args;
		this.#id = id;
		this.#prizes = new Set();
		this.#paused = false;
		this.#movementDelay = 200; // in milliseconds
		this.#actionButtons = new Map([
			[Game.BUTTON_TRY_AGAIN, { action: null }],
			[Game.BUTTON_GO_BACK, { action: null }]
		]);
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
		console.log(event);
		if (event === GameEvent.GAME_EVENT_INITIALIZED) this.#onGameEventInitialized(...data);
		else if (event === GameEvent.SNAKE_COLLISION_WALL) this.#onSnakeCollisionWall(...data);
		else if (event === GameEvent.SNAKE_COLLISION_SELF) this.#onSnakeCollisionSelf(...data);
		else if (event === GameEvent.SNAKE_COLLISION_PRIZE) this.#onSnakeCollisionPrize(...data);
		else if (event === GameEvent.GAME_EXIT) this.#onGameExit(...data);
		else if (event === GameEvent.GAME_RESET) this.#onGameReset(...data);
		else if (event === GameEvent.GAME_OVER) this.#onGameOver(...data);
		else if (event === GameEvent.INPUT_CHANGE_DIRECTION) this.#onInputChangeDirection(...data);
		else if (event === GameEvent.INPUT_GAME_PAUSE) this.#onInputGamePause(...data);
		else if (event === GameEvent.INPUT_GAME_RESUME) this.#onInputGameResume(...data);
		else if (event === GameEvent.UI_START_COUNTDOWN_COMPLETE) this.#onUiStartCountdownComplete(...data);
		else if (event === GameEvent.UI_COUNTDOWN_TICK_COMPLETE) this.#onUiCountdownTickComplete(...data);
		else if (event === GameEvent.UI_COUNTDOWN_COMPLETE) this.#onUiCountdownComplete(...data);
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
		if (this.#messages) {
			this.#ui.addMessages(this.#messages);
		}
	}

	addInput(input) {
		if (!(input instanceof Input)) {
			throw new Error(`'input' argument must be an instance of Input`);
		}
		this.#input = input;
	}

	addMessages(messages) {
		if (!(messages instanceof Messages)) {
			throw new Error(`'messages' argument must be an instance of Messages`);
		}
		this.#messages = messages;
		if (this.#ui) {
			this.#ui.addMessages(messages);
		}
	}

	addScore(score) {
		if (!(score instanceof Score)) {
			throw new Error(`'score' argument must be an instance of Score`);
		}
		this.#score = score;
	}

	moveSnake(speed) {
		const newPosition = this.#snake.getProjectedPosition(speed);
		if (this.#pitch.collision(newPosition)) {
			GameEvent.Emit(GameEvent.SNAKE_COLLISION_WALL);
		} else if (this.#snake.collision(newPosition)) {
			GameEvent.Emit(GameEvent.SNAKE_COLLISION_SELF);
		} else {
			const prizeCollision = this.#prizesCollision(newPosition);
			if (prizeCollision) {
				GameEvent.Emit(GameEvent.SNAKE_COLLISION_PRIZE, prizeCollision);
				this.#snake.moveAndGrow(speed);
				this.#ui.updateSnake(this.#snake);
			} else {
				this.#snake.move(speed);
			}
		}
	}

	generatePrize() {
		if (!this.#pitch || !this.#snake) {
			throw new Error(`'pitch' and 'snake' must be defined before generating a prize`);
		}
		return new Prize({ pitch: this.#pitch, snake: this.#snake });
	}

	changeSnakeDirection(newDirection) {
		this.#snake.changeDirection(newDirection);
	}

	setActionButton(type, action) {
		this.#actionButtons.set(type, { action });
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
		this.#ui.drawScore(this.#score);
		this.#ui.drawText(Messages.TITLE);
		this.#ui.drawMessage(GameEvent.GAME_OVER);
		this.#ui.setInvisible(GameEvent.GAME_OVER);
		this.#ui.startCountdown(5);
	}

	#onGameEventInitialized() {
		this.#gameEventInitialized = true;
	}

	#onSnakeCollisionWall(data) {
		this.#ui.drawMessage(GameEvent.SNAKE_COLLISION_WALL);
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onSnakeCollisionSelf(data) {
		this.#ui.drawMessage(GameEvent.SNAKE_COLLISION_SELF);
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onSnakeCollisionPrize(prize) {
		if (prize.type === PrizeType.BOMB) {
			this.#ui.drawMessage(GameEvent.SNAKE_COLLISION_BOMB);
			GameEvent.Emit(GameEvent.GAME_OVER);
		} else {
			this.#ui.clearPrize(prize);
			this.#score.incrementScore(prize.value);
			this.#score.incrementLength(1);
			this.#ui.updateScore(this.#score);
			this.#removePrize(prize);
			let newPrize = this.#generatePrize();
			this.#addPrize(newPrize);
			this.#ui.drawPrize(newPrize);
			while (newPrize.type === PrizeType.BOMB) {
				Prize.AddBomb(newPrize.position);
				newPrize = this.#generatePrize();
				this.#addPrize(newPrize);
				this.#ui.drawPrize(newPrize);
			}
		}
	}

	#onGameExit(data) {
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onGameReset(data) {
		GameEvent.Emit(GameEvent.GAME_OVER);
	}

	#onGameOver(data) {
		this.#ui.setVisible(GameEvent.GAME_OVER);
		clearInterval(this.#snakeMove);
	}

	#onInputChangeDirection(args) {
		this.#snake.changeDirection(args.direction);
	}

	#onInputGamePause(args) {
		this.#paused = true;
		this.#ui.drawMessage(GameEvent.GAME_PAUSE);
	}

	#onInputGameResume(args) {
		this.#paused = false;
		this.#ui.clearMessage(GameEvent.GAME_PAUSE);
	}

	#onUiStartCountdownComplete(args) {
		return;
	}

	#onUiCountdownTickComplete(args) {
		return;
	}

	#onUiCountdownComplete(args) {
		this.#ui.clearCountdown();
		let prize = this.#generatePrize();
		while (prize.type === PrizeType.BOMB) {
			prize = this.#generatePrize();
		}
		this.#prizes.add(prize);
		this.#ui.drawPrize(prize);
		this.#movementTimestamp = performance.now();
		this.#snakeMove = setInterval(() => {
			if (!this.#paused) {
				this.moveSnake();
				this.#ui.updateSnake(this.#snake);
			}
		}, 200);
	}

	#generatePrize() {
		if (!this.#pitch || !this.#snake) {
			throw new Error(`'pitch' and 'snake' must be defined before generating a prize`);
		}
		return Prize.Random({ pitch: this.#pitch, snake: this.#snake, prizes: this.#prizes });
	}

	#addPrize(prize) {
		if (!this.#prizes.has(prize)) {
			this.#prizes.add(prize);
		}
	}

	#removePrize(prize) {
		this.#prizes.delete(prize);
	}

	#prizesCollision(position) {
		return [...this.#prizes.values()].find((prize) => prize.position.equals(position));
	}

}