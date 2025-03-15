export default class Statistics {
	#time;
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
		if (this.#timeDom) {
			this.#timeDom.textContent = this.formattedTime();
		}
	}

	incrementMoves() {
		this.#moves++;
		if (this.#movesDom) {
			this.#movesDom.textContent = `${this.#moves}`;
		}
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
	}

	resetMoves() {
		this.#moves = 0;
	}

	formattedTime() {
		return `${this.#minutes}:${this.#seconds < 10 ? '0' : ''}${this.#seconds}.${this.#centiSeconds < 10 ? '0' : ''}${this.#centiSeconds}`;
	}
}