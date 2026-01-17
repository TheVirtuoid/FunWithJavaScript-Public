import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Extractor extends Base {

	static AETHERITE = Symbol('extractor-aetherite');
	static PYROTITE = Symbol('extractor-pyrotite');
	static LUMINITE = Symbol('extractor-luminite');
	static OBSIDIANITE = Symbol('extractor-obsidianite');
	static ZENITHITE = Symbol('extractor-zenithite');

	static TYPES = [
		Extractor.AETHERITE,
		Extractor.PYROTITE,
		Extractor.LUMINITE,
		Extractor.OBSIDIANITE,
		Extractor.ZENITHITE
	];

	static #EXTRACTOR_DATA = new Map([
		[Extractor.AETHERITE, { cost: 100, speed: 1 }],
		[Extractor.PYROTITE, { cost: 200, speed: 1 }],
		[Extractor.LUMINITE, { cost: 400, speed: 1 }],
		[Extractor.OBSIDIANITE, { cost: 800, speed: 1 }],
		[Extractor.ZENITHITE, { cost: 1600, speed: 1 }]
	]);

	static Cost(extractor) {
		return Extractor.#EXTRACTOR_DATA.get(extractor)?.cost;
	}

	static Speed(extractor) {
		return Extractor.#EXTRACTOR_DATA.get(extractor)?.speed;
	}

	#speed;
	#cost;

	constructor(args = {}) {
		const { type } = args;
		if (!type) {
			throw new Error('Extractor must have a type');
		}
		if (!Extractor.#EXTRACTOR_DATA.has(type)) {
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