import './css/racing-game.pcss';
import indexTemplate from '/pages/index/index.html?raw';
import indexCode from './../pages/index/index.js';

import selectCarsTemplate from '/pages/selectCars/selectCars.html?raw';
import selectCarsCode from './../pages/selectCars/selectCars.js';

import exitDialogTemplate from '/pages/exitDialog/exitDialog.html?raw';
import ExitDialog from './../pages/exitDialog/exitDialog.js';

import GameData from './classes/databases/GameData/GameData.js'
import Router from './classes/Router/Router.js';

const thisYear = new Date().getFullYear();
document.getElementById('last-year').textContent = thisYear;

const routes = new Map([
	['index', { template: indexTemplate, code: indexCode }],
	['selectCars', { template: selectCarsTemplate, code: selectCarsCode }]
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
/*const route = router.get(gameData.page);
const pageTemplate = route.template;
const pageCode = route.code;*/

/*
const template = document.createElement('template');
template.innerHTML = pageTemplate;
document.querySelector('main').replaceChildren();
document.querySelector('main').appendChild(template.content.cloneNode(true));

new pageCode();
*/

document.getElementById('button-select-cars').addEventListener('click', () => {
	gameData.page = 'selectCars';
	router.routeTo(gameData.page);
});


/*
function routeTo(page) {
	const route = router.get(gameData.page);
	const pageTemplate = route.template;
	const pageCode = route.code;
	const template = document.createElement('template');
	template.innerHTML = pageTemplate;
	document.querySelector('main').replaceChildren();
	document.querySelector('main').appendChild(template.content.cloneNode(true));
	new pageCode();
}
*/




























