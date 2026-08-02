import '../css/common.pcss';
import '../css/weed-wacker.pcss';

import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Yard from './graphics/Yard.js';
import LevelUp from "./graphics/LevelUp.js";
import Panel from "./engine/Panel.js";
import {TIME} from "../../weed-wacker.config.js";
import Start from "./graphics/Start.js";

let timeRemaining = 15000;

const config = {
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
	width: 800
};

/* click on new game */
const onSelectNewGame = () => {
	sceneStart.scene.stop();
	sceneLevelUp.scene.stop();
	panel.reset();
	sceneYard.newGame(panel.time);
}

/* click on level up */
const onSelectLevelUp = () => {
	sceneYard.scene.stop();
	sceneLevelUp.setInventory(panel.getWeedInventory());
	const panelValues = panel.getStatValues();
	panelValues.set(TIME, timeRemaining);
	sceneLevelUp.setValues(panelValues);
	sceneLevelUp.scene.start();
}

/* level up */
const onLevelUp = (data) => {
	const { key, value, cost } = data;
	if (key === TIME) {
		timeRemaining = Math.ceil(value);
	}
	panel.setStat(key, value);
	panel.removeWeeds(cost);
	sceneLevelUp.setInventory(panel.getWeedInventory());
	sceneLevelUp.setValues(panel.getStatValues());
	sceneLevelUp.events.emit('update-boxes', { key, value });
}

let sceneYard;
let sceneLevelUp;
let sceneStart;
const startGame = () => {
	sceneYard.setPanel(panel);
	panel.setScenes();
	sceneStart.scene.start();
}

const game = new Phaser.Game(config);
game.scene.add('yard', Yard);
game.scene.add('level-up', LevelUp);
game.scene.add('start', Start);
setTimeout(() => {
	sceneYard = game.scene.getScene('yard');
	sceneLevelUp = game.scene.getScene('level-up');
	sceneStart = game.scene.getScene('start');
}, 1);

game.events.on('change-weed-count', (index, value) => {
	panel.adjustWeed(index, value);
});

const panel = new Panel(game);

game.events.on('on-select-new-game', onSelectNewGame);
game.events.on('on-select-level-up', onSelectLevelUp);
game.events.on('on-level-up', onLevelUp);

WebFont.load({
	google: {
		families: ['Press Start 2P', 'Pixelify Sans']
	},
	active: function() {
		startGame();
	},
});
