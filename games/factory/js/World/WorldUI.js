import World from "./World.js";
import Mineral from "../Mineral/Mineral.js";
import Game from "../Game/Game.js";
import Phaser from "phaser";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import GameEvent from "../GameEvent/GameEvent.js";
import WorldData from "../WorldData/WorldData.js";
import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Utilities from "../Utilities/Utilities.js";
import MineralUI from "../Mineral/MineralUI.js";
import DistributionCenterUI from "../DistributionCenter/DistributionCenterUI.js";
import Combinator from "../Combinator/Combinator.js";
import Purifier from "../Purifier/Purifier.js";
import TransporterUI from "../Transporter/TransporterUI.js";

export default class WorldUI {

	#worldPx;
	#zoomX;
	#zoomY;
	#minZoom;
	#activePlacement = null;
	#selectedGridPoint;
	#buildingFactory = new Map();

	#scene;
	#world;
	#widthPx;
	#heightPx;

	#mineralUI;
	#distributionCenterUI;
	#transporter;

	constructor(scene) {
		this.#scene = scene;
		this.#worldPx = World.UNIT_SIZE * World.WIDTH;
		this.#heightPx = World.UNIT_SIZE * World.HEIGHT;
		this.#widthPx = World.UNIT_SIZE * World.WIDTH;
		this.#mineralUI = new MineralUI(this.#scene);
		this.#transporter = new TransporterUI(this.#scene);
		this.#distributionCenterUI = new DistributionCenterUI(this.#scene);
	}

	start(world) {
		this.#world = world;
		this.#scene.add.tileSprite(0, 0, this.#widthPx, this.#heightPx, 'ground').setOrigin(0, 0);
		Mineral.TYPES.forEach((type) => {
			this.#world.getMineralDeposits(type).forEach(position => {
				const data = this.#world.getPosition(position);
				const mineralData = this.#mineralUI.createMineral(type, 'deposit');
				mineralData.setDepositImage(this.place({ position, piece: mineralData.depositTexture }));
				data.setDeposit(mineralData);
				this.#world.setPosition(position, data);
			});
		});
		const distributionCenter = this.#world.distributionCenter;
		distributionCenter.buildingPosition.forEach(position => {
			const data = this.#world.getPosition(position);
			data.addBuilding(distributionCenter);
			this.#world.setPosition(position, data);
		});
		this.#distributionCenterUI.create(distributionCenter);
		this.#buildingFactory = new Map([
			[Extractor.AETHERITE, Extractor],
			[Extractor.PYROTITE, Extractor],
			[Extractor.LUMINITE, Extractor],
			[Extractor.OBSIDIANITE, Extractor],
			[Extractor.ZENITHITE, Extractor],
			[Conveyor.STRAIGHT, Conveyor],
			[Conveyor.CURVE_LEFT, Conveyor],
			[Conveyor.CURVE_RIGHT, Conveyor],
			[Conveyor.T_INTERSECTION_LEFT, Conveyor],
			[Conveyor.T_INTERSECTION_RIGHT, Conveyor],
			[Conveyor.X_INTERSECTION, Conveyor],
			[Combinator.IGNISIUM, Combinator],
			[Combinator.ETHERIUM, Combinator],
			[Combinator.MAGNANIUM, Combinator],
			[Combinator.SOLTARIUM, Combinator],
			[Combinator.VOIDTISSIUM, Combinator],
			[Combinator.PHOTONIUM, Combinator],
			[Combinator.STARFORGE, Combinator],
			[Purifier.AETHERITE, Purifier],
			[Purifier.PYROTITE, Purifier],
			[Purifier.LUMINITE, Purifier],
			[Purifier.OBSIDIANITE, Purifier],
			[Purifier.ZENITHITE, Purifier]
		]);
		this.#startZoom();
		this.#startInputs();
	}

	update(time, delta) {
		this.#world.buildings.forEach(building => {
			if (building.active) {
				if (Extractor.Has(building.type)) {
					if (building.adjustSpeedDelta(Game.BASE_DELTA_TIMING)) {
						building.produceOre();
					}
				}
			}
		});
		this.#transporter.update(time, delta);
	}

	#startZoom() {
		this.#zoomX = this.#scene.cameras.main.width / this.#worldPx;
		this.#zoomY = this.#scene.cameras.main.height / this.#worldPx;
		this.#minZoom = Math.max(this.#zoomX, this.#zoomY);
		this.#scene.cameras.main.setBounds(0, 0, this.#worldPx, this.#worldPx);
		this.#scene.cameras.main.setZoom(this.#minZoom)
	}

	#startInputs() {
		this.#scene.input.keyboard.on('keydown-ESC', this.#onEscape.bind(this));
		this.#scene.input.keyboard.on('keydown-R', this.#onRotate.bind(this));
		this.#scene.input.keyboard.on('keydown-DELETE', this.#onDelete.bind(this));
		this.#scene.input.on('pointermove', this.#onPointerMove.bind(this));
		this.#scene.input.on('pointerdown', this.#onPointerDown.bind(this));
		this.#scene.input.on('pointermove', this.#onPointerMove.bind(this));
		this.#scene.input.on('wheel', this.#onWheel.bind(this));
	}

	preload() {
		this.#scene.load.image('ground', 'img/ground.png');
		this.#mineralUI.preload();
		this.#distributionCenterUI.preload();
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

	createOre(args = {}) {
		const { extractor, oreType } = args;
		const ore = this.#mineralUI.createMineral(oreType);
		ore.setDirectionVector(extractor.directionVector);
		this.#mineralUI.createOreImage(ore, extractor.position);
		this.#transporter.add(ore, extractor);
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

	#onDelete() {
		if (this.#selectedGridPoint) {
			const removedBuilding = this.removeBuilding(new Vector2d(this.#selectedGridPoint.x, this.#selectedGridPoint.y));
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
		const { x, y } = Utilities.PositionToGrid(this.#scene.cameras.main.getWorldPoint(pointer.x, pointer.y));
		GameEvent.Emit(GameEvent.STAT_CURSOR_POSITION, new Vector2d(x, y));
		if (this.#activePlacement) {
			const snapX = x * Game.UNIT_SIZE + Game.HALF_SIZE;
			const snapY = y * Game.UNIT_SIZE + Game.HALF_SIZE;
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
		const { x, y } = Utilities.PositionToGrid(this.#scene.cameras.main.getWorldPoint(pointer.x, pointer.y));
		const position = new Vector2d(x, y);
		if (this.#activePlacement) {
			const symbol = [...WorldData.BUILDING_SYMBOLS].find(entry => entry[0] === this.#activePlacement.key)[1];
			if (!this.#world.hasBuilding(position)) {
				const piece = this.#activePlacement.key;
				const orientation = this.#activePlacement.orientation;
				const image = this.place({ position, piece, orientation });
				const building = this.#createBuilding(symbol, { type: symbol, position, orientation });
				console.log(building.type, building.purity);
				this.#world.addBuilding({ position, image, building });
				const gridData = this.#world.getPosition(position);
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
					x * Game.UNIT_SIZE,
					y * Game.UNIT_SIZE,
					Game.UNIT_SIZE,
					Game.UNIT_SIZE
				)
				.setOrigin(0, 0)
				.setFillStyle(0x00ff00, 0.25)
				.setStrokeStyle(2, 0x00ff00, 1);
			GameEvent.Emit(GameEvent.GRID_SELECTED, new Vector2d(x, y));
			this.#selectedGridPoint = { x, y, rect };
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