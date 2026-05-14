import GameEvent from "../GameEvent/GameEvent.js";
import Phaser from "phaser";
import StatsUI from "../Stats/StatsUI.js";
import World from "../World/World.js";
import WorldUI from "../World/WorldUI.js";
import StoreUI from "../Store/StoreUI.js";
import Stats from "../Stats/Stats.js";
import Store from "../Store/Store.js";

export default class Game extends Phaser.Scene {

	static UNIT_SIZE = 64;
	static WORLD_UNITS = 50;
	static HALF_SIZE = Game.UNIT_SIZE / 2;
	static START_CASH = 50000000;
	static BASE_DELTA_TIMING = 100;

	#statsUI;
	#storeUI;
	#worldUI;

	#stats;
	#store;
	#world;

	#timer;

	constructor() {
		super({ key: 'factory' });
		GameEvent.Setup(this);
		this.#stats = new Stats();
		this.#store = new Store();
		this.#world = new World();
		this.#statsUI = new StatsUI(this);
		this.#storeUI = new StoreUI(this);
		this.#worldUI = new WorldUI(this);
		this.#timer = Game.BASE_DELTA_TIMING;
	}

	emit(eventName, payload, ...additionalData) {
		if (eventName === GameEvent.GAME_READY) {
			this.start();
		} else if (eventName === GameEvent.STAT_CURSOR_POSITION) {
			this.#stats.setCursorPosition(payload);
		} else if (eventName === GameEvent.INVENTORY_ADD) {
			this.#stats.updateInventory(payload.type, payload.number);
		} else if (eventName === GameEvent.GRID_SELECTED) {
			this.#stats.populateInformation({ position: payload, worldData: this.#world.getPosition(payload) });
		} else if (eventName === GameEvent.STAT_CASH) {
			this.#distributeCash(payload);
		} else if (eventName === GameEvent.INVENTORY_REMOVE_ACTIVE) {
			this.#worldUI.removeActiveInventory();
		} else if (eventName === GameEvent.INVENTORY_SET_ACTIVE) {
			const ghost = this.add.image(0, 0, payload.key);
			ghost.setAlpha(0.5);
			ghost.setDepth(100);
			this.#worldUI.setActiveInventory({...payload, ghost } );
		} else if (eventName === GameEvent.INVENTORY_REMOVE) {
			this.#stats.updateInventory(payload.symbol, -payload.number);
		} else if (eventName === GameEvent.ORE_CREATE) {
			this.#worldUI.createOre({building: additionalData[0], oreType: payload, purity: additionalData[1]});
		} else if (eventName === GameEvent.ALLOY_CREATE) {
			this.#worldUI.createAlloy({building: additionalData[0], alloyType: payload, purity: additionalData[1]});
		} else if (eventName === GameEvent.COMBINATOR_INVENTORY_CHANGE) {
			this.#statsUI.updateCombinatorInformation(payload);
		} else if (eventName === GameEvent.BUILDING_REMOVED) {
			this.#statsUI.removeBuilding();
		}
	}

	start() {
		this.#statsUI.start(this.#stats);
		this.#storeUI.start(this.#store);
		this.#worldUI.start(this.#world);
		this.#distributeCash(Game.START_CASH);
	}

	preload() {
		this.#statsUI.preload();
		this.#storeUI.preload();
		this.#worldUI.preload(this);
	}

	#distributeCash(cash) {
		this.#stats.updateCash(cash);
		this.#store.setAvailableCash(this.#stats.cash);
	}

	create() {
		this.#statsUI.create();
		this.#storeUI.create();
		GameEvent.Emit(GameEvent.GAME_READY);
	}

	update(time, delta) {
		this.#timer -= delta;
		if (this.#timer <= 0) {
			this.#timer = Game.BASE_DELTA_TIMING;
			this.#worldUI.update(time, Game.BASE_DELTA_TIMING);
		}
	}

	getPosition(position) {
		return this.#world.getPosition(position);
	}
}