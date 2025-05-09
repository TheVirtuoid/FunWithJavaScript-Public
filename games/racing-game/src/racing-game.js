import './css/racing-game.pcss';

const thisYear = new Date().getFullYear();
document.getElementById('last-year').textContent = thisYear;


/* Dialogs */
const exitDialog = document.getElementById('exit-game-dialog');

/* Screens */
const beginScreen = document.getElementById('begin-screen');
const selectCarsScreen = document.getElementById('select-cars-screen');
const selectVenueScreen = document.getElementById('select-venue-screen');
const venueScreen = document.getElementById('venue-screen');
const screens = new Map([
	['begin-screen', beginScreen],
	['select-cars-screen', selectCarsScreen],
	['select-venue-screen', selectVenueScreen],
	['venue-screen', venueScreen]
]);

const selectScreen = (screenName) => {
	screens.forEach((screen, index) => {
		if (screenName === index) {
			screen.classList.remove('hidden');
		} else {
			screen.classList.add('hidden');
		}
	});
}


document.getElementById('button-exit').addEventListener('click', () => {
	exitDialog.showModal();
	document.getElementById('exit-game-dialog-button-yes').addEventListener('click',() => {
		exitDialog.close();
		selectScreen('begin-screen');
	}, { once: true });
	document.getElementById('exit-game-dialog-button-no').addEventListener('click',() => {
		exitDialog.close();
	}, { once: true });
});

document.getElementById('button-select-cars').addEventListener('click', () => {
	beginScreen.classList.add('hidden');
	selectCarsScreen.classList.remove('hidden');
});




























