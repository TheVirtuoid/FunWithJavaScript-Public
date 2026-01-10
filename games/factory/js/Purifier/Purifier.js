import Mineral from "../Mineral/Mineral.js";

export default class Purifier {

	#level;
	#id;

	constructor(args = {}) {
		this.#level = 1;
		this.#id = window.crypto.randomUUID();
	}

	get level() {
		return this.#level;
	}

	get id() {
		return this.#id;
	}

	purify(mineral) {
		if (!(mineral instanceof Mineral)) {
			throw new Error('Purifier.purify() requires a Mineral');
		}
		mineral.purify(this.#level);
	}
}