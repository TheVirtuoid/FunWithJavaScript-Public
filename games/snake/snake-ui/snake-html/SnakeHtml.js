import GameEvent from "../../snake-base/GameEvent/GameEvent.js";
import PrizeType from "../../snake-base/Prize/PrizeType.js";

export default class SnakeHtml {
	#pitch;
	#pitchElement;
	#messagesElement;
	#snakeOldHeadCell;
	#snakeOldBodyCell;
	#rowLength;
	#score;
	#scoreElements;

	#messages = new Map();

	constructor() {
		this.#pitchElement = document.getElementById('pitch');
		this.#messagesElement = document.getElementById('messages');
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

	drawMessage(messageId, message) {
		const messageHash = GameEvent.Key(messageId);
		if (messageHash) {
			let messageData = this.#messages.get(messageHash);
			if (!messageData) {
				const p = document.createElement('p');
				p.innerText = message;
				p.classList.add(messageHash);
				this.#messages.set(messageHash, { element: p, message });
				this.#messagesElement.appendChild(p);
				messageData = this.#messages.get(messageHash);
			}
			messageData.message = message;
			messageData.element.innerText = message;
			GameEvent.Emit(GameEvent.UI_DRAW_MESSAGE_COMPLETE);
		}
	}

	clearMessage(messageId) {
		const messageHash = GameEvent.Key(messageId);
		if (messageHash && this.#messages.has(messageHash)) {
			const messageData = this.#messages.get(messageHash);
			this.#messages.delete(messageHash);
			this.#messagesElement.removeChild(messageData.element);
			GameEvent.Emit(GameEvent.UI_CLEAR_MESSAGE_COMPLETE);
		}
	}

	clearAllMessages() {
		this.#messages.forEach((messageData) => {
			this.#messagesElement.removeChild(messageData.element);
		});
		this.#messages.clear();
		GameEvent.Emit(GameEvent.UI_CLEAR_ALL_MESSAGES_COMPLETE);
	}

	hideMessage(messageId) {
		const messageHash = GameEvent.Key(messageId);
		if (messageHash && this.#messages.has(messageHash)) {
			const messageData = this.#messages.get(messageHash);
			messageData.element.classList.add('hidden');
			GameEvent.Emit(GameEvent.UI_HIDE_MESSAGE_COMPLETE);
		}
	}

	showMessage(messageId) {
		const messageHash = GameEvent.Key(messageId);
		if (messageHash && this.#messages.has(messageHash)) {
			const messageData = this.#messages.get(messageHash);
			messageData.element.classList.remove('hidden');
			GameEvent.Emit(GameEvent.UI_SHOW_MESSAGE_COMPLETE);
		}
	}

	setInvisible(messageId) {
		const messageHash = GameEvent.Key(messageId);
		if (messageHash && this.#messages.has(messageHash)) {
			this.#messages.get(messageHash).element.classList.add('invisible');
		}
	}

	setVisible(messageId) {
		const messageHash = GameEvent.Key(messageId);
		if (messageHash && this.#messages.has(messageHash)) {
			this.#messages.get(messageHash).element.classList.remove('invisible');
		}
	}

	drawPrize(prize) {
		const prizeCellLocation = prize.position.y * this.#rowLength + prize.position.x;
		const prizeCell = document.querySelector(`#pitch .cell:nth-child(${prizeCellLocation + 1})`);
		const prizeValue = PrizeType.VALUES.get(prize.type);
		prizeCell.classList.add(prizeValue.color);
		console.log('place: ', prize.position.y * this.#rowLength + prize.position.x);
		GameEvent.Emit(GameEvent.UI_DRAW_PRIZE_COMPLETE);
	}

	clearPrize(prize) {
		const prizeCellLocation = prize.position.y * this.#rowLength + prize.position.x;
		const prizeCell = document.querySelector(`#pitch .cell:nth-child(${prizeCellLocation + 1})`);
		const prizeValue = PrizeType.VALUES.get(prize.type);
		console.log('remove: ', prize.position.y * this.#rowLength + prize.position.x);
		console.log(prizeValue);
		prizeCell.classList.remove(prizeValue.color);
		console.log([...prizeCell.classList]);
		console.log(prizeCell.classList.contains(prizeValue.color));
		GameEvent.Emit(GameEvent.UI_CLEAR_PRIZE_COMPLETE);
	}
}