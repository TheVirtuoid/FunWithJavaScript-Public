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

export default class Game extends Phaser.Scene {

	static UNIT_SIZE = 64;
	static WORLD_UNITS = 50;
	static HALF_SIZE = Game.UNIT_SIZE / 2;

	#config;
	#phaserGame;
	#stats;
	#ground;
	#store;
	#scene;
	#world;
	#distributionCenter;
	#activePlacement;
	#updateTimer;
	#oreTimer;

	constructor() {
		super({ key: 'factory' });
		GameEvent.Setup(this);
		this.#stats = new StatsUI(this);
		this.#ground = new GroundUI(this);
		this.#world = new WorldUI(this);
		this.#store = new StoreUI(this);
		this.#distributionCenter = new DistributionCenterUI(this);
	}

	emit(eventName, payload) {
		if (eventName === GameEvent.STAT_CURSOR_POSITION) {
			this.#stats.setCursorPosition(payload);
		} else if (eventName === GameEvent.GAME_READY) {
			this.start();
		} else if (eventName === GameEvent.INVENTORY_ADD) {
			this.#stats.updateInventory(payload.symbol, payload.number);
		} else if (eventName === GameEvent.STAT_CASH) {
			this.#stats.updateCash(payload);
			this.#store.setCash(this.#stats.cash);
		} else if (eventName === GameEvent.INVENTORY_SET_ACTIVE) {
			this.#world.setActiveInventory(payload);
		} else if (eventName === GameEvent.INVENTORY_REMOVE_ACTIVE) {
			this.#world.removeActiveInventory();
		} else if (eventName === GameEvent.INVENTORY_REMOVE) {
			this.#stats.updateInventory(payload.symbol, -payload.number);
		}
	}

	start() {
		this.#stats.start();
		this.#store.start();
		this.#store.setCash(this.#stats.cash);
	}

	preload() {
		ConveyorUI.Preload(this);
		CombinatorUI.Preload(this);
		ExtractorUI.Preload(this);
		PurifierUI.Preload(this);
		DistributionCenterUI.Preload(this);
		MineralUI.Preload(this);
		AlloyUI.Preload(this);
		WorldUI.Preload(this);
	}

	create() {
		this.#stats.create();
		this.#world.create();
		this.#distributionCenter.create();
		this.#updateTimer = 1000;
		this.#oreTimer = 100;
		GameEvent.Emit(GameEvent.GAME_READY);
	}

	update(time, delta) {
		this.#updateTimer -= delta;
		if (this.#updateTimer <= 0) {
			this.#updateTimer = 2000;
			const extractors = this.#world.extractors;
			extractors.forEach(worldData => {
				const { building } = worldData;
				const { building: extractor, image } = building;
				const ore = extractor.produceOre();
				this.#scene.tweens.add({
					targets: ore,
					x: this.#gridToWorldCenter(extractor.position.x, extractor.position.y, Game.UNIT_SIZE).x,
				});
				console.log(ore);
			});
		}
		if (this.#oreTimer <= 0) {
			this.#oreTimer = 100;
		}
	}

	#gridToWorldCenter = (gridX, gridY, tileSize, originX = 0, originY = 0) => {
		return {
			x: originX + gridX * Game.UNIT_SIZE + Game.HALF_SIZE,
			y: originY + gridY * Game.UNIT_SIZE + Game.HALF_SIZE
		};
	}
}