import '../css/common.pcss';
import '../css/weed-wacker.pcss';

import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Yard from './graphics/Yard.js';
// import Stats from './engine/Stats.js';

// import { weeds as weedsConfig } from './../../weed-wacker.config.js';
import LevelUp from "./graphics/LevelUp.js";
import Panel from "./engine/Panel.js";

// const weeds = weedsConfig.map((weed) => ({ ...weed, count: 0 }));

let timeRemaining = 15000;

/*
const weedList = document.querySelector('.weeds ul');
weeds.forEach((weed) => {
	weedList.insertAdjacentHTML('beforeend', `<li><span><img src="${weed.image}" /></span><span data-name="${weed.name}">${weed.count}</span></li>`);
});
*/
/*const statsList = document.querySelector('.stats ul');
Stats.FIELDS.forEach((field) => {
	statsList.insertAdjacentHTML('beforeend', `<li class="${field.tag}"><span>${field.name}</span><span data-stat="${field.tag}">0</span></li>`);
});*/
/*weedList.addEventListener('change-weed-count', (event) => {
	const { index, value } = event.detail;
	weeds[index].count += value;
	weedList.querySelector(`[data-name="${weeds[index].name}"]`).textContent = weeds[index].count;
});*/

// const stats = new Stats();

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

let sceneYard;
let sceneLevelUp;
const startGame = () => {
	sceneYard.setPanel(panel);
	panel.setScenes();
	/*document.getElementById('new-game').addEventListener('click', () => {
		sceneLevelUp.scene.stop();
		sceneYard.setStats(stats);
		sceneYard.newGame(timeRemaining);
		// game.scene.start(scene);
	});
	document.getElementById('continue').addEventListener('click', () => {
		sceneLevelUp.scene.stop();
		sceneYard.continue(timeRemaining);
	});
	document.getElementById('level-up').addEventListener('click', () => {
		sceneYard.scene.stop();
		sceneLevelUp.setInvetory(weeds.map((weed) => weed.count));
		game.scene.start('level-up');
	});*/
}

const game = new Phaser.Game(config);
game.scene.add('yard', Yard);
game.scene.add('level-up', LevelUp);
setTimeout(() => {
	sceneYard = game.scene.getScene('yard');
	sceneLevelUp = game.scene.getScene('level-up');
}, 1);
game.events.on('level-up', (data) => {
	const { field, value, cost } = data;
	if (field === 'time') {
		timeRemaining = Math.floor(value) * 1000;
		panel.setTime(timeRemaining);
		panel.removeWeeds(cost);
		console.log(timeRemaining, cost);
	}
	sceneLevelUp.events.emit('got-level-data', data);
});
game.events.on('change-weed-count', (index, value) => {
	panel.adjustWeed(index, value);
});

const panel = new Panel(game);

WebFont.load({
	google: {
		families: ['Press Start 2P', 'Pixelify Sans']
	},
	active: function() {
		startGame();
	},
});
