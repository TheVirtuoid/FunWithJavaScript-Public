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

export default class Game extends Phaser.Scene {

	static UNIT_SIZE = 64;
	static WORLD_UNITS = 50;
	static HALF_SIZE = Game.UNIT_SIZE / 2;

	#config;
	#phaserGame;
	#stats;
	#ground;
	#scene;
	#world;
	#distributionCenter;
	#activePlacement;

	constructor() {
		super({ key: 'factory' });
		GameEvent.Setup(this);
		this.#stats = new StatsUI(this);
		this.#ground = new GroundUI(this);
		this.#world = new WorldUI(this);
		this.#distributionCenter = new DistributionCenterUI(this);
	}

	emit(eventName, payload) {
		if (eventName === GameEvent.STAT_CURSOR_POSITION) {
			this.#stats.setCursorPosition(payload);
		}
	}

	start() {}

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
		this.#stats.start();


		/*const worldPx = Game.UNIT_SIZE * Game.WORLD_UNITS;
		const zoomX = this.cameras.main.width / worldPx;
		const zoomY = this.cameras.main.height / worldPx;
		const minZoom = Math.max(zoomX, zoomY);

		this.add.tileSprite(0, 0, worldPx, worldPx, 'ground').setOrigin(0, 0);
		Mineral.DESCRIPTIONS.forEach((mineral, key) => {
			this.#world.getMineralDeposits(key).forEach(position => {
				console.log(position);
				this.#ground.place({ scene: this, position, piece: mineral });
			});
		});*/

		// 1. Set the bounds of the world so the camera doesn't go into the void
		/*this.cameras.main.setBounds(0, 0, worldPx, worldPx);
		this.cameras.main.setZoom(minZoom);*/

		// Handle keyboard ESC key
		/*this.input.keyboard.on('keydown-ESC', () => {
			if (this.#activePlacement) {
				this.#activePlacement.ghost.destroy();
				this.#activePlacement = null;
			}
		});
*/
		// 2. Setup mouse "drag to scroll"
		/*this.input.on('pointermove', (pointer) => {
			const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

			// 2. Convert world pixels to grid coordinates
			const gridX = Math.floor(worldPoint.x / unitSize);
			const gridY = Math.floor(worldPoint.y / unitSize);

			// 3. Optional: Clamp the values so they stay within your 50x50 bounds
			const clampedX = Phaser.Math.Clamp(gridX, 0, worldUnits - 1);
			const clampedY = Phaser.Math.Clamp(gridY, 0, worldUnits - 1);

			stats.setCursorPosition(new Vector2d(clampedX, clampedY));

			// Update ghost image position if active
			if (this.#activePlacement) {
				const snapX = clampedX * unitSize + halfSize;
				const snapY = clampedY * unitSize + halfSize;
				this.#activePlacement.ghost.setPosition(snapX, snapY);
			}

			// document.getElementById('cursor-position').textContent = new Vector2d(clampedX, clampedY).toString();

			if (!pointer.isDown) return;

			// Move the camera based on mouse movement (inverted for natural scrolling)
			this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
			this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
		});*/

		/*this.input.on('pointerdown', (pointer) => {
			if (this.#activePlacement) {
				const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
				const gridX = Math.floor(worldPoint.x / unitSize);
				const gridY = Math.floor(worldPoint.y / unitSize);

				// Grid is 0-indexed, but the 'place' function uses 1-based logic based on existing code
				// (looking at screenX = x * unitSize - halfSize).
				// Let's adjust to match your 'place' function's coordinate system.
				console.log(this.#activePlacement);
				place(this, new Vector2d(gridX + 1, gridY + 1), this.#activePlacement.key);

				// Reset the cursor/placement state
				// activePlacement.ghost.destroy();
				// activePlacement = null;

			}
		});*/

		/*this.input.on('pointermove', (pointer) => {
			if (!pointer.isDown) return;

			this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
			this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
		});*/

		/*const centerX = worldPx / 2;
		const centerY = worldPx / 2;
		this.add.image(centerX - 64, centerY - 64, 'distribution-center');*/

		// 3. Setup Mouse Wheel Zoom
		/*this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
			const cam = this.cameras.main;
			const zoomSpeed = 0.001;
			const maxZoom = 1.5;

			// Calculate new zoom level
			let newZoom = cam.zoom - deltaY * zoomSpeed;

			// Clamp the zoom so it doesn't go too far out or in
			newZoom = Phaser.Math.Clamp(newZoom, minZoom, maxZoom);

			// Optional: Zoom toward the mouse pointer
			// To do this perfectly, we adjust the scroll as we zoom
			const worldPoint = cam.getWorldPoint(pointer.x, pointer.y);
			cam.setZoom(newZoom);

			const newWorldPoint = cam.getWorldPoint(pointer.x, pointer.y);
			cam.scrollX -= (newWorldPoint.x - worldPoint.x);
			cam.scrollY -= (newWorldPoint.y - worldPoint.y);
		});*/

		document.getElementById('inventory').addEventListener('click', (event) => {
			const img = event.target.closest('img');
			if (img && (event.target.closest('.inventory') || event.target.closest('.store'))) {
				// Extract key from src or data attribute.
				// Based on your UI, the dataset 'id' or the filename is likely the key.
				const key = img.dataset.id || img.src.split('/').pop().split('.')[0];

				// If already placing something, remove old ghost
				if (activePlacement) activePlacement.ghost.destroy();

				const ghost = this.add.image(0, 0, key);
				ghost.setAlpha(0.5);
				ghost.setDepth(100); // Ensure it's above other elements

				activePlacement = { key, ghost };
			}
		});

		document.getElementById('store').addEventListener('click', (event) => {
			if (event.target.classList.contains('purchase')) {
				const building = event.target.dataset.id;
				const amount = parseInt(event.target.textContent);
				const symbol = [...WorldData.BUILDING_SYMBOLS].find(entry => entry[0] === building)[1];
				stats.updateInventory(symbol, 1);
				stats.updateCash(-amount);
			}
		})
	}

	update() {}
}