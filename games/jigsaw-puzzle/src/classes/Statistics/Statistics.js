export default class Statistics {
	#moves;
	#timeDom;
	#movesDom;

	#centiSeconds;
	#seconds;
	#minutes;

	constructor() {
		this.#moves = 0;
		this.#timeDom = null;
		this.#movesDom = null;
		this.#centiSeconds = 0;
		this.#seconds = 0;
		this.#minutes = 0;
	}

	get time() {
		return this.#minutes * 100 * 60 + this.#seconds * 60 + this.#centiSeconds;
	}

	get moves() {
		return this.#moves;
	}

	incrementTime() {
		this.#centiSeconds++;
		if (this.#centiSeconds >= 100) {
			this.#centiSeconds = 0;
			this.#seconds++;
			if (this.#seconds >= 60) {
				this.#seconds = 0;
				this.#minutes++;
			}
		}
		this.#updateDom();
	}

	incrementMoves() {
		this.#moves++;
		this.#updateDom();
	}

	setDom(args = {}) {
		const { timeDom = null, movesDom = null } = args;
		this.#timeDom = timeDom;
		this.#movesDom = movesDom;
	}

	resetTime() {
		this.#centiSeconds = 0;
		this.#seconds = 0;
		this.#minutes = 0;
		this.#timeDom?.parentElement.classList.remove('finished');
		this.#updateDom();
	}

	resetMoves() {
		this.#moves = 0;
		this.#movesDom?.parentElement.classList.remove('finished');
		this.#updateDom();
	}

	formattedTime() {
		return `${this.#minutes}:${this.#seconds < 10 ? '0' : ''}${this.#seconds}.${this.#centiSeconds < 10 ? '0' : ''}${this.#centiSeconds}`;
	}

	gameFinished() {
		this.#timeDom?.parentElement.classList.add('finished');
		this.#movesDom?.parentElement.classList.add('finished');
	}

	#updateDom() {
		if (this.#timeDom) {
			this.#timeDom.textContent = this.formattedTime();
		}
		if (this.#movesDom) {
			this.#movesDom.textContent = `${this.#moves}`;
		}
	}
}