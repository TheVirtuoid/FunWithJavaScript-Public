import Mineral from "../Mineral/Mineral.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";
import Conveyor from "../Conveyor/Conveyor.js";

export default class WorldData {
	static IsEmpty = (data) => {
		return data.ground === null && data.building === null;
	}

	static GROUND_NORMAL = Symbol('ground-normal');

	static GROUND_TYPES = [
		WorldData.GROUND_NORMAL,
		...Mineral.TYPES,
	];

	static BUILDING_TYPES = [
		...Extractor.TYPES,
		...Purifier.TYPES,
		...Combinator.TYPES,
		...Conveyor.TYPES
	];

	#ground;
	#building;

	constructor(args = {}) {
		let { ground = null } = args;
		if (ground !== null && !WorldData.GROUND_TYPES.includes(ground)) {
			throw new Error(`Invalid ground type: ${ground}`);
		}
		this.#ground = ground;
		this.#building = null;
	}

	get ground() {
		return this.#ground;
	}

	get building() {
		return this.#building;
	}

	addBuilding(building) {
		if (!WorldData.BUILDING_TYPES.includes(building)) {
			throw new Error(`Invalid building type: ${building}`);
		}
		if (this.#building !== null) {
			throw new Error('WorldData already has a building');
		}
		this.#building = building;
	}
}