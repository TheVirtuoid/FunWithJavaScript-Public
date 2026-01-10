import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";

export default class Extractor {

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

	#type;
	#level;
	#position;
	#speed;
	#id;
	#cost;

	constructor(args = {}) {
		const { type } = args;
		if (!type) {
			throw new Error('Extractor must have a type');
		}
		if (!Extractor.#MINERAL_DATA.has(type)) {
			throw new Error(`Invalid extractor type: ${type}`);
		}
		this.#type = type;
		this.#level = 1;
		this.#position = new Vector2d(0, 0);
		this.#speed = Extractor.Speed(type);
		this.#id = window.crypto.randomUUID();
		this.#cost = Extractor.Cost(type);
	}

	get type() {
		return this.#type;
	}

	get level() {
		return this.#level;
	}

	get position() {
		return this.#position;
	}

	get speed() {
		return this.#speed;
	}

	get id() {
		return this.#id;
	}

	sell() {
		console.warn('Extractor.sell() is not currently implemented');
		return this.#cost;
	}

	setPosition(position) {
		if (!(position instanceof Vector2d)) {
			throw new Error('Position must be a Vector2d');
		}
		this.#position = position;
	}
}