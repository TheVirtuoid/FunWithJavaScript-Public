import Status from "./Status.js";

export default class StatusNoChange extends Status {
	#piece;
	#piecesRemaining;

	constructor(args = {}) {
		args.code = Status.NO_CHANGE;
		super(args);
		const { piece, piecesRemaining = null } = args;
		this.#piece = piece;
		this.#piecesRemaining = piecesRemaining;
	}

	get piece() {
		return this.#piece;
	}

	get piecesRemaining() {
		return this.#piecesRemaining;
	}
}