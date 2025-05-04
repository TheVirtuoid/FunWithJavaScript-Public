import './css/racing-game.pcss';

const thisYear = new Date().getFullYear();
document.getElementById('last-year').textContent = thisYear;

const exitDialog = document.getElementById('exit-game-dialog');
const blankScreen = document.getElementById('blank-screen');
const selectCarsScreen = document.getElementById('select-cars-screen');

document.getElementById('button-exit').addEventListener('click', () => {
	exitDialog.showModal();
});

document.getElementById('button-new').addEventListener('click', () => {
	blankScreen.classList.add('hidden');
	selectCarsScreen.classList.remove('hidden');
});




























