import {weeds as weedsConfig, stats as statsConfig, TIME} from './../../../weed-wacker.config.js';
import PanelUI from "./../graphics/Panel.js";

export default class Panel {

	static START_TIME = 15000;
	#weeds;
	#panelUI;
	#stats;
	#game;

	#baseTime = 15000;

	constructor(game) {
		this.#game = game;
		this.#stats = new Map([...statsConfig.entries()].map(([type, stat]) => [ type, { ...stat, value: 0 }]));
		this.#weeds = new Map([...weedsConfig.entries()].map(([type, weed]) => [ type, { ...weed, count: 0 }]));
		this.#panelUI = new PanelUI({ weeds: this.#weeds, stats: this.#stats, parent: this });
	}

	get game() {
		return this.#game;
	}

	getStat(type) {
		return this.#stats.get(type).value;
	}

	setStat(type, value) {
		const stat = this.#stats.get(type);
		stat.value = value;
		this.#stats.set(type, stat);
		this.#panelUI.updateStat(type, stat.value);
	}

	adjustStat(type, value) {
		const stat = this.#stats.get(type);
		stat.value += value;
		this.#stats.set(type, stat);
		this.#panelUI.updateStat(type, stat.value);
	}

	adjustWeed(type, value) {
		const weed = this.#weeds.get(type);
		weed.count += value;
		this.#weeds.set(type, weed);
		this.#panelUI.updateWeed(type, weed.count);
	}

	setWeed(type, value) {
		const weed = this.#weeds.get(type);
		weed.count = value;
		this.#weeds.set(type, weed);
		this.#panelUI.updateWeed(type, weed.count);
	}

	reset() {
		this.#stats.forEach((stat) => {
			stat.value = 0;
			this.#panelUI.updateStat(stat.type, stat.value);
		});
		[...this.#weeds.keys()].forEach(type => {
			this.setWeed(type, 0);
		});
		this.#baseTime = Panel.START_TIME;
		this.setStat(TIME, this.#baseTime);
	}

	get time() {
		return this.getStat(TIME);
	}

	setTime(value) {
		this.setStat(TIME, value);
	}

	adjustTime(value) {
		this.adjustStat(TIME, value);
	}

	getWeedInventory() {
		return new Map([...this.#weeds.entries()].map(([type, weed]) => [type, weed.count ]));
	}

	getStatValues() {
		return new Map([...this.#stats.entries()].map(([type, stat]) => [type, stat.value]));
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

	onLevelUp() {
		this.game.events.emit('on-select-level-up');
	}

	onNewGame() {
		this.game.events.emit('on-select-new-game');
	}

}
