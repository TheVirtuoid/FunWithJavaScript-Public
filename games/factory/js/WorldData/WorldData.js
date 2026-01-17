import Mineral from "../Mineral/Mineral.js";
import Extractor from "../Extractor/Extractor.js";

export default class WorldData {
	static IsEmpty = (data) => {
		return data.ground === null && data.building === null;
	}

	static GROUND_NORMAL = Symbol('ground-normal');

	static GROUND_TYPES = [
		WorldData.GROUND_NORMAL,
		Mineral.AETHERITE,
		Mineral.PYROTITE,
		Mineral.LUMINITE,
		Mineral.OBSIDIANITE,
		Mineral.ZENITHITE
	];

	static BUILDING_TYPES = [
		Extractor.AETHERITE,
		Extractor.PYROTITE,
		Extractor.LUMINITE,
		Extractor.OBSIDIANITE,
		Extractor.ZENITHITE,
	];

	#ground;
	#building;

	constructor(args = {}) {
		let { ground = null } = args;
		if (ground !== null && !WorldData.GROUND_TYPES.includes(ground)) {
			ground = null;
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

	addBuilding(building) {}
}