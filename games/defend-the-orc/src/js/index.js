import '../css/common.pcss';
import '../css/defend-the-orc.pcss';

import Phaser from 'phaser';
import Battleground from "./scenes/Battleground.js";

const config = {
	height: 600,
	input: {
		gamepad: true
	},
	parent: document.getElementById('battleground'),
	physics: {
		arcade: {
			debug: false,
			gravity: { y: 0 } // No gravity for top-down games
		},
		default: 'arcade'
	},
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.RESIZE,
		width: '100%',
		height: '100%',
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	type: Phaser.AUTO,
	width: 800
};

const game = new Phaser.Game(config);
game.scene.add('battleground', Battleground);
setTimeout(() => {
	const battleground = game.scene.getScene('battleground');
	battleground.scene.start();
}, 1);
