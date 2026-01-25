import World from "./World.js";
import Mineral from "../Mineral/Mineral.js";
import Game from "../Game/Game.js";
import Phaser from "phaser";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class WorldUI extends World {

	static Preload(scene) {
		scene.load.image('ground', 'img/ground.png');
	}

	#scene;
	#worldPx;
	#zoomX;
	#zoomY;
	#minZoom;
	#activePlacement = null;

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
				this.place({ position, piece: mineral });
			});
		});
		this.#scene.cameras.main.setBounds(0, 0, this.#worldPx, this.#worldPx);
		this.#scene.cameras.main.setZoom(this.#minZoom)
		this.#scene.input.keyboard.on('keydown-ESC', this.#onEscape.bind(this));
		this.#scene.input.on('pointermove', this.#onPointerMove.bind(this));
		this.#scene.input.on('pointerdown', this.#onPointerDown.bind(this));
		this.#scene.input.on('pointermove', this.#onPointerMove.bind(this));
		this.#scene.input.on('wheel', this.#onWheel.bind(this));
	}

	place (args = {}) {
		const { position, piece, orientation = 0 } = args;
		const { x, y } = position;
		const screenX = x * Game.UNIT_SIZE - Game.HALF_SIZE;
		const screenY = y * Game.UNIT_SIZE - Game.HALF_SIZE;
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
	}

	#onEscape(event) {
		if (this.#activePlacement) {
			this.#activePlacement.ghost.destroy();
			this.#activePlacement = null;
		}
	}

	#onPointerMove(pointer) {
			const worldPoint = this.#scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
			const gridX = Math.floor(worldPoint.x / Game.UNIT_SIZE);
			const gridY = Math.floor(worldPoint.y / Game.UNIT_SIZE);

			// Clamp the values so they stay within your 50x50 bounds
			const clampedX = Phaser.Math.Clamp(gridX, 0, Game.WORLD_UNITS - 1);
			const clampedY = Phaser.Math.Clamp(gridY, 0, Game.WORLD_UNITS - 1);

			GameEvent.Emit(GameEvent.STAT_CURSOR_POSITION, new Vector2d(clampedX, clampedY));

			// stats.setCursorPosition(new Vector2d(clampedX, clampedY));

			// Update ghost image position if active
			if (this.#activePlacement) {
				const snapX = clampedX * Game.UNIT_SIZE + Game.HALF_SIZE;
				const snapY = clampedY * Game.UNIT_SIZE + Game.HALF_SIZE;
				this.#activePlacement.ghost.setPosition(snapX, snapY);
			}
			if (pointer.isDown) {
				this.#scene.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.#scene.cameras.main.zoom;
				this.#scene.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.#scene.cameras.main.zoom;
			}
	}

	#onPointerDown(pointer) {
		if (this.#activePlacement) {
			const worldPoint = this.#scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
			const gridX = Math.floor(worldPoint.x / Game.UNIT_SIZE);
			const gridY = Math.floor(worldPoint.y / Game.UNIT_SIZE);
			this.place({ position: new Vector2d(gridX + 1, gridY + 1), piece: this.#activePlacement.key });

			// Reset the cursor/placement state. Keeping this here for future reference.
			// activePlacement.ghost.destroy();
			// activePlacement = null;
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