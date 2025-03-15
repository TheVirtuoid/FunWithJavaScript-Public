export default class Statistics {
	#time;
	#moves;
	#timeDom;
	#movesDom;

	constructor() {
		this.#time = 0;
		this.#moves = 0;
		this.#timeDom = null;
		this.#movesDom = null;
	}

	get time() {
		return this.#time;
	}

	get moves() {
		return this.#moves;
	}

	incrementTime() {
		this.#time++;
		if (this.#timeDom) {}

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
}