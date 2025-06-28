export default class GameData {
	static DATABASE_KEY = 'virtuoid-racing-game';

	constructor() {
		const data = this.#getGameData();
	}

	get page() {
		const data = this.#getGameData();
		return data.page;
	}

	get selectedCars() {
		const data = this.#getGameData();
		return data.selectedCars;
	}

	get selectedVenue() {
		const data = this.#getGameData();
		return data.selectedVenue;
	}

	set page(value) {
		const data = this.#getGameData();
		data.page = value;
		this.#saveGameData(data);
	}

	addSelectedCar(id) {
		const data = this.#getGameData();
		const selectedCars = data.selectedCars || [];
		if (!selectedCars.includes(id)) {
			selectedCars.push(id);
			data.selectedCars = selectedCars;
			this.#saveGameData(data);
		}
	}

	removeSelectedCar(id) {
		const data = this.#getGameData();
		const selectedCars = data.selectedCars || [];
		const index = selectedCars.indexOf(id);
		if (index !== -1) {
			selectedCars.splice(index, 1);
			data.selectedCars = selectedCars;
			this.#saveGameData(data);
		}
	}

	set selectedVenue(value) {
		const data = this.#getGameData();
		data.selectedVenue = value;
		this.#saveGameData(data);
	}


	#saveGameData(data) {
		try {
			localStorage.setItem(GameData.DATABASE_KEY, JSON.stringify(data));
		} catch (error) {
			console.error('Error saving game data:', error);
		}
	}

	#getGameData() {
		try {
			let data = localStorage.getItem(GameData.DATABASE_KEY);
			if (data) {
				return JSON.parse(data);
			}
			data = { page: 'index', selectedCars: [], selectedVenue: '' };
			this.#saveGameData(data);
			return data;
		} catch (error) {
			console.error('Error retrieving game data:', error);
			return {};
		}
	}
}