export default class Position {
	#x;
	#y;

	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	set x(value) {
		this.#x = value;
	}

	set y(value) {
		this.#y = value;
	}

	// Method to clone the position
	clone() {
		return new Position(this.x, this.y);
	}
}