import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Extractor extends Base {

	static #MINERAL_DATA = new Map([
		[Mineral.AETHERITE, { cost: 100, speed: 1 }],
		[Mineral.PYROTITE, { cost: 200, speed: 1 }],
		[Mineral.LUMINUM, { cost: 400, speed: 1 }],
		[Mineral.OBSIDIANITE, { cost: 800, speed: 1 }],
		[Mineral.ZENITHIUM, { cost: 1600, speed: 1 }]
	]);

	static Cost(extractor) {
		return Extractor.#MINERAL_DATA.get(extractor)?.cost;
	}

	static Speed(extractor) {
		return Extractor.#MINERAL_DATA.get(extractor)?.speed;
	}

	#speed;
	#cost;

	constructor(args = {}) {
		const { type } = args;
		if (!type) {
			throw new Error('Extractor must have a type');
		}
		if (!Extractor.#MINERAL_DATA.has(type)) {
			throw new Error(`Invalid extractor type: ${type}`);
		}
		super(args);
		this.#speed = Extractor.Speed(type);
		this.#cost = Extractor.Cost(type);
	}

	get speed() {
		// TODO: integrate with level
		return this.#speed;
	}

	sell() {
		console.warn('Extractor.sell() is not currently implemented');
		return this.#cost;
	}
}