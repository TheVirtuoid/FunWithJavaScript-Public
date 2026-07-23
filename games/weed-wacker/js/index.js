import '../css/common.pcss';
import '../css/weed-wacker.pcss';

import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Yard from './../graphics/Yard.js';

const config = {
	// height: window.innerHeight,
	height: 600,
	input: {
		gamepad: true
	},
	parent: document.getElementById('yard'),
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
	// width: window.innerWidth
	width: 800
};

const game = new Phaser.Game(config);
game.scene.add('yard', Yard);
game.events.once('start', (sceneName) => {
	console.log('start');
	game.scene.start(sceneName);
})

WebFont.load({
	google: {
		families: ['Press Start 2P', 'Pixelify Sans']
	},
	active: function() {
		game.scene.start('yard');
	},
});

/*
const game = new Game();
const canvasSize = window.innerHeight * .9;
const config = {
	type: Phaser.AUTO,
	width: canvasSize,
	height: canvasSize,
	parent: 'pitch',
	scene: game
};
const phaserGame = new Phaser.Game(config);*/
