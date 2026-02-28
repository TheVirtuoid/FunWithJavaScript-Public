import World from "./World.js";
import Mineral from "../Mineral/Mineral.js";
import Game from "../Game/Game.js";
import Phaser from "phaser";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import GameEvent from "../GameEvent/GameEvent.js";
import WorldData from "../WorldData/WorldData.js";
import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";

export default class WorldUI extends World {

	#scene;
	#worldPx;
	#zoomX;
	#zoomY;
	#minZoom;
	#activePlacement = null;
	#selectedGridPoint;
	#buildingFactory = new Map();

	constructor(scene) {
		super();
		this.#scene = scene;
		this.#worldPx = Game.UNIT_SIZE * Game.WORLD_UNITS;
	}

	create() {
		this.#zoomX = this.#scene.cameras.main.width / this.#worldPx;
		this.#zoomY = this.#scene.cameras.main.height / this.#worldPx;
		this.#minZoom = Math.max(this.#zoomX, this.#zoomY);
		this.#scene.add.tileSprite(0, 0, this.#worldPx, this.#worldPx, 'ground').setOrigin(0, 0);
		Mineral.DESCRIPTIONS.forEach((mineral, key) => {
			this.getMineralDeposits(key).forEach(position => {
				const data = this.getPosition(position);
				const mineralData = this.#scene.createMineral(key, 'deposit');
				mineralData.setDepositImage(this.place({ position, piece: mineralData.depositTexture }));
				data.setDeposit(mineralData);
				this.setPosition(position, data);
			});
		});
		this.#scene.cameras.main.setBounds(0, 0, this.#worldPx, this.#worldPx);
		this.#scene.cameras.main.setZoom(this.#minZoom)
		this.#scene.input.keyboard.on('keydown-ESC', this.#onEscape.bind(this));
		this.#scene.input.keyboard.on('keydown-R', this.#onRotate.bind(this));
		this.#scene.input.keyboard.on('keydown-DELETE', this.#onDelete.bind(this));
		this.#scene.input.on('pointermove', this.#onPointerMove.bind(this));
		this.#scene.input.on('pointerdown', this.#onPointerDown.bind(this));
		this.#scene.input.on('pointermove', this.#onPointerMove.bind(this));
		this.#scene.input.on('wheel', this.#onWheel.bind(this));

		this.#buildingFactory = new Map([
			[Extractor.AETHERITE, Extractor],
			[Conveyor.STRAIGHT, Conveyor],
			[Conveyor.CURVE_LEFT, Conveyor],
			[Conveyor.CURVE_RIGHT, Conveyor],
			[Conveyor.T_INTERSECTION_LEFT, Conveyor],
			[Conveyor.T_INTERSECTION_RIGHT, Conveyor],
			[Conveyor.X_INTERSECTION, Conveyor]
		]);
	}

	preload() {
		this.#scene.load.image('ground', 'img/ground.png');
	}

	place (args = {}) {
		const { position, piece, orientation = 0 } = args;
		const { x, y } = position;
		const screenX = (x + 1) * Game.UNIT_SIZE - Game.HALF_SIZE;
		const screenY = (y + 1) * Game.UNIT_SIZE - Game.HALF_SIZE;
		const image = this.#scene.add.image(screenX, screenY, piece);
		switch(orientation) {
			case 90:
				image.rotation = Math.PI / 2;
				break;
			case 180:
				image.rotation = Math.PI;
				break;
			case 270:
				image.rotation = 3 * Math.PI / 2;
				break;
		}
		return image;
	}

	setActiveInventory(inventory) {
		this.#activePlacement = inventory;
		this.#activePlacement.orientation = 0;
	}

	removeActiveInventory() {
		this.#clearActiveInventory();
	}

	#clearActiveInventory() {
		if (this.#activePlacement) {
			this.#activePlacement.ghost.destroy();
			this.#activePlacement = null;
		}
	}

	#clearGridSelection() {
		if (this.#selectedGridPoint) {
			this.#selectedGridPoint.rect.destroy();
			this.#selectedGridPoint = null;
		}
	}

	#getGridCoordinates(pointer) {
		const worldPoint = this.#scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
		const gridX = Math.floor(worldPoint.x / Game.UNIT_SIZE);
		const gridY = Math.floor(worldPoint.y / Game.UNIT_SIZE);
		return { gridX, gridY };
	}


	#onDelete() {
		if (this.#selectedGridPoint) {
			const removedBuilding = this.removeBuilding(new Vector2d(this.#selectedGridPoint.gridX, this.#selectedGridPoint.gridY));
			removedBuilding.image.destroy();
			this.#clearGridSelection();
		}
	}

	#onRotate() {
		if (this.#activePlacement) {
			this.#activePlacement.ghost.rotation += Math.PI / 2;
			this.#activePlacement.orientation = (this.#activePlacement.orientation + 90) % 360;
		}
	}

	#onEscape(event) {
		this.#clearActiveInventory();
		this.#clearGridSelection();
	}

	#onPointerMove(pointer) {
		const { gridX, gridY } = this.#getGridCoordinates(pointer);
		GameEvent.Emit(GameEvent.STAT_CURSOR_POSITION, new Vector2d(gridX, gridY));
		if (this.#activePlacement) {
			const snapX = gridX * Game.UNIT_SIZE + Game.HALF_SIZE;
			const snapY = gridY * Game.UNIT_SIZE + Game.HALF_SIZE;
			this.#activePlacement.ghost.setPosition(snapX, snapY);
		}
		if (pointer.isDown) {
			this.#scene.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.#scene.cameras.main.zoom;
			this.#scene.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.#scene.cameras.main.zoom;
		}
	}

	#createBuilding(buildingSymbol, buildingData) {
		if (!this.#buildingFactory.has(buildingSymbol)) {
			return false;
		}
		const BuildingClass = this.#buildingFactory.get(buildingSymbol);
		return new BuildingClass(buildingData);
	}

	#onPointerDown(pointer) {
		const { gridX, gridY } = this.#getGridCoordinates(pointer);
		const position = new Vector2d(gridX, gridY);
		if (this.#activePlacement) {
			const symbol = [...WorldData.BUILDING_SYMBOLS].find(entry => entry[0] === this.#activePlacement.key)[1];
			if (!this.hasBuilding(position)) {
				const piece = this.#activePlacement.key;
				const orientation = this.#activePlacement.orientation;
				const image = this.place({ position, piece, orientation });
				const building = this.#createBuilding(symbol, { type: symbol, position, orientation });
				this.addBuilding({ position, image, building });
				const gridData = this.getPosition(position);
				if (gridData.deposit) {
					const deposit = gridData.deposit;
					gridData.setDeposit(null);
					deposit.depositImage.destroy();
				}
				GameEvent.Emit(GameEvent.INVENTORY_REMOVE, { symbol, number: 1 });
			}
		} else {
			this.#clearGridSelection();
			const rect = this.#scene.add
				.rectangle(
					gridX * Game.UNIT_SIZE,
					gridY * Game.UNIT_SIZE,
					Game.UNIT_SIZE,
					Game.UNIT_SIZE
				)
				.setOrigin(0, 0)
				.setFillStyle(0x00ff00, 0.25)
				.setStrokeStyle(2, 0x00ff00, 1);
			this.#selectedGridPoint = { gridX, gridY, rect };
		}
	}

	#onWheel(pointer, gameObjects, deltaX, deltaY, deltaZ) {
		const cam = this.#scene.cameras.main;
		const zoomSpeed = 0.001;
		const maxZoom = 1.5;

		let newZoom = cam.zoom - deltaY * zoomSpeed;
		newZoom = Phaser.Math.Clamp(newZoom, this.#minZoom, maxZoom);
		const worldPoint = cam.getWorldPoint(pointer.x, pointer.y);
		cam.setZoom(newZoom);
		const newWorldPoint = cam.getWorldPoint(pointer.x, pointer.y);
		cam.scrollX -= (newWorldPoint.x - worldPoint.x);
		cam.scrollY -= (newWorldPoint.y - worldPoint.y);
	}
}