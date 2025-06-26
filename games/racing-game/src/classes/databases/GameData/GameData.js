export default class GameData {
	static DATABASE_KEY = 'virtuoid-racing-game';

	#page;
	#selectedCars;
	#selectedVenue;

	constructor() {
		const gameData = this.#getGameData();
		this.#setGameData(gameData);
	}

	get page() {
		return this.#page;
	}

	get selectedCars() {
		return this.#selectedCars;
	}

	get selectedVenue() {
		return this.#selectedVenue;
	}

	set page(value) {
		const gameData = this.#buildGameData();
		gameData.page = value;
		this.#setGameData(gameData);
		this.#saveGameData();
	}

	addSelectedCar(id) {
		const gameData = this.#buildGameData();
		if (!gameData.selectedCars.includes(id)) {
			gameData.selectedCars.push(id);
			this.#setGameData(gameData);
			this.#saveGameData();
		}
	}

	removeSelectedCar(id) {
		const gameData = this.#buildGameData();
		const index = gameData.selectedCars.indexOf(id);
		if (index !== -1) {
			gameData.selectedCars.splice(index, 1);
			this.#setGameData(gameData);
			this.#saveGameData();
		}
	}

	set selectedVenue(value) {
		const gameData = this.#buildGameData();
		gameData.selectedVenue = value;
		this.#setGameData(gameData);
		this.#saveGameData();
	}

	#buildGameData() {
		return {
			page: this.#page  ?? '',
			selectedCars: this.#selectedCars ?? [],
			selectedVenue: this.#selectedVenue ?? ''
		};
	}

	#setGameData(data) {
		this.#page = data.page ?? 'index';
		this.#selectedCars = data.selectedCars ?? [];
		this.#selectedVenue = data.selectedVenue ?? '';
	}

	#saveGameData() {
		try {
			localStorage.setItem(GameData.DATABASE_KEY, JSON.stringify(this.#buildGameData()));
		} catch (error) {
			console.error('Error saving game data:', error);
		}
	}

	#getGameData() {
		try {
			const data = localStorage.getItem(GameData.DATABASE_KEY);
			return data ? JSON.parse(data) : {};
		} catch (error) {
			console.error('Error retrieving game data:', error);
			return {};
		}
	}
}