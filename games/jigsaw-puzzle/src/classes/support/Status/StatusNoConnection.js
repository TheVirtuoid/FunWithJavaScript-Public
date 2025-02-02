import Status from "./Status.js";

export default class StatusNoConnection extends Status {
	#piece;

	constructor(args = {}) {
		args.code = Status.NO_CONNECTION;
		super(args);
		const { piece } = args;
		this.#piece = piece;
	}

	get piece() {
		return this.#piece;
	}
}