import Alloy from "../Alloy/Alloy.js";
import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Combinator extends Base {

	static IGNISIUM = Symbol('combinator-ignisium');
	static PHOTONIUM = Symbol('combinator-photonium');
	static VOIDTISSIUM = Symbol('combinator-voidtissium');
	static SOLTARIUM = Symbol('combinator-soltarium');
	static MAGNANIUM = Symbol('combinator-magnanium');
	static ETHERIUM = Symbol('combinator-etherium');
	static STARFORGE = Symbol('combinator-starforge');

	static TYPES = [
		Combinator.IGNISIUM,
		Combinator.PHOTONIUM,
		Combinator.VOIDTISSIUM,
		Combinator.SOLTARIUM,
		Combinator.MAGNANIUM,
		Combinator.ETHERIUM,
		Combinator.STARFORGE
	];

	static DESCRIPTIONS = new Map([
		[Combinator.IGNISIUM, Combinator.IGNISIUM.description],
		[Combinator.PHOTONIUM, Combinator.PHOTONIUM.description],
		[Combinator.VOIDTISSIUM, Combinator.VOIDTISSIUM.description],
		[Combinator.SOLTARIUM, Combinator.SOLTARIUM.description],
		[Combinator.MAGNANIUM, Combinator.MAGNANIUM.description],
		[Combinator.ETHERIUM, Combinator.ETHERIUM.description],
		[Combinator.STARFORGE, Combinator.STARFORGE.description]
	])

	static Has = (element) => Combinator.TYPES.includes(element);

	static SYMBOLS = new Map([
		[Combinator.IGNISIUM.description, Combinator.IGNISIUM],
		[Combinator.PHOTONIUM.description, Combinator.PHOTONIUM],
		[Combinator.VOIDTISSIUM.description, Combinator.VOIDTISSIUM],
		[Combinator.SOLTARIUM.description, Combinator.SOLTARIUM],
		[Combinator.MAGNANIUM.description, Combinator.MAGNANIUM],
		[Combinator.ETHERIUM.description, Combinator.ETHERIUM],
		[Combinator.STARFORGE.description, Combinator.STARFORGE]
	]);

	static #DATA = new Map([
		[Combinator.IGNISIUM,
			{ base: { speed: 2000, purity: .1, inventory: 40, cost: 30000, upgrade: { speed: 6000, purity: 6000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 300000 } },
			{ 2: { speed: 1200, purity: .4, cost: 1_500_000 } },
			{ 3: { speed: 900, purity: .6, cost: 6_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 18_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.PHOTONIUM,
			{ base: { speed: 2000, purity: .1, inventory: 10, cost: 60_000, upgrade: { speed: 12000, purity: 12000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 600_000 } },
			{ 2: { speed: 1200, purity: .4, cost: 3_000_000 } },
			{ 3: { speed: 900, purity: .6, cost: 12_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 36_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.VOIDTISSIUM,
			{ base: { speed: 2000, purity: .1, inventory: 10, cost: 130_000, upgrade: { speed: 26000, purity: 26000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 1_300_000 } },
			{ 2: { speed: 1200, purity: .4, cost: 6_500_000 } },
			{ 3: { speed: 900, purity: .6, cost: 26_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 78_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.SOLTARIUM,
			{ base: { speed: 2000, purity: .1, inventory: 10, cost: 80_000, upgrade: { speed: 16000, purity: 16000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 800_000 } },
			{ 2: { speed: 1200, purity: .4, cost: 4_000_000 } },
			{ 3: { speed: 900, purity: .6, cost: 16_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 48_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.MAGNANIUM,
			{ base: { speed: 2000, purity: .1, inventory: 10, cost: 150_000, upgrade: { speed: 30_000, purity: 30_000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 1_500_000 } },
			{ 2: { speed: 1200, purity: .4, cost: 7_500_000 } },
			{ 3: { speed: 900, purity: .6, cost: 30_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 90_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.ETHERIUM,
			{ base: { speed: 2000, purity: .1, inventory: 10, cost: 305_000, upgrade: { speed: 61000, purity: 61000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 3_050_000 } },
			{ 2: { speed: 1200, purity: .4, cost: 15_250_000 } },
			{ 3: { speed: 900, purity: .6, cost: 61_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 183_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.STARFORGE,
			{ base: { speed: 2000, purity: .1, inventory: 10, cost: 660_000, upgrade: { speed: 130000, purity: 130000 }, level: 1.5 } },
			{ 1: { speed: 1600, purity: .2, cost: 6_600_000 } },
			{ 2: { speed: 1200, purity: .4, cost: 33_000_000 } },
			{ 3: { speed: 900, purity: .6, cost: 132_000_000 } },
			{ 4: { speed: 700, purity: .8, cost: 396_000_000 } },
			{ 5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
	]);

	static Base = (type) => {
		return Combinator.#DATA.get(type)?.base;
	}

	#capacity;
	#inventory;

	constructor(args = {}) {
		const { type } = args;
		if (!Alloy.Has(type)) {
			throw new Error('Invalid alloy type provided');
		}
		super(args);
		this.#capacity = 100;
		this.#inventory = new Map();
	}

	get capacity() {
		return this.#capacity;
	}

	get inventorySize() {
		return [...this.#inventory].reduce((accumulator, [mineral, count]) => accumulator + count, 0);
	}

	combine(minerals) {
		if (!Array.isArray(minerals)) {
			throw new Error('Combinator.combine() requires an array of minerals');
		}
		if (minerals.some(mineral => !Mineral.Has(mineral))) {
			throw new Error('Invalid minerals provided');
		}
		if (this.inventorySize + minerals.length > this.capacity) {
			throw new Error('Inventory full');
		}
		minerals.forEach(mineral => {
			const count = this.#inventory.get(mineral) ?? 0;
			this.#inventory.set(mineral, count + 1);
		});
		const alloyRecipe = Alloy.Ingredients(this.type);
		if ([...alloyRecipe].every(([mineral, count]) => this.#inventory.get(mineral) >= count)) {
			[...alloyRecipe].forEach(([mineral, count]) => this.#inventory.set(mineral, this.#inventory.get(mineral) - count));
			// TODO: Purity
			return new Alloy({ type: this.type, purity: 0 });
		} else {
			return undefined;
		}
	}
}