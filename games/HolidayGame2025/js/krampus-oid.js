import '/css/krampus-oid.pcss';
import Phaser from 'phaser';
import WebFont from 'webfontloader';
import KrampusScene from "./classes/KrampusScene.js";


const multiplier = .90;
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
game.scene.add('krampus', KrampusScene);
game.events.once('start', (sceneName) => {
	game.scene.start(sceneName);
})

WebFont.load({
	google: {
		families: ['Tiny5', 'Press Start 2P']
	},
	active: function() {
		game.scene.start('krampus');
	},
});