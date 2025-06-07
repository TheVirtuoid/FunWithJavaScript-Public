import './css/racing-game.pcss';
import indexTemplate from '/pages/index/index.html?raw';
import indexCode from './../pages/index/index.js';

import selectCarsTemplate from '/pages/selectCars/selectCars.html?raw';
import selectCarsCode from './../pages/selectCars/selectCars.js';

import selectVenueTemplate from '/pages/selectVenue/selectVenue.html?raw';
import selectVenueCode from './../pages/selectVenue/selectVenue.js';

import raceTemplate from '/pages/race/race.html?raw';
import raceCode from './../pages/race/race.js';

import exitDialogTemplate from '/pages/exitDialog/exitDialog.html?raw';
import ExitDialog from './../pages/exitDialog/exitDialog.js';

import GameData from './classes/databases/GameData/GameData.js'
import Router from './classes/Router/Router.js';

const thisYear = new Date().getFullYear();
document.getElementById('last-year').textContent = thisYear;

const routes = new Map([
	['index', { template: indexTemplate, code: indexCode }],
	['selectCars', { template: selectCarsTemplate, code: selectCarsCode }],
	['selectVenue', { template: selectVenueTemplate, code: selectVenueCode }],
	['race', { template: raceTemplate, code: raceCode }],
]);

const gameData = new GameData();
const router = new Router(routes, 'main');


// initialize dialogs
const dialogs = document.getElementById('dialogs');
dialogs.replaceChildren();
const dialogTemplate = document.createElement('template');
dialogTemplate.innerHTML = exitDialogTemplate;
dialogs.appendChild(dialogTemplate.content.cloneNode(true));
new ExitDialog('button-exit', router);

// load in the page
router.routeTo(gameData.page);

document.getElementById('button-select-cars').addEventListener('click', () => {
	gameData.page = 'selectCars';
	router.routeTo(gameData.page);
});

document.getElementById('button-select-venue').addEventListener('click', () => {
	gameData.page = 'selectVenue';
	router.routeTo(gameData.page);
});

document.getElementById('button-race').addEventListener('click', () => {
	gameData.page = 'race';
	router.routeTo(gameData.page);
});

document.getElementById('button-back').addEventListener('click', () => {
	if (gameData.page === 'race') {
		gameData.page = 'selectVenue';
	} else if (gameData.page === 'selectVenue') {
		gameData.page = 'selectCars';
	} else if (gameData.page === 'selectCars') {
		gameData.page = 'index';
	} else {
		gameData.page = 'index';
	}
	router.routeTo(gameData.page);
});


























