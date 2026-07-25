import WeedUI from '../graphics/Weed.js';
import { weeds } from './../../../weed-wacker.config.js';

export default class Weed {

	static WEEDS = new Map(weeds.map(weed => [weed.type, {...weed }]));

	static WEED_SYMBOLS = [...weeds.map(weed => weed.type)];

	static IsWeed(weedType) {
		return Weed.WEEDS.has(weedType);
	}

	static getWeed(weedType) {
		return Weed.WEEDS.get(weedType);
	}

	static getWeedUI(weedType) {
		return Weed.WEEDS.get(weedType).weedUI;
	}

	static getWeedSpawnChances(level) {
		const weedsToSpawn = [...Weed.WEEDS.values()].filter((weed) => level <= weed.minLevel);
		return [...weedsToSpawn].map((weed) => 100 / weedsToSpawn.length);
	}

	#data;

	constructor(args = {}) {
		const { type, scene } = args;
		const weedData = Weed.WEEDS.get(type);
		if (!weedData) {
			throw new Error('Invalid weed type');
		}
		this.#data = {...weedData, maxToughness: weedData.toughness, weedUI: new WeedUI(scene, 0) };
	}

	get type() {
		return this.#data.type;
	}

	get toughness() {
		return this.#data.toughness;
	}

	get points() {
		return this.#data.points;
	}

	get sprite() {
		return this.#data.weedUI.sprite;
	}

	get name() {
		return this.#data.name;
	}

	adjustToughness(amount) {
		this.#data.toughness += amount;
		this.#data.weedUI.updateHealthBar(this.#data.toughness, this.#data.maxToughness);
		if (this.#data.toughness <= 0) {
			this.#data.weedUI.destroy();
		}
	}

	isCut() {
		return this.#data.toughness <= 0;
	}

	create(physicsGroup, x, y) {
		return this.#data.weedUI.create(physicsGroup, x, y, this.name);
	}

}
	
