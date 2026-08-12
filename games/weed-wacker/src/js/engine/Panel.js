import {weeds as weedsConfig, stats as statsConfig, TIME, ROUND} from './../../../weed-wacker.config.js';
import PanelUI from "./../graphics/Panel.js";

export default class Panel {

	static STATE_START = Symbol('state-start');
	static STATE_IN_ROUND = Symbol('state-in-round');
	static STATE_TIME_UP = Symbol('state-time-up');
	static STATE_GAME_OVER = Symbol('state-game-over');
	static STATE_LEVEL_UP = Symbol('state-level-up');

	#weeds;
	#panelUI;
	#stats;
	#game;

	#startValues;

	#gameTime;

	#round;

	#state;

	constructor(game) {
		this.#game = game;
		this.#stats = new Map([...statsConfig.entries()].map(([type, stat]) => [ type, { ...stat, value: 0 }]));
		this.#weeds = new Map([...weedsConfig.entries()].map(([type, weed]) => [ type, { ...weed, count: 0 }]));
		this.#panelUI = new PanelUI({ weeds: this.#weeds, stats: this.#stats, parent: this });
		this.#startValues = new Map([...statsConfig.entries()].map(([type, stat]) => [ type, stat.start ]));
		this.#round = 0;
	}

	get game() {
		return this.#game;
	}

	getStat(type) {
		return this.#stats.get(type).value;
	}

	getStartValue(type) {
		return this.#startValues.get(type);
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
			stat.value = this.getStartValue(stat.type);
			this.#panelUI.updateStat(stat.type, stat.value);
		});
		[...this.#weeds.keys()].forEach(type => {
			this.setWeed(type, 0);
		});
		this.setTime(this.getStartValue(TIME));
	}

	get time() {
		return this.#gameTime;
	}

	get round() {
		return this.#round;
	}

	setTime(value) {
		this.#gameTime = value;
		this.#panelUI.updateStat(TIME, this.#gameTime);
	}

	adjustTime(value) {
		this.#gameTime += value;
		this.#panelUI.updateStat(TIME, this.#gameTime);
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
		this.#round = 0;
		this.#panelUI.updateStat(ROUND, this.#round + 1);
		this.game.events.emit('on-select-new-game');
	}

	onContinueGame() {
		this.#round++;
		this.#panelUI.updateStat(ROUND, this.#round + 1);
		this.game.events.emit('on-select-continue-game');
	}

	setState(state) {
		this.#state = state;
		this.#panelUI.setState(state);
	}

}
