import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Purifier extends Base {

	static NAME = 'Purifier';

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
			{ base: { speed: 2000, purity: .6, inventory: 10, cost: 500, upgrade: { speed: 1000, purity: 1000, level: 20000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .68, cost: 5000 } },
			{ 2: { speed: 1200, purity: .76, cost: 25000 } },
			{ 3: { speed: 900, purity: .84, cost: 100000 } },
			{ 4: { speed: 700, purity: .92, cost: 300000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Purifier.PYROTITE,
			{ base: { speed: 2500, purity: .6, inventory: 10, cost: 2500, upgrade: { speed: 5000, purity: 5000 }, level: 1.5 } },
			{ 1: { speed: 2100, purity: .68, cost: 25000 } },
			{ 2: { speed: 1700, purity: .76, cost: 125000 } },
			{ 3: { speed: 1300, purity: .84, cost: 500000 } },
			{ 4: { speed: 1000, purity: .92, cost: 1500000 } },
			{ 5: { speed: 800, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Purifier.LUMINITE,
			{ base: { speed: 3000, purity: .6, inventory: 10, cost: 5500, upgrade: { speed: 11000, purity: 11000 }, level: 1.5 } },
			{ 1: { speed: 2500, purity: .68, cost: 55000 } },
			{ 2: { speed: 2100, purity: .76, cost: 275000 } },
			{ 3: { speed: 1700, purity: .84, cost: 1100000 } },
			{ 4: { speed: 1300, purity: .92, cost: 3300000 } },
			{ 5: { speed: 1000, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Purifier.OBSIDIANITE,
			{ base: { speed: 3500, purity: .6, inventory: 10, cost: 12500, upgrade: { speed: 25000, upgradePurity: 25000 }, level: 1.5 } },
			{ 1: { speed: 2900, purity: .68, cost: 125000 } },
			{ 2: { speed: 2500, purity: .76, cost: 625000 } },
			{ 3: { speed: 2000, purity: .84, cost: 2500000 } },
			{ 4: { speed: 1600, purity: .92, cost: 7500000 } },
			{ 5: { speed: 1200, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Purifier.ZENITHITE,
			{ base: { speed: 4000, purity: .6, inventory: 10, cost: 25000, upgrade: { speed: 50000, purity: 50000 }, level: 1.5 } },
			{ 1: { speed: 3200, purity: .68, cost: 250000 } },
			{ 2: { speed: 2600, purity: .76, cost: 1250000 } },
			{ 3: { speed: 2100, purity: .84, cost: 5000000 } },
			{ 4: { speed: 1700, purity: .92, cost: 15000000 } },
			{ 5: { speed: 1400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
	]);

	static Base = (type) => {
		return Purifier.#DATA.get(type)?.base;
	}

	static Pricing = (type) => {
		const pricing = Purifier.#DATA.get(type);
		if (pricing) {
			return structuredClone(pricing);
		}
	}

	constructor(args = {}) {
		super(args);
	}

	purify(mineral) {
		if (!(mineral instanceof Mineral)) {
			throw new Error('Purifier.purify() requires a Mineral');
		}
		mineral.purify(this.level);
	}
}