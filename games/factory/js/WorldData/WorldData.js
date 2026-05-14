import Mineral from "../Mineral/Mineral.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";
import Conveyor from "../Conveyor/Conveyor.js";

export default class WorldData {
	static IsEmpty = (data) => {
		return data.ground === null && data.building === null;
	}

	static DEPOSIT_TYPES = [
		...Mineral.TYPES,
	];

	static BUILDING_TYPES = [
		...Extractor.TYPES,
		...Purifier.TYPES,
		...Combinator.TYPES,
		...Conveyor.TYPES
	];

	static BUILDING_SYMBOLS = new Map([
		...Conveyor.SYMBOLS,
		...Combinator.SYMBOLS,
		...Purifier.SYMBOLS,
		...Extractor.SYMBOLS
	]);

	static BUILDING_CAN_FLIP = new Map([
		...Conveyor.CAN_FLIP,
		...Combinator.CAN_FLIP,
		...Purifier.CAN_FLIP,
		...Extractor.CAN_FLIP
	]);

	static UPGRADABLE_BUILDING_DATA = new Map([
		...Extractor.DATA,
		...Purifier.DATA,
		...Combinator.DATA
	]);

	static Base = (type) => {
		return WorldData.UPGRADABLE_BUILDING_DATA.get(type)?.base;
	}

	static Pricing = (type) => {
		const pricing = WorldData.UPGRADABLE_BUILDING_DATA.get(type);
		if (pricing) {
			return structuredClone(pricing);
		}
	}

	static Level = (type, level) => {
		const data = WorldData.UPGRADABLE_BUILDING_DATA.get(type);
		if (data) {
			const levelData = data[level];
			if (levelData) {
				return levelData;
			}
		}
	}

	#deposit;
	#building;

	constructor(args = {}) {
		let { deposit = null } = args;
		if (deposit !== null && !WorldData.DEPOSIT_TYPES.includes(deposit.type)) {
			throw new Error(`Invalid deposit type: ${deposit}`);
		}
		this.#deposit = deposit;
		this.#building = null;
	}

	get deposit() {
		return this.#deposit;
	}

	get building() {
		return this.#building;
	}

	setDeposit(deposit) {
		this.#deposit = deposit;
	}

	addBuilding(building) {
		if (this.#building !== null) {
			throw new Error('WorldData already has a building');
		}
		this.#building = building;
	}

	removeBuilding() {
		const building = this.#building;
		this.#building = null;
		return building;
	}
}