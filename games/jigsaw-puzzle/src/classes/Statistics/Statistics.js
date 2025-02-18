export default class Statistics {
	#time;
	#moves;

	constructor() {
		this.#time = 0;
		this.#moves = 0;
	}

	get time() {
		return this.#time;
	}

	get moves() {
		return this.#moves;
	}

	incrementTime() {
		this.#time++;
	}

	incrementMoves() {
		this.#moves++;
	}
}