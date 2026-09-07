import {orcs} from "../../../defend-the-orc.config.js";
import OrcUi from './../graphics/Orc.js';

export default class Orc {

	#who;
	#scene;
	#ui;
	#x;
	#y;
	#state;

	constructor(args = {}) {
		const { who, scene } = args;
		if (![...orcs.keys()].includes(who)) {
			throw new Error(`Invalid orc: ${who}`);
		}
		this.#scene = scene;
		this.#who = who;
		this.#ui = new OrcUi({ scene, who, scale: 2 });
	}

	get scene() {
		return this.#scene;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get imagePosition() {
		return { x: this.#ui.imagePosition.x, y: this.#ui.imagePosition.y };
	}

	setPosition(x, y) {
		this.#x = x;
		this.#y = y;
		this.#ui.setPosition(this.x, this.y);
	}

	setState(state) {
		this.#state = state;
		this.#ui.setState(state);
	}

	updateVelocity(state) {
		this.#ui.updateVelocity(state);
	}
}