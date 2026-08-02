import WeedUI from '../graphics/Weed.js';
import { weeds, weedTypes } from './../../../weed-wacker.config.js';

export default class Weed {

	/*static WEEDS = new Map(weeds.map(weed => [weed.type, {...weed }]));

	static WEED_SYMBOLS = [...weeds.map(weed => weed.type)];*/

	static IsWeed(type) {
		return weedTypes.includes(type);
	}

	static getWeed(type) {
		return weeds.get(type);
	}

	static getWeedSpawnChances(level) {
		const weedsToSpawn = [...weeds.values()].filter((weed) => level <= weed.minLevel);
		return [...weedsToSpawn].map((weed) => 100 / weedsToSpawn.length);
	}

	#data;

	constructor(args = {}) {
		const { type, scene } = args;
		const weedData = weeds.get(type);
		if (!weedData) {
			throw new Error('Invalid weed type');
		}
		this.#data = {...weedData, maxToughness: weedData.toughness, weedUI: new WeedUI(scene, type) };
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
	
