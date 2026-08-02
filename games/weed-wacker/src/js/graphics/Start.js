import Phaser from 'phaser';
import { weeds, weedTypes, levels } from './../../../weed-wacker.config.js';

export default class Start extends Phaser.Scene {

	constructor() {
		super({
			key: 'start'
		});
	}

	preload() {
		this.load.image('grass', '/src/img/grass.jpg');
		this.load.image('cutters', '/src/img/cutters.png');
		weeds.forEach((weed) => {
			this.load.image(weed.name, weed.image);
		});
		levels.forEach((levelData, key) => {
			this.load.image(levelData.graphic, `/src/img/${levelData.graphic}.png`);
		});
	}

	create() {
		const centerX = this.scale.width / 2;
		const centerY = this.scale.height / 2;
		this.add.tileSprite(centerX, centerY, this.scale.width, this.scale.height, 'grass');
		const text = this.add.text(centerX, centerY, 'WEED WACKER', { fontSize: '200px', fill: '#003300', fontFamily: '"Pixelify Sans"', fontStyle: 'bold' });
		text.setOrigin(0.5);
	}

	update(time, delta) {}

}