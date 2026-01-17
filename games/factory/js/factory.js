import '../css/common.pcss';
import '../css/factory.pcss';

import Phaser from 'phaser';
import Vector2d from "./Vector/Vector2d/Vector2d.js";

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

let conveyorCurveLeft;
let conveyorCurveRight;
let conveyorStraight;
let conveyorTIntersectionLeft;
let conveyorTIntersectionRight;
let conveyorXIntersection;
let distributionCenter;

let combinatorAetherite;
let combinatorLiminite;
let combinatorObsidianite;
let combinatorPyrotite;
let combinatorZenithite;
let extractorAetherite;
let extractorLiminite;
let extractorObsidianite;
let extractorPyrotite;
let extractorZenithite;
let purifierAetherite;
let purifierLiminite;
let purifierObsidianite;
let purifierPyrotite;
let purifierZenithite;


function preload() {
	conveyorStraight = this.load.image('conveyor-straight', 'img/conveyor-straight.png');
	conveyorCurveLeft = this.load.image('conveyor-curve-left', 'img/conveyor-curve-left.png');
	conveyorCurveRight = this.load.image('conveyor-curve-right', 'img/conveyor-curve-right.png');
	conveyorTIntersectionLeft = this.load.image('conveyor-t-intersection-left', 'img/conveyor-t-intersection-left.png');
	conveyorTIntersectionRight = this.load.image('conveyor-t-intersection-right', 'img/conveyor-t-intersection-right.png');
	conveyorXIntersection = this.load.image('conveyor-x-intersection', 'img/conveyor-x-intersection.png');
	distributionCenter = this.load.image('distribution-center', 'img/distribution-center.png');
	combinatorAetherite = this.load.image('combinator-aetherite', 'img/combinator-aetherite.png');
	combinatorLiminite = this.load.image('combinator-luminite', 'img/combinator-luminite.png');
	combinatorObsidianite = this.load.image('combinator-obsidianite', 'img/combinator-obsidianite.png');
	combinatorPyrotite = this.load.image('combinator-pyrotite', 'img/combinator-pyrotite.png');
	combinatorZenithite = this.load.image('combinator-zenithite', 'img/combinator-zenithite.png');
	extractorAetherite = this.load.image('extractor-aetherite', 'img/extractor-aetherite.png');
	extractorLiminite = this.load.image('extractor-luminite', 'img/extractor-luminite.png');
	extractorObsidianite = this.load.image('extractor-obsidianite', 'img/extractor-obsidianite.png');
	extractorPyrotite = this.load.image('extractor-pyrotite', 'img/extractor-pyrotite.png');
	extractorZenithite = this.load.image('extractor-zenithite', 'img/extractor-zenithite.png');
	purifierAetherite = this.load.image('purifier-aetherite', 'img/purifier-aetherite.png');
	purifierLiminite = this.load.image('purifier-luminite', 'img/purifier-luminite.png');
	purifierObsidianite = this.load.image('purifier-obsidianite', 'img/purifier-obsidianite.png');
	purifierPyrotite = this.load.image('purifier-pyrotite', 'img/purifier-pyrotite.png');
	purifierZenithite = this.load.image('purifier-zenithite', 'img/purifier-zenithite.png');
}

function create() {
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

	const centerX = worldPx / 2;
	const centerY = worldPx / 2;
	this.add.image(centerX - 64, centerY - 64, 'distribution-center');


	place(this, new Vector2d(10, 10), 'conveyor-curve-left');
	place(this, new Vector2d(11, 10), 'conveyor-curve-right');
	place(this, new Vector2d(12, 10), 'conveyor-straight');
	place(this, new Vector2d(13, 10), 'conveyor-t-intersection-left');
	place(this, new Vector2d(14, 10), 'conveyor-t-intersection-right');
	place(this, new Vector2d(15, 10), 'conveyor-x-intersection');

	place(this, new Vector2d(16, 10), 'conveyor-curve-left', 270);
	place(this, new Vector2d(16, 11), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 12), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 13), 'conveyor-straight', 90);
	place(this, new Vector2d(16, 14), 'conveyor-straight', 90);

	place(this, new Vector2d(16, 15), 'conveyor-t-intersection-right', 90);

	place(this, new Vector2d(15, 11), 'conveyor-straight', 90);
	place(this, new Vector2d(15, 12), 'conveyor-straight', 90);
	place(this, new Vector2d(15, 13), 'conveyor-straight', 90);
	place(this, new Vector2d(15, 14), 'conveyor-straight', 90);
	place(this, new Vector2d(15, 15), 'conveyor-curve-right', 90);

	place(this, new Vector2d(15, 20), 'combinator-aetherite');
	place(this, new Vector2d(15, 22), 'combinator-luminite');
	place(this, new Vector2d(15, 24), 'combinator-obsidianite');
	place(this, new Vector2d(15, 26), 'combinator-pyrotite');
	place(this, new Vector2d(15, 28), 'combinator-zenithite');
	place(this, new Vector2d(17, 20), 'extractor-aetherite');
	place(this, new Vector2d(17, 22), 'extractor-luminite');
	place(this, new Vector2d(17, 24), 'extractor-obsidianite');
	place(this, new Vector2d(17, 26), 'extractor-pyrotite');
	place(this, new Vector2d(17, 28), 'extractor-zenithite');
	place(this, new Vector2d(19, 20), 'purifier-aetherite');
	place(this, new Vector2d(19, 22), 'purifier-luminite');
	place(this, new Vector2d(19, 24), 'purifier-obsidianite');
	place(this, new Vector2d(19, 26), 'purifier-pyrotite');
	place(this, new Vector2d(19, 28), 'purifier-zenithite');





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
