import './css/racing-game.pcss';
import indexTemplate from '/pages/index/index.html?raw';
import indexCode from './../pages/index/index.js';

import exitDialogTemplate from '/pages/exitDialog/exitDialog.html?raw';
import ExitDialog from './../pages/exitDialog/exitDialog.js';

import GameData from './classes/databases/GameData/GameData.js'

const thisYear = new Date().getFullYear();
document.getElementById('last-year').textContent = thisYear;

const gameData = new GameData();

const router = new Map([
	['index', {
		template: indexTemplate,
		code: indexCode
	}]
]);

// initialize dialogs
const dialogs = document.getElementById('dialogs');
dialogs.replaceChildren();
const dialogTemplate = document.createElement('template');
dialogTemplate.innerHTML = exitDialogTemplate;
dialogs.appendChild(dialogTemplate.content.cloneNode(true));
new ExitDialog('button-exit');

// load in the page
const route = router.get(gameData.page);
const pageTemplate = route.template;
const pageCode = route.code;

const template = document.createElement('template');
template.innerHTML = pageTemplate;
document.querySelector('main').replaceChildren();
document.querySelector('main').appendChild(template.content.cloneNode(true));

new pageCode();
/* Dialogs */
// const exitDialog = document.getElementById('exit-game-dialog');

/* Screens */
/*const beginScreen = document.getElementById('begin-screen');
const selectCarsScreen = document.getElementById('select-cars-screen');
const selectVenueScreen = document.getElementById('select-venue-screen');
const venueScreen = document.getElementById('venue-screen');
const screens = new Map([
	['begin-screen', beginScreen],
	['select-cars-screen', selectCarsScreen],
	['select-venue-screen', selectVenueScreen],
	['venue-screen', venueScreen]
]);*/

/*const selectScreen = (screenName) => {
	screens.forEach((screen, index) => {
		if (screenName === index) {
			screen.classList.remove('hidden');
		} else {
			screen.classList.add('hidden');
		}
	});
}*/


/*document.getElementById('button-exit').addEventListener('click', () => {
	exitDialog.showModal();
	document.getElementById('exit-game-dialog-button-yes').addEventListener('click',() => {
		exitDialog.close();
		selectScreen('begin-screen');
	}, { once: true });
	document.getElementById('exit-game-dialog-button-no').addEventListener('click',() => {
		exitDialog.close();
	}, { once: true });
});*/

/*document.getElementById('button-select-cars').addEventListener('click', () => {
	beginScreen.classList.add('hidden');
	selectCarsScreen.classList.remove('hidden');
});*/




























