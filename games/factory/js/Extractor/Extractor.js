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

	static MINERAL_TYPES = new Map([
		[Extractor.AETHERITE, Mineral.AETHERITE],
		[Extractor.PYROTITE, Mineral.PYROTITE],
		[Extractor.LUMINITE, Mineral.LUMINITE],
		[Extractor.OBSIDIANITE, Mineral.OBSIDIANITE],
		[Extractor.ZENITHITE, Mineral.ZENITHITE]
	]);

	static Has = (element) => Extractor.TYPES.includes(element);

	static SYMBOLS = new Map([
		[Extractor.AETHERITE.description, Extractor.AETHERITE],
		[Extractor.PYROTITE.description, Extractor.PYROTITE],
		[Extractor.LUMINITE.description, Extractor.LUMINITE],
		[Extractor.OBSIDIANITE.description, Extractor.OBSIDIANITE],
		[Extractor.ZENITHITE.description, Extractor.ZENITHITE]
	]);

	static #DATA = new Map([
		 [Extractor.AETHERITE,
			 { base: { speed: 2000, purity: .1, cost: 50, price: 20 } },
			 { 1: { speed: 1600, purity: .25, cost: 500 } },
			 { 2: { speed: 1200, purity: .45, cost: 1200 } },
			 { 3: { speed: 900, purity: .65, cost: 2500 } },
			 { 4: { speed: 700, purity: .85, cost: 5600 } },
			 { 5: { speed: 400, purity: 1, cost: 13000 } }
		 ]
	 ]);

	static Price = (type) => {
		return Extractor.#DATA.get(type).base.price;
	}

	#speed;
	#cost;
	#price;
	#mineralType;
	#speedDelta;

	constructor(args = {}) {
		const { type } = args;
		if (!type) {
			throw new Error('Extractor must have a type');
		}
		if (!Extractor.Has(type)) {
			throw new Error(`Invalid extractor type: ${type}`);
		}
		args.directionVector = new Vector2d(0, 1).rotate(args.orientation ?? 0).round();
		super(args);
		const { speed, cost, purity, price } = Extractor.#DATA.get(type).base;
		this.#speed = speed;
		this.#speedDelta = speed;
		this.#cost = cost;
		this.#price = price;
		this.setPurity(purity);
		this.#mineralType = Extractor.MINERAL_TYPES.get(type);
	}

	get speed() {
		return this.#speed;
	}

	get mineralType() {
		return this.#mineralType;
	}

	get speedDelta() {
		return this.#speedDelta;
	}

	produceOre() {
		GameEvent.Emit(GameEvent.ORE_CREATE, Extractor.MINERAL_TYPES.get(this.type), this);
	}

	adjustSpeedDelta(delta) {
		this.#speedDelta -= delta;
		if (this.#speedDelta <= 0) {
			this.#speedDelta = this.#speed;
			return true;
		} else {
			return false;
		}
	}

}