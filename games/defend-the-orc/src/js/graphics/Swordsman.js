import UIEntity from "./UIEntity.js";
import StateEvent from "../structures/StateEvent.js";

export default class SwordsmanUi extends UIEntity {
	constructor(args) {
		super(args);
	}

	setState(state, directionChange) {
		const newState = new StateEvent({ ...state.toObject(), direction: !directionChange ? null : state.direction });
		super.setState(state);
	}
}
