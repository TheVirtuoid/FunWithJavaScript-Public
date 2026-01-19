import '../css/common.pcss';
import '../css/factory.pcss';

import Phaser from 'phaser';
import Vector2d from "./Vector/Vector2d/Vector2d.js";
import World from "./World/World.js";
import Mineral from "./Mineral/Mineral.js";

import ConveyorUI from './Conveyor/ConveyorUI.js';
import CombinatorUI from "./Combinator/CombinatorUI.js";
import ExtractorUI from "./Extractor/ExtractorUI.js";
import PurifierUI from "./Purifier/PurifierUI.js";
import DistributionCenterUI from "./DistributionCenter/DistributionCenterUI.js";
import MineralUI from "./Mineral/MineralUI.js";
import StatsUI from "./Stats/StatsUI.js";

const canvasSize = window.innerHeight * .9;
const config = {
	type: Phaser.AUTO,
	width: canvasSize,
	height: canvasSize,
	parent: 'pitch',
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

const unitSize = 64;
const worldUnits = 50;
const halfSize = unitSize / 2;

const game = new Phaser.Game(config);

const place = (scene, position, piece, orientation = 0) => {
		const { x, y } = position;
		const screenX = x * unitSize - halfSize;
		const screenY = y * unitSize - halfSize;
		const image = scene.add.image(screenX, screenY, piece);
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
};

let ground;

const stats = new StatsUI();

function preload() {
	ConveyorUI.Preload(this);
	CombinatorUI.Preload(this);
	ExtractorUI.Preload(this);
	PurifierUI.Preload(this);
	DistributionCenterUI.Preload(this);
	MineralUI.Preload(this);

	ground = this.load.image('ground', 'img/ground.png');
}

function create() {
	stats.create(this);
	stats.start();
	const worldPx = unitSize * worldUnits;

	const zoomX = this.cameras.main.width / worldPx;
	const zoomY = this.cameras.main.height / worldPx;
	const minZoom = Math.max(zoomX, zoomY);

	this.add.tileSprite(0, 0, worldPx, worldPx, 'ground').setOrigin(0, 0);

	const mineralLoop = new Map([
		[Mineral.AETHERITE, Mineral.AETHERITE.description],
		[Mineral.LUMINITE, Mineral.LUMINITE.description],
		[Mineral.PYROTITE, Mineral.PYROTITE.description],
		[Mineral.OBSIDIANITE, Mineral.OBSIDIANITE.description],
		[Mineral.ZENITHITE, Mineral.ZENITHITE.description]
	]);

	const world = new World();
	mineralLoop.forEach((mineral, key) => {
		world.getMineralDeposits(key).forEach(position => {
			place(this, position, mineral);
		});
	})


	// 1. Set the bounds of the world so the camera doesn't go into the void
	this.cameras.main.setBounds(0, 0, worldPx, worldPx);

	this.cameras.main.setZoom(minZoom);

	// 2. Setup mouse "drag to scroll"
	this.input.on('pointermove', (pointer) => {
		const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

		// 2. Convert world pixels to grid coordinates
		const gridX = Math.floor(worldPoint.x / unitSize);
		const gridY = Math.floor(worldPoint.y / unitSize);

		// 3. Optional: Clamp the values so they stay within your 50x50 bounds
		const clampedX = Phaser.Math.Clamp(gridX, 0, worldUnits - 1);
		const clampedY = Phaser.Math.Clamp(gridY, 0, worldUnits - 1);

		stats.setCursorPosition(new Vector2d(clampedX, clampedY));

		// document.getElementById('cursor-position').textContent = new Vector2d(clampedX, clampedY).toString();

		if (!pointer.isDown) return;

		// Move the camera based on mouse movement (inverted for natural scrolling)
		this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
		this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
	});

	this.input.on('pointermove', (pointer) => {
		if (!pointer.isDown) return;

		this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
		this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
	});

	const centerX = worldPx / 2;
	const centerY = worldPx / 2;
	this.add.image(centerX - 64, centerY - 64, 'distribution-center');

	/*place(this, new Vector2d(10,10), 'extractor-aetherite', 270);
	place(this, new Vector2d(11, 10), 'conveyor-straight');
	place(this, new Vector2d(12, 10), 'conveyor-straight');
	place(this, new Vector2d(13, 10), 'conveyor-straight');
	place(this, new Vector2d(14, 10), 'conveyor-straight');
	place(this, new Vector2d(15, 10), 'conveyor-straight');

	place(this, new Vector2d(16, 10), 'conveyor-curve-left', 270);

	place(this, new Vector2d(16, 11), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 12), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 13), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 14), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 15), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 16), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 17), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 18), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 19), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 20), 'conveyor-straight', 90);

	place(this, new Vector2d(16, 21), 'conveyor-curve-right', 90);

	place(this, new Vector2d(17, 21), 'conveyor-straight');
	place(this, new Vector2d(18, 21), 'conveyor-straight');
	place(this, new Vector2d(19, 21), 'conveyor-straight');
	place(this, new Vector2d(20, 21), 'conveyor-straight');
	place(this, new Vector2d(21, 21), 'conveyor-straight');
	place(this, new Vector2d(22, 21), 'conveyor-straight');
	place(this, new Vector2d(23, 21), 'conveyor-straight');

	place(this, new Vector2d(24, 21), 'conveyor-curve-left', 270);

	place(this, new Vector2d(24, 22), 'conveyor-straight', 90);
	place(this, new Vector2d(24, 23), 'conveyor-straight', 90);*/

	// 3. Setup Mouse Wheel Zoom
	this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
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
	});

}

function update() {
	// Game logic
}
