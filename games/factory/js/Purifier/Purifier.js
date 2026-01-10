import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Purifier extends Base {

	constructor(args = {}) {
		super(args);
	}

	purify(mineral) {
		if (!(mineral instanceof Mineral)) {
			throw new Error('Purifier.purify() requires a Mineral');
		}
		mineral.purify(this.level);
	}
}