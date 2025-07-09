import '/src/css/hold-that-tower.pcss';
import Phaser from 'phaser';
import WebFont from 'webfontloader';
import BeginningScene from "./classes/scenes/Beginning.js";
import GamePlayScene from "./classes/scenes/GamePlay.js";

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
	}
};

const game = new Phaser.Game(config);
game.scene.add('beginning-scene', BeginningScene);
game.scene.add('game-play-scene', GamePlayScene);
game.events.once('start', (sceneName) => {
	game.scene.start(sceneName);
})

WebFont.load({
	google: {
		families: ['Tiny5']
	},
	active: function() {
		// game.scene.start('beginning-scene');
		game.scene.start('game-play-scene');
	}
});

