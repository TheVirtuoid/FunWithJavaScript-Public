import Status from "./Status.js";

export default class StatusPuzzleReady extends Status {
	#piecesRemaining;

	constructor(args = {}) {
		args.code = Status.PUZZLE_READY;
		super(args);
		const { piecesRemaining } = args;
		this.#piecesRemaining = piecesRemaining;
	}

	get piecesRemaining() {
		return this.#piecesRemaining;
	}
}