import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";
import GameEvent from "../GameEvent/GameEvent.js";

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

	static Has = (element) => Extractor.TYPES.includes(element);

	static SYMBOLS = new Map([
		[Extractor.AETHERITE.description, Extractor.AETHERITE],
		[Extractor.PYROTITE.description, Extractor.PYROTITE],
		[Extractor.LUMINITE.description, Extractor.LUMINITE],
		[Extractor.OBSIDIANITE.description, Extractor.OBSIDIANITE],
		[Extractor.ZENITHITE.description, Extractor.ZENITHITE]
	])

	static #EXTRACTOR_DATA = new Map([
		[Extractor.AETHERITE, { cost: 100, speed: 1, mineral: Mineral.AETHERITE }],
		[Extractor.PYROTITE, { cost: 200, speed: 1, mineral: Mineral.PYROTITE }],
		[Extractor.LUMINITE, { cost: 400, speed: 1, mineral: Mineral.LUMINITE }],
		[Extractor.OBSIDIANITE, { cost: 800, speed: 1, mineral: Mineral.OBSIDIANITE }],
		[Extractor.ZENITHITE, { cost: 1600, speed: 1, mineral: Mineral.ZENITHITE }]
	]);

	static Cost(extractor) {
		return Extractor.#EXTRACTOR_DATA.get(extractor)?.cost;
	}

	static Speed(extractor) {
		return Extractor.#EXTRACTOR_DATA.get(extractor)?.speed;
	}

	#speed;
	#cost;
	#image;

	constructor(args = {}) {
		const { type } = args;
		if (!type) {
			throw new Error('Extractor must have a type');
		}
		if (!Extractor.#EXTRACTOR_DATA.has(type)) {
			throw new Error(`Invalid extractor type: ${type}`);
		}
		args.directionVector = new Vector2d(0, 1).rotate(args.orientation ?? 0).round();
		super(args);
		this.#speed = Extractor.Speed(type);
		this.#cost = Extractor.Cost(type);
	}

	get speed() {
		// TODO: integrate with level
		return this.#speed;
	}

	get image() {
		return this.#image;
	}

	sell() {
		console.warn('Extractor.sell() is not currently implemented');
		return this.#cost;
	}

	produceOre() {
		GameEvent.Emit(GameEvent.ORE_CREATE, Extractor.#EXTRACTOR_DATA.get(this.type), this.position);
	}

	setImage(image) {
		this.#image = image;
	}
}