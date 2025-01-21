export default class Status {
	static PUZZLE_READY = Symbol();
	static NOOP = Symbol();
	static NO_CHANGE = Symbol();
	static MOVED = Symbol();
	static CONNECTED = Symbol();
	static NO_CONNECTION = Symbol();

	#code;
	#data

	constructor(args = {}) {
		const { code = Status.NOOP, data = null } = args;
		this.#code = code;
		this.#data = data;
	}

	get code() {
		return this.#code;
	}

	get data() {
		return this.#data;
	}
}