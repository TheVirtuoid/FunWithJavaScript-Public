import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class Extractor extends Base {

	static NAME = 'Extractor';

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

	static CAN_FLIP = new Map([
		[Extractor.AETHERITE, false],
		[Extractor.PYROTITE, false],
		[Extractor.LUMINITE, false],
		[Extractor.OBSIDIANITE, false],
		[Extractor.ZENITHITE, false]
	])

	/*
		Definition of the Data section, for each Mineral:
			base - the base information
				speed: beginning speed of ore production
				purity: beginning purity of ore production
				cost: cost to purchase the extractor
				upgrade: key/value set that is:
					speed: base cost to upgrade the speed
					purity: base cost to upgrade the purity
				level: cost to level up (in percentage). Normally something like 1.5, so that a cost of 100 means an upgrade cost of 150.
			Each Level:
				speed: Maximum speed that can be upgraded to on that level
				purity: Maximum purity that can be upgraded to on that level
				cost: Cost to upgrade to the next level. Infinity means at the highest level.
	 */

	static DATA = new Map([
		 [Extractor.AETHERITE, {
			 base: { speed: 2000, purity: .1, cost: 50, upgrade: { speed: 100, purity: 100 }, level: 1.2 },
			 1: { speed: 1600, purity: .18, cost: 500 },
			 2: { speed: 1200, purity: .26, cost: 2500 },
			 3: { speed: 900, purity: .34, cost: 10000 },
			 4: { speed: 700, purity: .42, cost: 30000 },
			 5: { speed: 400, purity: .5, cost: Number.POSITIVE_INFINITY }
			}
		 ],
		 [Extractor.PYROTITE, {
				base: { speed: 2500, purity: .1, cost: 250, upgrade: { speed: 500, purity: 500 }, level: 1.2 },
			 1: { speed: 2100, purity: .18, cost: 2500 },
			 2: { speed: 1700, purity: .26, cost: 12500 },
			 3: { speed: 1300, purity: .34, cost: 50000 },
			 4: { speed: 1000, purity: .42, cost: 150000 },
			 5: { speed: 800, purity: .5, cost: Number.POSITIVE_INFINITY }
			 }
		 ],
		[Extractor.LUMINITE,
			{ base: { speed: 3000, purity: .1, cost: 550, upgrade: { speed: 1100, purity: 1100 }, level: 1.2 },
			1: { speed: 2500, purity: .18, cost: 5500 },
			2: { speed: 2100, purity: .26, cost: 27500 },
			3: { speed: 1700, purity: .34, cost: 110000 },
			4: { speed: 1300, purity: .42, cost: 330000 },
			5: { speed: 1000, purity: .5, cost: Number.POSITIVE_INFINITY } }
		],
		[Extractor.OBSIDIANITE,
			{ base: { speed: 3500, purity: .1, cost: 1250, upgrade: { speed: 2500, purity: 2500 }, level: 1.2 },
			1: { speed: 2900, purity: .18, cost: 12500 },
			2: { speed: 2500, purity: .26, cost: 62500 },
			3: { speed: 2000, purity: .34, cost: 250000 },
			4: { speed: 1600, purity: .42, cost: 750000 },
			5: { speed: 1200, purity: .5, cost: Number.POSITIVE_INFINITY } }
		],
		[Extractor.ZENITHITE,
			{ base: { speed: 4000, purity: .1, cost: 2500, upgrade: { speed: 5000, purity: 5000 }, level: 1.2 },
			1: { speed: 3200, purity: .18, cost: 25000 },
			2: { speed: 2600, purity: .26, cost: 125000 },
			3: { speed: 2100, purity: .34, cost: 500000 },
			4: { speed: 1700, purity: .42, cost: 1500000 },
			5: { speed: 1400, purity: .5, cost: Number.POSITIVE_INFINITY } }
		],
	 ]);

	static Base = (type) => {
		return Extractor.DATA.get(type)?.base;
	}

	static Pricing = (type) => {
		const pricing = Extractor.DATA.get(type);
		if (pricing) {
			return structuredClone(pricing);
		}
	}

	static Level = (type, level) => {
		const data = Extractor.DATA.get(type);
		if (data) {
			const levelData = data[level];
			if (levelData) {
				return levelData;
			}
		}
	}

	#mineralType;

	constructor(args = {}) {
		const { type } = args;
		if (!type) {
			throw new Error('Extractor must have a type');
		}
		if (!Extractor.Has(type)) {
			throw new Error(`Invalid extractor type: ${type}`);
		}
		args.directionVector = new Vector2d(0, 1).rotate(args.orientation ?? 0).round();
		args.startingDirectionVector = [args.directionVector];
		args.endingDirectionVector = [args.directionVector];
		super(args);
		const { speed, cost, purity, price, upgrade } = Extractor.DATA.get(type).base;
		this.setSpeed(speed);
		this.setSpeedDelta(speed);
		this.setCost(cost);
		this.setPrice(price);
		this.setUpgrade(upgrade);
		this.setPurity(purity);
		this.#mineralType = Extractor.MINERAL_TYPES.get(type);
	}

	get mineralType() {
		return this.#mineralType;
	}

	produceOre() {
		GameEvent.Emit(GameEvent.ORE_CREATE, Extractor.MINERAL_TYPES.get(this.type), this);
	}
}