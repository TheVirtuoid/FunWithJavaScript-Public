// TODO: This is AWFUL CODE. Fix.
const setButtons = (active) => {
	const buttons = new Map([
		['back', document.querySelector('#button-back')],
		['exit', document.querySelector('#button-exit')],
		['selectVenue', document.querySelector('#button-select-venue')],
		['selectCars', document.querySelector('#button-select-cars')],
		['race', document.querySelector('#button-race')],
		['pause', document.querySelector('#button-pause')],
		['resume', document.querySelector('#button-resume')]
	]);
	buttons.forEach((buttonElement, buttonName) => {
		if (active.includes(buttonName)) {
			buttonElement.classList.remove('hidden');
		} else {
			buttonElement.classList.add('hidden');
		}
	});
}

const setButton = (buttonName, active) => {
	const buttons = new Map([
		['back', document.querySelector('#button-back')],
		['exit', document.querySelector('#button-exit')],
		['selectVenue', document.querySelector('#button-select-venue')],
		['selectCars', document.querySelector('#button-select-cars')],
		['race', document.querySelector('#button-race')],
		['pause', document.querySelector('#button-pause')],
		['resume', document.querySelector('#button-resume')]
	]);
	const buttonElement = buttons.get(buttonName);
	if (buttonElement) {
		if (active) {
			buttonElement.classList.remove('hidden');
		} else {
			buttonElement.classList.add('hidden');
		}
	}
}

export { setButtons, setButton };