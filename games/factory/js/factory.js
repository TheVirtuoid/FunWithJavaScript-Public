import '../css/common.pcss';
import '../css/factory.pcss';

import Phaser from 'phaser';
import Game from "./Game/Game.js";

const game = new Game();
const canvasSize = window.innerHeight * .9;
const config = {
	type: Phaser.AUTO,
	width: canvasSize,
	height: canvasSize,
	parent: 'pitch',
	scene: game
};
const phaserGame = new Phaser.Game(config);

