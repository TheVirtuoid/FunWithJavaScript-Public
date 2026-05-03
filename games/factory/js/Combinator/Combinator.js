import Alloy from "../Alloy/Alloy.js";
import Base from "../Base/Base.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class Combinator extends Base {

	static NAME = 'Combinator';

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

	static Has = (type) => Combinator.TYPES.includes(type);

	static SYMBOLS = new Map([
		[Combinator.IGNISIUM.description, Combinator.IGNISIUM],
		[Combinator.PHOTONIUM.description, Combinator.PHOTONIUM],
		[Combinator.VOIDTISSIUM.description, Combinator.VOIDTISSIUM],
		[Combinator.SOLTARIUM.description, Combinator.SOLTARIUM],
		[Combinator.MAGNANIUM.description, Combinator.MAGNANIUM],
		[Combinator.ETHERIUM.description, Combinator.ETHERIUM],
		[Combinator.STARFORGE.description, Combinator.STARFORGE]
	]);

	static ALLOY_TYPES = new Map([
		[Combinator.IGNISIUM, Alloy.IGNISIUM],
		[Combinator.PHOTONIUM, Alloy.PHOTONIUM],
		[Combinator.VOIDTISSIUM, Alloy.VOIDTISSIUM],
		[Combinator.SOLTARIUM, Alloy.SOLTARIUM],
		[Combinator.MAGNANIUM, Alloy.MAGNANIUM],
		[Combinator.ETHERIUM, Alloy.ETHERIUM],
		[Combinator.STARFORGE, Alloy.STARFORGE]
	]);

	static DATA = new Map([
		[Combinator.IGNISIUM, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 30000, upgrade: { speed: 6000, purity: 6000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 300000 },
			2: { speed: 1200, purity: .4, cost: 1_500_000 },
			3: { speed: 900, purity: .6, cost: 6_000_000 },
			4: { speed: 700, purity: .8, cost: 18_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.PHOTONIUM, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 60_000, upgrade: { speed: 12000, purity: 12000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 600_000 },
			2: { speed: 1200, purity: .4, cost: 3_000_000 },
			3: { speed: 900, purity: .6, cost: 12_000_000 },
			4: { speed: 700, purity: .8, cost: 36_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.VOIDTISSIUM, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 130_000, upgrade: { speed: 26000, purity: 26000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 1_300_000 },
			2: { speed: 1200, purity: .4, cost: 6_500_000 },
			3: { speed: 900, purity: .6, cost: 26_000_000 },
			4: { speed: 700, purity: .8, cost: 78_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.SOLTARIUM, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 80_000, upgrade: { speed: 16000, purity: 16000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 800_000 },
			2: { speed: 1200, purity: .4, cost: 4_000_000 },
			3: { speed: 900, purity: .6, cost: 16_000_000 },
			4: { speed: 700, purity: .8, cost: 48_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.MAGNANIUM, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 150_000, upgrade: { speed: 30_000, purity: 30_000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 1_500_000 },
			2: { speed: 1200, purity: .4, cost: 7_500_000 },
			3: { speed: 900, purity: .6, cost: 30_000_000 },
			4: { speed: 700, purity: .8, cost: 90_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.ETHERIUM, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 305_000, upgrade: { speed: 61000, purity: 61000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 3_050_000 },
			2: { speed: 1200, purity: .4, cost: 15_250_000 },
			3: { speed: 900, purity: .6, cost: 61_000_000 },
			4: { speed: 700, purity: .8, cost: 183_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
		[Combinator.STARFORGE, {
			base: { speed: 2000, purity: .1, capacity: 40, cost: 660_000, upgrade: { speed: 130000, purity: 130000 }, level: 1.5 },
			1: { speed: 1600, purity: .2, cost: 6_600_000 },
			2: { speed: 1200, purity: .4, cost: 33_000_000 },
			3: { speed: 900, purity: .6, cost: 132_000_000 },
			4: { speed: 700, purity: .8, cost: 396_000_000 },
			5: { speed: 400, purity: 1, cost: Number.POSITIVE_INFINITY } }
		],
	]);

	static Base = (type) => {
		return Combinator.DATA.get(type)?.base;
	}

	static Pricing = (type) => {
		const pricing = Combinator.DATA.get(type);
		if (pricing) {
			return structuredClone(pricing);
		}
	}

	#inventory;
	#alloyType;
	#mineralsInAlloy;

	constructor(args = {}) {
		const { type } = args;
		const alloyType = Combinator.ALLOY_TYPES.get(type);
		if (!Alloy.Has(alloyType)) {
			throw new Error('Invalid alloy type provided');
		}
		const startingDirectionVectorOne = new Vector2d(0, 1).rotate(args.orientation ?? 0).round();
		const startingDirectionVectorTwo = new Vector2d(1, 0).rotate(args.orientation ?? 0).round();
		const endingDirectionVector = startingDirectionVectorTwo.clone();
		args.startingDirectionVector = [startingDirectionVectorOne, startingDirectionVectorTwo];
		args.endingDirectionVector = [endingDirectionVector];
		super(args);
		const { price, speed, cost, purity, capacity, upgrade } = Combinator.DATA.get(type).base;
		this.#inventory = [];
		this.#alloyType = alloyType;
		this.#mineralsInAlloy = Alloy.Ingredients(this.#alloyType);
		this.setSpeed(speed);
		this.setPrice(price);
		this.setCost(cost);
		this.setUpgrade(upgrade);
		this.setPurity(purity);
		this.setCapacity(capacity);
		this.setSpeedDelta(speed);
	}

	get inventoryFullPercentage() {
		return this.#inventory.length / this.capacity;
	}

	hasMineral(mineralType) {
		const minerals = [...Alloy.Ingredients(this.#alloyType).keys()];
		return minerals.includes(mineralType);
	}

	hasDirection(mineralDirection) {
		return this.startingDirectionVector[0].round().equals(mineralDirection.round()) ||
			this.startingDirectionVector[1].round().equals(mineralDirection.round()) ;
	}

	hasCapacity() {
		return this.#inventory.length < this.capacity;
	}

	canAcceptOre(mineral) {
		return this.hasMineral(mineral.type) && this.hasDirection(mineral.directionVector) && this.hasCapacity();
	}

	addOreToInventory(mineral) {
		this.#inventory.push(mineral);
		GameEvent.Emit(GameEvent.COMBINATOR_INVENTORY_CHANGE, this);
	}

	clearInventory() {
		this.#inventory = [];
	}


	produceAlloy() {
		let haveEnoughMinerals = 0;
		this.#mineralsInAlloy.forEach((count, mineralType) => {
			const inInventory = this.#inventory.filter(mineral => mineral.type === mineralType).length;
			if (inInventory >= count) {
				haveEnoughMinerals++;
			}
		});
		if (haveEnoughMinerals === this.#mineralsInAlloy.size) {
			const mineralsToRemove = new Map(this.#mineralsInAlloy);
			const newInventory = [];
			for (const mineral of this.#inventory) {
				if (mineralsToRemove.get(mineral.type) > 0) {
					mineralsToRemove.set(mineral.type, mineralsToRemove.get(mineral.type) - 1);
				} else {
					newInventory.push(mineral);
				}
			}
			this.#inventory = newInventory;
			GameEvent.Emit(GameEvent.ALLOY_CREATE, this.#alloyType, this, this.purity);
			GameEvent.Emit(GameEvent.COMBINATOR_INVENTORY_CHANGE, this);
		}
	}
}