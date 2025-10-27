export default class Score {
	#score;
	#speed;
	#level;
	#time;
	#length;

	constructor(args = {}) {
		const { score = 0, speed = 0, level = 1, time = 0, length = 0 } = args;
		this.#score = score;
		this.#speed = speed;
		this.#level = level;
		this.#time = time;
		this.#length = length;
	}

	get score() {
		return this.#score;
	}
	get speed() {
		return this.#speed;
	}
	get level() {
		return this.#level;
	}
	get time() {
		return this.#time;
	}
	get length() {
		return this.#length;
	}

	incrementScore(value = 1) {
		this.#score += value;
	}
	incrementLength(value = 1) {
		this.#length += value;
	}
	incrementLevel(value = 1) {
		this.#level += value;
	}
	incrementSpeed(value = 1) {
		this.#speed += value;
	}
	setTime(time) {
		if (typeof time !== 'number') {
			throw new Error(`'time' argument must be a Number`);
		}
		if (time < 0) {
			throw new Error(`'time' argument must be a positive number`);
		}
		this.#time = time;
	}
}