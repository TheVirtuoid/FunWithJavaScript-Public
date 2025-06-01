import {setButton, setButtons} from "../buttons.js";

const cars = [
	{id: 1, name: 'Car 1'},
	{id: 2, name: 'Car 2'},
	{id: 3, name: 'Car 3'},
	{id: 4, name: 'Car 4'},
	{id: 5, name: 'Car 5'},
	{id: 6, name: 'Car 6'},
	{id: 7, name: 'Car 7'},
	{id: 8, name: 'Car 8'}
]

export default class SelectCars {
	#selectionList;
	#selectedList;
	#maximumNumberMessage

	#buttonSelect;
	#buttonUnselect;

	#carsToBeSelected = [];
	#carsToBeUnselected = [];

	constructor() {
		this.#selectionList = document.querySelector('#car-selection-list ul');
		this.#selectedList = document.querySelector('#car-selected-list ul');
		this.#maximumNumberMessage = document.querySelector('#maximum-number-message');

		this.#buttonSelect = document.querySelector('#button-select-car');
		this.#buttonUnselect = document.querySelector('#button-unselect-car');

		this.#buttonSelect.addEventListener('click', this.#select.bind(this));
		this.#buttonUnselect.addEventListener('click', this.#unselect.bind(this));
		this.#selectionList.addEventListener('click', this.#onCarSelect.bind(this));
		this.#selectedList.addEventListener('click', this.#onCarSelected.bind(this));

		this.#buttonSelect.disabled = true;
		this.#buttonUnselect.disabled = true;

		this.#populateSelectionList();
		setButtons(['back', 'exit']);

		this.#carsToBeSelected = [];
		this.#carsToBeUnselected = [];
	}

	#populateSelectionList() {
		this.#selectionList.replaceChildren();
		cars.forEach(car => {
			const button = document.createElement('button');
			button.textContent = car.name;
			const li = document.createElement('li');
			li.dataset.carId = car.id;
			li.appendChild(button);
			this.#selectionList.appendChild(li);
		});
	}

	#select() {
		for (const li of this.#carsToBeSelected) {
			li.classList.remove('selected');
			this.#selectedList.appendChild(li);
		}
		this.#carsToBeSelected = [];
		this.#buttonSelect.disabled = true;
		const numberCarsSelected = this.#selectedList.querySelectorAll('li').length;
		if (numberCarsSelected >= 4) {
			this.#maximumNumberMessage.classList.remove('hidden');
		} else if (numberCarsSelected >= 2) {
			setButton('selectVenue', true);
			this.#maximumNumberMessage.classList.add('hidden');
		} else {
			this.#maximumNumberMessage.classList.add('hidden');
		}
	}

	#unselect() {
		for (const li of this.#carsToBeUnselected) {
			li.classList.remove('selected');
			this.#selectionList.appendChild(li);
		}
		this.#carsToBeUnselected = [];
		this.#buttonUnselect.disabled = true;
		this.#maximumNumberMessage.classList.add('hidden');
	}

	#onCarSelect(event) {
		if (event.target.tagName !== 'BUTTON') {
			return;
		}
		if (this.#selectedList.querySelectorAll('li').length < 4) {
			const button = event.target;
			const li = button.closest('li');
			li.classList.add('selected');
			this.#buttonSelect.disabled = false;
			this.#carsToBeSelected.push(li);
		}
	}

	#onCarSelected(event) {
		if (event.target.tagName !== 'BUTTON') {
			return;
		}
		const button = event.target;
		const li = button.closest('li');
		li.classList.add('selected');
		this.#buttonUnselect.disabled = false;
		this.#carsToBeUnselected.push(li);
	}

}