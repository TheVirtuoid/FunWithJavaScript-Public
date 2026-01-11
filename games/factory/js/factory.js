import '../css/common.pcss';
import '../css/factory.pcss';

import Phaser from 'phaser';

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

const game = new Phaser.Game(config);

function preload() {
	// Load your 128x128 assets here
}

function create() {
	const unitSize = 64;
	const worldUnits = 50;
	const worldPx = unitSize * worldUnits;

	const zoomX = this.cameras.main.width / worldPx;
	const zoomY = this.cameras.main.height / worldPx;
	const minZoom = Math.max(zoomX, zoomY);

	// 1. Set the bounds of the world so the camera doesn't go into the void
	this.cameras.main.setBounds(0, 0, worldPx, worldPx);

	this.cameras.main.setZoom(minZoom);

	// 2. Setup mouse "drag to scroll"
	this.input.on('pointermove', (pointer) => {
		if (!pointer.isDown) return;

		// Move the camera based on mouse movement (inverted for natural scrolling)
		this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
		this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
	});

	// Optional: Add a simple grid to visualize the 199x199 layout
	const graphics = this.add.graphics();
	graphics.lineStyle(2, 0x00ff00, 0.5);
	for (let i = 0; i <= worldUnits; i++) {
		graphics.moveTo(i * unitSize, 0);
		graphics.lineTo(i * unitSize, worldPx);
		graphics.moveTo(0, i * unitSize);
		graphics.lineTo(worldPx, i * unitSize);
	}
	graphics.strokePath();

	this.input.on('pointermove', (pointer) => {
		if (!pointer.isDown) return;

		this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
		this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
	});

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