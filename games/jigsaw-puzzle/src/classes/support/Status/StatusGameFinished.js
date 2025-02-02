import Status from "./Status.js";
import StatusConnected from "./StatusConnected.js";

export default class StatusGameFinished extends StatusConnected {

	constructor(args = {}) {
		super(args);
	}

	get code() {
		return Status.GAME_FINISHED;
	}
}