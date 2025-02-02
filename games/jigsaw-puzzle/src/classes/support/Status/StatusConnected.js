import Status from "./Status.js";

export default class StatusConnected extends Status {
	#fromPiece;
	#toPiece;
	#adjustment;
	#piecesRemaining;

	constructor(args = {}) {
		args.code = Status.CONNECTED;
		super(args);
		const { fromPiece, toPiece, adjustment, piecesRemaining } = args;
		this.#fromPiece = fromPiece;
		this.#toPiece = toPiece;
		this.#adjustment = adjustment;
		this.#piecesRemaining = piecesRemaining;
	}

	get fromPiece() {
		return this.#fromPiece;
	}

	get toPiece() {
		return this.#toPiece;
	}

	get adjustment() {
		return this.#adjustment;
	}

	get piecesRemaining() {
		return this.#piecesRemaining;
	}

}