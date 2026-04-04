import GameEvent from "../GameEvent/GameEvent.js";
import Phaser from "phaser";
import ConveyorUI from "../Conveyor/ConveyorUI.js";
import CombinatorUI from "../Combinator/CombinatorUI.js";
import ExtractorUI from "../Extractor/ExtractorUI.js";
import PurifierUI from "../Purifier/PurifierUI.js";
import DistributionCenterUI from "../DistributionCenter/DistributionCenterUI.js";
import MineralUI from "../Mineral/MineralUI.js";
import AlloyUI from "../Alloy/AlloyUI.js";
import GroundUI from "../Ground/GroundUI.js";
import StatsUI from "../Stats/StatsUI.js";
import World from "../World/World.js";
import Mineral from "../Mineral/Mineral.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import WorldUI from "../World/WorldUI.js";
import StoreUI from "../Store/StoreUI.js";
import Extractor from "../Extractor/Extractor.js";
import TransporterUI from "../Transporter/TransporterUI.js";
import Stats from "../Stats/Stats.js";
import WorldData from "../WorldData/WorldData.js";
import Store from "../Store/Store.js";

export default class Game extends Phaser.Scene {

	static UNIT_SIZE = 64;
	static WORLD_UNITS = 50;
	static HALF_SIZE = Game.UNIT_SIZE / 2;
	static START_CASH = 10000000;
	static BASE_DELTA_TIMING = 100;

	#config;
	#phaserGame;
	#statsUI;
	#groundUI;
	#storeUI;
	#scene;
	#worldUI;
	#distributionCenterUI;
	#activePlacement;

	#updateTimer;
	#oreTimer;
	#transportTimer;

	#mineralUI;
	#conveyorUI;
	#combinatorUI;
	#extractorUI;
	#purifierUI;
	#alloyUI;
	#transporter;

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
		// this.#mineralUI = new MineralUI(this);
		/*
		// this.#groundUI = new GroundUI(this);
		this.#storeUI = new StoreUI(this);
		this.#mineralUI = new MineralUI(this);
		this.#distributionCenterUI = new DistributionCenterUI(this);
		this.#conveyorUI = new ConveyorUI(this);
		this.#combinatorUI = new CombinatorUI(this);
		this.#extractorUI = new ExtractorUI(this);
		this.#purifierUI = new PurifierUI(this);
		this.#alloyUI = new AlloyUI(this);
		this.#transporter = new TransporterUI(this);
		this.#worldUI = new WorldUI(this);*/
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
			this.#worldUI.createOre({ extractor: additionalData[0], oreType: payload });
			/*const extractor = additionalData[0]; // for documentation purposes
			const ore = this.#mineralUI.createMineral(payload)
			ore.setDirectionVector(extractor.directionVector);
			this.#mineralUI.createOreImage(ore, extractor.position);
			this.#transporter.add(ore, extractor);*/
		}
		/*if (eventName === GameEvent.STAT_CURSOR_POSITION) {
			this.#statsUI.setCursorPosition(payload);
		} else if (eventName === GameEvent.GAME_READY) {
			this.start();
		} else if (eventName === GameEvent.INVENTORY_ADD) {
			this.#statsUI.updateInventory(payload.symbol, payload.number);
		} else if (eventName === GameEvent.STAT_CASH) {
			this.#statsUI.updateCash(payload);
			this.#storeUI.setCash(this.#statsUI.cash);
		} else if (eventName === GameEvent.INVENTORY_SET_ACTIVE) {
			this.#worldUI.setActiveInventory(payload);
		} else if (eventName === GameEvent.ORE_CREATE) {
			const extractor = additionalData[0]; // for documentation purposes
			const ore = this.#mineralUI.createMineral(payload)
			ore.setDirectionVector(extractor.directionVector);
			this.#mineralUI.createOreImage(ore, extractor.position);
			this.#transporter.add(ore, extractor);
		} else if (eventName === GameEvent.GRID_SELECTED) {
			this.#statsUI.updateInformation(payload, this.#worldUI.getPosition(payload));
		}*/
	}

	start() {
		this.#statsUI.start(this.#stats);
		this.#storeUI.start(this.#store);
		this.#worldUI.start(this.#world);
		this.#distributeCash(Game.START_CASH);
		// this.#stats.setCursorPosition(new Vector2d(10, 10));
		// this.#stats.updateInventory(Extractor.AETHERITE, 10);
		// const worldData = new WorldData();
		// worldData.setDeposit(this.createMineral(Mineral.AETHERITE));
		// worldData.addBuilding(new Extractor({ type: Extractor.AETHERITE}));
		// this.#stats.populateInformation({ position: new Vector2d(10, 10), worldData });

	}

	preload() {
		this.#statsUI.preload();
		this.#storeUI.preload();
		this.#worldUI.preload(this);
		/*this.#conveyorUI.preload(this);
		this.#combinatorUI.preload(this);
		this.#extractorUI.preload(this);
		this.#purifierUI.preload(this);
		this.#distributionCenterUI.preload(this);
		this.#mineralUI.preload(this);
		this.#alloyUI.preload(this);
		this.#alloyUI.preload(this);*/
	}

	#distributeCash(cash) {
		this.#stats.updateCash(cash);
		this.#store.setAvailableCash(this.#stats.cash);
	}

	create() {
		this.#statsUI.create();
		this.#storeUI.create();
		/*this.#worldUI.create();
		this.#distributionCenterUI.createDistributionCenter();
		this.#updateTimer = 2000;
		this.#transportTimer = 1000;*/
		GameEvent.Emit(GameEvent.GAME_READY);
	}

	update(time, delta) {
		this.#timer -= delta;
		if (this.#timer <= 0) {
			this.#timer = Game.BASE_DELTA_TIMING;
			this.#worldUI.update(time, Game.BASE_DELTA_TIMING);
		}
	}

	createMineral(type) {
		const mineral = this.#mineralUI.createMineral(type);
		return mineral;
	}

	getDistributionCenterPosition() {
		return this.#distributionCenterUI.distributionCenterPositions;
	}

	getDistributionCenter() {
		return this.#distributionCenterUI.distributionCenter;
	}

	getPosition(position) {
		return this.#world.getPosition(position);
	}

	getBuildingById(id) {
		return this.#world.getBuildingById(id);
	}
}