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

export default class Game extends Phaser.Scene {

	static UNIT_SIZE = 64;
	static WORLD_UNITS = 50;
	static HALF_SIZE = Game.UNIT_SIZE / 2;

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

	constructor() {
		super({ key: 'factory' });
		GameEvent.Setup(this);
		this.#statsUI = new StatsUI(this);
		this.#groundUI = new GroundUI(this);
		this.#worldUI = new WorldUI(this);
		this.#storeUI = new StoreUI(this);
		this.#mineralUI = new MineralUI(this);
		this.#distributionCenterUI = new DistributionCenterUI(this);
		this.#conveyorUI = new ConveyorUI(this);
		this.#combinatorUI = new CombinatorUI(this);
		this.#extractorUI = new ExtractorUI(this);
		this.#purifierUI = new PurifierUI(this);
		this.#alloyUI = new AlloyUI(this);
		this.#transporter = new TransporterUI(this);
	}

	emit(eventName, payload, ...additionalData) {
		if (eventName === GameEvent.STAT_CURSOR_POSITION) {
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
		} else if (eventName === GameEvent.INVENTORY_REMOVE_ACTIVE) {
			this.#worldUI.removeActiveInventory();
		} else if (eventName === GameEvent.INVENTORY_REMOVE) {
			this.#statsUI.updateInventory(payload.symbol, -payload.number);
		} else if (eventName === GameEvent.ORE_CREATE) {
			const extractor = additionalData[0]; // for documentation purposes
			const ore = this.#mineralUI.createMineral(payload.mineral);
			this.#mineralUI.createOreImage(ore, extractor.position);
			this.#transporter.add(ore, extractor);
		}
	}

	start() {
		this.#statsUI.start();
		this.#storeUI.start();
		this.#storeUI.setCash(this.#statsUI.cash);
	}

	preload() {
		this.#conveyorUI.preload(this);
		this.#combinatorUI.preload(this);
		this.#extractorUI.preload(this);
		this.#purifierUI.preload(this);
		this.#distributionCenterUI.preload(this);
		this.#mineralUI.preload(this);
		this.#alloyUI.preload(this);
		this.#worldUI.preload(this);
		this.#alloyUI.preload(this);
	}

	create() {
		this.#statsUI.create();
		this.#worldUI.create();
		this.#distributionCenterUI.create();
		this.#updateTimer = 2000;
		this.#transportTimer = 1000;
		GameEvent.Emit(GameEvent.GAME_READY);
	}

	update(time, delta) {
		this.#updateTimer -= delta;
		this.#transportTimer -= delta;
		if (this.#updateTimer <= 0) {
			this.#updateTimer = 2000;
			const extractors = this.#worldUI.extractors;
			extractors.forEach(worldData => {
				const { building } = worldData;
				const { building: extractor, image } = building;
				const ore = extractor.produceOre();
			});
		}
		if (this.#transportTimer <= 0) {
			this.#transportTimer = 1000;
			this.#transporter.activateItems();
		}
	}

	#gridToWorldCenter = (gridX, gridY, tileSize, originX = 0, originY = 0) => {
		return {
			x: originX + gridX * Game.UNIT_SIZE + Game.HALF_SIZE,
			y: originY + gridY * Game.UNIT_SIZE + Game.HALF_SIZE
		};
	}
}