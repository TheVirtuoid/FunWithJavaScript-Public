import Status from "./Status.js";

export default class StatusNoChange extends Status {
	#piece;

	constructor(args = {}) {
		args.code = Status.NO_CHANGE;
		super(args);
		const { piece } = args;
		this.#piece = piece;
	}

	get piece() {
		return this.#piece;
	}
}