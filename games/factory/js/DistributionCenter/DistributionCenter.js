import Base from "../Base/Base.js";
import World from "../World/World.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";

export default class DistributionCenter extends Base {
	static BUILDING = Symbol('building');

	static TYPES = [
		DistributionCenter.BUILDING
	]

	static Has(type) {
		return DistributionCenter.TYPES.includes(type);
	}

	#id;
	#name;
	#buildingPosition;

	// the distribution center is always at the center of the map
	constructor(args = {}) {
		const position= new Vector2d(Math.floor(World.UNIT_WIDTH/2) - 1, Math.floor(World.UNIT_WIDTH/2) - 1)
		args.type = DistributionCenter.BUILDING;
		args.position = position;
		super(args);
		this.#name = '';
		this.#buildingPosition = [args.position];
		this.#buildingPosition.push(args.position.add(new Vector2d(1, 0)));
		this.#buildingPosition.push(args.position.add(new Vector2d(0, 1)));
		this.#buildingPosition.push(args.position.add(new Vector2d(1, 1)));
	}

	get name() {
		return this.#name;
	}

	get id() {
		return this.#id;
	}

	get buildingPosition() {
		return [...this.#buildingPosition].map((vector) => vector.clone());
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
	}
}