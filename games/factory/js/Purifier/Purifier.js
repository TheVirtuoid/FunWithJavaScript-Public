import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Purifier extends Base {
	static AETHERITE = Symbol('purifier-aetherite');
	static PYROTITE = Symbol('purifier-pyrotite');
	static LUMINITE = Symbol('purifier-luminite');
	static OBSIDIANITE = Symbol('purifier-obsidianite');
	static ZENITHITE = Symbol('purifier-zenithite');

	static TYPES = [
		Purifier.AETHERITE,
		Purifier.PYROTITE,
		Purifier.LUMINITE,
		Purifier.OBSIDIANITE,
		Purifier.ZENITHITE
	];

	static DESCRIPTIONS = new Map([
		[Purifier.AETHERITE, Purifier.AETHERITE.description],
		[Purifier.PYROTITE, Purifier.PYROTITE.description],
		[Purifier.LUMINITE, Purifier.LUMINITE.description],
		[Purifier.OBSIDIANITE, Purifier.OBSIDIANITE.description],
		[Purifier.ZENITHITE, Purifier.ZENITHITE.description]
	])

	static Has = (element) => Purifier.TYPES.includes(element);

	static SYMBOLS = new Map([
		[Purifier.AETHERITE.description, Purifier.AETHERITE],
		[Purifier.PYROTITE.description, Purifier.PYROTITE],
		[Purifier.LUMINITE.description, Purifier.LUMINITE],
		[Purifier.OBSIDIANITE.description, Purifier.OBSIDIANITE],
		[Purifier.ZENITHITE.description, Purifier.ZENITHITE]
	]);

	static #DATA = new Map([
		[Purifier.AETHERITE,
			{ base: { speed: 2000, inventory: 10, purity: .6, cost: 50, upgrade: { speed: 100, purity: 100 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .68, cost: 500 } },
			{ 2: { speed: 1200, purity: .76, cost: 2500 } },
			{ 3: { speed: 900, purity: .84, cost: 10000 } },
			{ 4: { speed: 700, purity: .92, cost: 30000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
	]);

	static Base = (type) => {
		return Purifier.#DATA.get(type)?.base;
	}


	#image;

	constructor(args = {}) {
		super(args);
	}

	purify(mineral) {
		if (!(mineral instanceof Mineral)) {
			throw new Error('Purifier.purify() requires a Mineral');
		}
		mineral.purify(this.level);
	}

	get image() {
		return this.#image;
	}

	setImage(image) {
		this.#image = image;
	}
}