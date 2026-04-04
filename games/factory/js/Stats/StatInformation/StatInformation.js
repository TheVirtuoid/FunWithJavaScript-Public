export default class StatInformation {
	#worldData;
	#position;

	constructor(args = {}) {
		this.populate(args);
	}

	get position() {
		return this.#position.clone();
	}

	get building() {
		return this.#worldData?.building;
	}

	get deposit() {
		return this.#worldData?.deposit;
	}

	populate(args = {}) {
		const { worldData, position } = args;
		this.#worldData = worldData;
		this.#position = position;
	}
}