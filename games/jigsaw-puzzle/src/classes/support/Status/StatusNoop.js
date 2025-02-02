import Status from "./Status.js";

export default class StatusNoop extends Status {

	constructor(args = {}) {
		args.code = Status.NOOP;
		super(args);
	}
}