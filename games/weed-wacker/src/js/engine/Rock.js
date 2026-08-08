import RockUI from '../graphics/Rock.js';
import { rocks, rockTypes } from './../../../weed-wacker.config.js';

export default class Rock {

	static IsRock(type) {
		return rockTypes.includes(type);
	}

	static getRock(type) {
		return rocks.get(type);
	}

	#data;

	constructor(args = {}) {
		const { type, scene } = args;
		const rockData = rocks.get(type);
		if (!rockData) {
			throw new Error('Invalid rock type');
		}
		this.#data = {...rockData, rockUI: new RockUI(scene, type) };
	}

	get type() {
		return this.#data.type;
	}

	get toughness() {
		return this.#data.toughness;
	}

	get sprite() {
		return this.#data.rockUI.sprite;
	}

	get name() {
		return this.#data.name;
	}

	create(physicsGroup, x, y) {
		return this.#data.rockUI.create(physicsGroup, x, y, this.name);
	}
}
	
