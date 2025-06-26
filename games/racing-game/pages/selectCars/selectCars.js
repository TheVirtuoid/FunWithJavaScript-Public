import {setButton, setButtons} from "../buttons.js";
import cars from './../../databases/cars.json';
import CarDb from "../../src/classes/databases/CarDb/CarDb.js";
import GameData from "../../src/classes/databases/GameData/GameData.js";

export default class SelectCars {
	#selectionList;
	#selectedList;
	#maximumNumberMessage

	#buttonSelect;
	#buttonUnselect;

	#carsToBeSelected = [];
	#carsToBeUnselected = [];

	#gameData;

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

		this.#gameData = new GameData();

		CarDb.setDatabase(JSON.stringify(cars));
		this.#populateSelectionList();
		setButtons(['back', 'exit']);

		this.#carsToBeSelected = [];
		this.#carsToBeUnselected = [];

	}

	#populateSelectionList() {
		this.#selectionList.replaceChildren();
		const carPromises = [];
		const cars = CarDb.getAllCars();
		cars.forEach((car) => {
			carPromises.push(car.loadCar());
		});
		Promise.all(carPromises)
			.then(() => {
				cars.forEach(car => {
					const button = document.createElement('button');
					const span = document.createElement('span');
					span.textContent = car.name;
					button.classList.add('invisible');
					button.appendChild(car.thumbnail);
					button.appendChild(span);
					const li = document.createElement('li');
					li.dataset.carId = car.id;
					li.appendChild(button);
					if (this.#gameData.selectedCars.includes(car.id)) {
						this.#selectedList.appendChild(li);
					} else {
						this.#selectionList.appendChild(li);
					}
				});
				this.#setLimits();
			})
			.catch((err) => {
				console.log('ERROR:', err);
			});


	}

	#select() {
		for (const li of this.#carsToBeSelected) {
			li.classList.remove('selected');
			this.#selectedList.appendChild(li);
			const carId = li.dataset.carId;
			this.#gameData.addSelectedCar(carId);
		}
		this.#carsToBeSelected = [];
		this.#buttonSelect.disabled = true;
		this.#setLimits();
	}

	#unselect() {
		for (const li of this.#carsToBeUnselected) {
			li.classList.remove('selected');
			this.#selectionList.appendChild(li);
			const carId = li.dataset.carId;
			this.#gameData.removeSelectedCar(carId);
		}
		this.#carsToBeUnselected = [];
		this.#buttonUnselect.disabled = true;
		this.#maximumNumberMessage.classList.add('hidden');
	}

	#onCarSelect(event) {
		if (this.#selectedList.querySelectorAll('li').length < 4) {
			const button = event.target;
			const li = button.closest('li');
			li.classList.add('selected');
			this.#buttonSelect.disabled = false;
			this.#carsToBeSelected.push(li);
		}
	}

	#onCarSelected(event) {
		const button = event.target;
		const li = button.closest('li');
		li.classList.add('selected');
		this.#buttonUnselect.disabled = false;
		this.#carsToBeUnselected.push(li);
	}

	#setLimits() {
		const numberCarsSelected = this.#selectedList.querySelectorAll('li').length;
		console.log(numberCarsSelected);
		if (numberCarsSelected >= 4) {
			this.#maximumNumberMessage.classList.remove('hidden');
		}
		if (numberCarsSelected >= 2 && numberCarsSelected <= 4) {
			setButton('selectVenue', true);
			this.#maximumNumberMessage.classList.add('hidden');
		} else {
			this.#maximumNumberMessage.classList.add('hidden');
		}
	}
}