export default class Status {
	static PUZZLE_READY = Symbol('puzzle ready');
	static NOOP = Symbol('no operation');
	static NO_CHANGE = Symbol('no change');
	static MOVED = Symbol('moved');
	static CONNECTED = Symbol('connected');
	static NO_CONNECTION = Symbol('no connection');
	static GAME_FINISHED = Symbol('game finished');

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

	get connections() {
		return this.#data?.connections;
	}

	get piecesRemaining() {
		return this.#data?.piecesRemaining;
	}

	getConnection(index) {
		const connections = this.connections || []
		const connection = connections[index];
		return {
			child: connection?.data.child,
			distanceX: connection?.data.distanceX,
			distanceY: connection?.data.distanceY,
			parent: connection?.data.parent
		}
	}
}