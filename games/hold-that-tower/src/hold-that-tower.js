import '/src/css/hold-that-tower.pcss';
import Phaser from 'phaser';
import WebFont from 'webfontloader';
import HoldThatTower from "./classes/Ui/HoldThatTower.js";

const multiplier = .98;
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth * multiplier,
	height: window.innerHeight * multiplier,
	parent: 'phaser-example',
	pixelArt: true,
	input: {
		gamepad: true
	},
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }, // No gravity for top-down games
			debug: false
		}
	},
	scene: HoldThatTower
};

let game;
WebFont.load({
	google: {
		families: ['Tiny5']
	},
	active: function() {
		game = new Phaser.Game(config);
	}
});
