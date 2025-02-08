export default class Status {
	static PUZZLE_READY = Symbol('puzzle ready');
	static NOOP = Symbol('no operation');
	static NO_CHANGE = Symbol('no change');
	static MOVED = Symbol('moved');
	static CONNECTED = Symbol('connected');
	static NO_CONNECTION = Symbol('no connection');
	static GAME_FINISHED = Symbol('game finished');
	static INITIAL_CONNECTION = Symbol('initial connection');

	#data;
	#code;

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

	/*get piecesRemaining() {
		return this.#piecesRemaining;
	}

	get parent() {
		return this.#parent;
	}

	get distanceX() {
		return this.#distanceX;
	}

	get distanceY() {
		return this.#distanceY;
	}

	get piece() {
		return this.#piece;
	}*/
}