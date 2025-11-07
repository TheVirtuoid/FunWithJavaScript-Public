import GameEvent from "../../snake-base/GameEvent/GameEvent.js";

export default class SnakeHtml {
	#pitch;
	#pitchElement;
	#snakeOldHeadCell;
	#snakeOldBodyCell;
	#rowLength;
	#score;
	#scoreElements;

	constructor() {
		this.#pitchElement = document.getElementById('pitch');
	}

	drawPitch(pitch) {
		this.#pitch = pitch;
		this.#pitchElement.replaceChildren();
		const dimensions = pitch.dimensions;
		for (let row = 0; row < dimensions.y; row++) {
			for (let column = 0; column < dimensions.x; column++) {
				const cell = document.createElement('span');
				cell.classList.add('cell');
				this.#pitchElement.appendChild(cell);
			}
		}
		this.#rowLength = dimensions.x;
		GameEvent.Emit(GameEvent.UI_DRAW_PITCH_COMPLETE);
	}

	drawSnake(snake) {
		const cellPosition = snake.position.y * this.#rowLength + snake.position.x + 1;
		this.#snakeOldHeadCell = cellPosition;
		document.querySelector(`#pitch .cell:nth-child(${cellPosition})`).classList.add(`snake-head`);
		snake.body.forEach((bodySegment) => {
			const cellPosition = bodySegment.y * this.#rowLength + bodySegment.x + 1;
			document.querySelector(`#pitch .cell:nth-child(${cellPosition})`).classList.add(`snake-body`);
			this.#snakeOldBodyCell = cellPosition;
		});
		GameEvent.Emit(GameEvent.UI_DRAW_SNAKE_COMPLETE);
	}

	drawScore(score) {
		this.#score = score;
		const scoreElement = document.getElementById('score');
		scoreElement.insertAdjacentHTML('afterbegin', `
			<h2>Statistics</h2>
			<ul>
				<li><span>Score</span><span data-score></span></li>
				<li><span>Length</span><span data-length></span></li>
			</ul>`);
		this.#scoreElements = {
			score: scoreElement.querySelector('[data-score]'),
			length: scoreElement.querySelector('[data-length]')
		}
		GameEvent.Emit(GameEvent.UI_DRAW_SCORE_COMPLETE);
		this.updateScore(score);
	}

	updateScore(score) {
		this.#score = score;
		this.#scoreElements.score.textContent = score.score;
		this.#scoreElements.length.textContent = score.length;
		GameEvent.Emit(GameEvent.UI_UPDATE_SCORE_COMPLETE);
	}

	updateSnake(snake) {
		const snakeHead = document.querySelector(`#pitch .cell:nth-child(${this.#snakeOldHeadCell})`).classList;
		snakeHead.remove(`snake-head`);
		snakeHead.add(`snake-body`);
		document.querySelector(`#pitch .cell:nth-child(${this.#snakeOldBodyCell})`).classList.remove(`snake-body`);
		this.#snakeOldHeadCell = snake.position.y * this.#rowLength + snake.position.x + 1;
		document.querySelector(`#pitch .cell:nth-child(${this.#snakeOldHeadCell})`).classList.add(`snake-head`);
		this.#snakeOldBodyCell = snake.body.at(-1).y * this.#rowLength + snake.body.at(-1).x + 1;
		GameEvent.Emit(GameEvent.UI_UPDATE_SNAKE_COMPLETE);
	}

	startCountdown(secondsToCountdown) {
		const countdownElement = document.getElementById('countdown');
		countdownElement.textContent = secondsToCountdown;
		const countdownHandle = setInterval(() => {
			secondsToCountdown--;
			countdownElement.textContent = secondsToCountdown;
			if (secondsToCountdown <= 0) {
				clearInterval(countdownHandle);
				GameEvent.Emit(GameEvent.UI_COUNTDOWN_COMPLETE);
			} else {
				GameEvent.Emit(GameEvent.UI_COUNTDOWN_TICK_COMPLETE);
			}
		}, 1000);
		GameEvent.Emit(GameEvent.UI_START_COUNTDOWN_COMPLETE);
	}

	clearCountdown() {
		const countdownElement = document.getElementById('countdown');
		countdownElement.textContent = '';
		GameEvent.Emit(GameEvent.UI_CLEAR_COUNTDOWN_COMPLETE);
	}
}