import Status from "./Status.js";

export default class StatusMoved extends Status {
	#newPosition;
	#piece;

	constructor(args = {}) {
		args.code = Status.MOVED;
		super(args);
		const { newPosition, piece } = args;
		this.#newPosition = newPosition;
		this.#piece = piece;
	}

	get newPosition() {
		return this.#newPosition;
	}

	get piece() {
		return this.#piece;
	}
}