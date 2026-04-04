import Base from "../Base/Base.js";
import World from "../World/World.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import Alloy from "../Alloy/Alloy.js";

export default class DistributionCenter extends Base {
	static BUILDING = Symbol('distribution-center');

	static TYPES = [
		DistributionCenter.BUILDING
	]

	static Has(type) {
		return DistributionCenter.TYPES.includes(type);
	}

	static ITEM_PRICES = new Map([
		[Mineral.AETHERITE, 30],
		[Mineral.PYROTITE, 40],
		[Mineral.LUMINITE, 60],
		[Mineral.OBSIDIANITE, 80],
		[Mineral.ZENITHITE, 140],
		[Alloy.IGNISIUM,250],
		[Alloy.PHOTONIUM, 300],
		[Alloy.VOIDTISSIUM, 400],
		[Alloy.SOLTARIUM, 600],
		[Alloy.MAGNANIUM, 900],
		[Alloy.ETHERIUM, 1500],
		[Alloy.STARFORGE, 5000]
	]);

	static Pricing(type) {
		return DistributionCenter.ITEM_PRICES.get(type);
	}

	#id;
	#name;
	#buildingPosition;

	// the distribution center is always at the center of the map
	constructor(args = {}) {
		const position= new Vector2d(Math.floor(World.WIDTH/2) - 1, Math.floor(World.HEIGHT/2) - 1)
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