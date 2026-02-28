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

	static GetBuildingSymbol(buildingName) {}

	static GetDatabase() {
		const conveyorStraight = 10;
		const conveyorCurveLeft = 15;
		const conveyorCurveRight = 15;
		const conveyorTIntersectionLeft = 25;
		const conveyorTIntersectionRight = 25;
		const conveyorXIntersection = 40;

		const extractorAetherite = 100;
		const extractorPyrotite = 200;
		const extractorLuminite = 400;
		const extractorObsidianite = 800;
		const extractorZenithite = 1600;

		const prices = new Map([
			[Conveyor.STRAIGHT, conveyorStraight],
			[Conveyor.CURVE_LEFT, conveyorCurveLeft],
			[Conveyor.CURVE_RIGHT, conveyorCurveRight],
			[Conveyor.T_INTERSECTION_LEFT, conveyorTIntersectionLeft],
			[Conveyor.T_INTERSECTION_RIGHT, conveyorTIntersectionRight],
			[Conveyor.X_INTERSECTION, conveyorXIntersection],

			[Extractor.AETHERITE, extractorAetherite],
			[Extractor.PYROTITE, extractorPyrotite],
			[Extractor.LUMINITE, extractorLuminite],
			[Extractor.OBSIDIANITE, extractorObsidianite],
			[Extractor.ZENITHITE, extractorZenithite],

			[Purifier.AETHERITE, extractorAetherite * 2],
			[Purifier.PYROTITE, extractorPyrotite * 2],
			[Purifier.LUMINITE, extractorLuminite * 2],
			[Purifier.OBSIDIANITE, extractorObsidianite * 2],
			[Purifier.ZENITHITE, extractorZenithite * 2],
		]);

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
		/*if (!WorldData.BUILDING_TYPES.includes(building)) {
			throw new Error(`Invalid building type: ${building}`);
		}*/
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