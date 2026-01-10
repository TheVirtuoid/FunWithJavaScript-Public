import Mineral from "../Mineral/Mineral.js";

export default class Purifier {

	#level;

	constructor(args = {}) {
		this.#level = 1;
	}

	get level() {
		return this.#level;
	}

	purify(mineral) {
		if (!(mineral instanceof Mineral)) {
			throw new Error('Purifier.purify() requires a Mineral');
		}
		mineral.purify(this.#level);
	}
}