import Base from "../Base/Base.js";

export default class DistributionCenter extends Base {
	static DEFAULT_CASH = 10000;
	static BUILDING = Symbol('building');

	static TYPES = [
		DistributionCenter.BUILDING
	]

	static Has(type) {
		return DistributionCenter.TYPES.includes(type);
	}

	#id;
	#name;
	#cash;

	constructor(args = {}) {
		args.type = DistributionCenter.BUILDING;
		super(args);
		this.#name = '';
		this.#cash = 0;
	}

	get name() {
		return this.#name;
	}

	get cash() {
		return this.#cash;
	}

	get id() {
		return this.#id;
	}

	initialize(name) {
		if (typeof name !== 'string') {
			throw new Error('DistributionCenter.initialize() requires a string');
		}
		if (name.length === 0) {
			throw new Error('DistributionCenter.initialize() requires a non-empty string');
		}
		if (name.length > 30) {
			throw new Error('DistributionCenter.initialize() requires a string shorter than 30 characters');
		}
		this.#name = name;
		this.#cash = DistributionCenter.DEFAULT_CASH;
	}
}