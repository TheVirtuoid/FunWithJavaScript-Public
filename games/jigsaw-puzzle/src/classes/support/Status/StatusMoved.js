import Status from "./Status.js";

export default class StatusMoved extends Status {
	#newPosition;
	#piece;
	#piecesRemaining;

	constructor(args = {}) {
		args.code = Status.MOVED;
		super(args);
		const { newPosition, piece, piecesRemaining = null } = args;
		this.#newPosition = newPosition;
		this.#piece = piece;
		this.#piecesRemaining = piecesRemaining;
	}

	get newPosition() {
		return this.#newPosition;
	}

	get piece() {
		return this.#piece;
	}

	get piecesRemaining() {
		return this.#piecesRemaining;
	}
}