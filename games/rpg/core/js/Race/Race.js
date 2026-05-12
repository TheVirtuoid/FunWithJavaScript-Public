export default class Race {

	static HUMAN = Symbol('human');

	static IsRace(raceType) {
		return raceType === Race.HUMAN;
	}

	#type;

	constructor(args = {}) {
		this.#type = args.type;
	}

	get type() {
		return this.#type;
	}
}