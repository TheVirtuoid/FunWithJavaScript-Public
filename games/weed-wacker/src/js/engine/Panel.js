import { weeds as weedsConfig, stats as statsConfig, statsDescription } from './../../../weed-wacker.config.js';
import PanelUI from "./../graphics/Panel.js";

export default class Panel {

	#weeds;
	#panelUI;
	#stats;
	#game;

	constructor(game) {
		this.#game = game;
		this.#stats = new Map(statsConfig.map((stat) => [ stat.type, { ...stat, value: 0 }]));
		this.#weeds = weedsConfig.map((weed) => ({ ...weed, count: 0 }));
		this.#panelUI = new PanelUI({ weeds: this.#weeds, stats: this.#stats, parent: this });
	}

	get game() {
		return this.#game;
	}

	getStat(type) {
		type = typeof type === 'string' ? statsDescription.get(type) : type;
		return this.#stats.get(type).value;
	}

	setStat(type, value) {
		type = typeof type === 'string' ? statsDescription.get(type) : type;
		const stat = this.#stats.get(type);
		stat.value = value;
		this.#stats.set(type, stat);
		this.#panelUI.updateStat(type, stat.value);
	}

	adjustStat(type, value) {
		type = typeof type === 'string' ? statsDescription.get(type) : type;
		const stat = this.#stats.get(type);
		stat.value += value;
		this.#stats.set(type, stat);
		this.#panelUI.updateStat(type, stat.value);
	}

	adjustWeed(index, value) {
		this.#weeds[index].count += value;
		this.#panelUI.updateWeed(this.#weeds[index].type, this.#weeds[index].count);
	}

	setWeed(index, value) {
		this.#weeds[index].count = value;
		this.#panelUI.updateWeed(this.#weeds[index].type, this.#weeds[index].count);
	}

	reset() {
		this.#stats.forEach((stat) => {
			stat.value = 0;
			this.#panelUI.updateStat(stat.type, stat.value);
		});
		this.#weeds.forEach((weed) => {
			weed.count = 0;
			this.#panelUI.updateWeed(weed.type, weed.count);
		});
		this.setStat('time', 15000);
	}

	get time() {
		return this.getStat('time');
	}

	setTime(value) {
		this.setStat('time', value);
	}

	adjustTime(value) {
		this.adjustStat('time', value);
	}

	getWeedInventory() {
		return this.#weeds.map((weed) => weed.count);
	}

	setWeedInventory(inventory) {
		inventory.forEach((count, index) => {
			this.setWeed(index, count);
		});
	}

	setScenes() {
		this.#panelUI.setScenes();
	}

	removeWeeds(inventory) {
		inventory.forEach((count, index) => {
			this.adjustWeed(index, -count);
		});
	}

}
