export default class GameData {
	static DATABASE_KEY = 'virtuoid-racing-game';

	#page;
	#selectedCar;
	#selectedVenue;

	constructor() {
		const gameData = this.#getGameData();
		this.#setGameData(gameData);
	}

	get page() {
		return this.#page;
	}

	get selectedCar() {
		return this.#selectedCar;
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

	set selectedCar(value) {
		const gameData = this.#buildGameData();
		gameData.selectedCar = value;
		this.#setGameData(gameData);
		this.#saveGameData();
	}

	set selectedVenue(value) {
		const gameData = this.#buildGameData();
		gameData.selectedVenue = value;
		this.#setGameData(gameData);
		this.#saveGameData();
	}

	#buildGameData() {
		return {
			page: this.#page,
			selectedCar: this.#selectedCar,
			selectedVenue: this.#selectedVenue
		};
	}

	#setGameData(data) {
		this.#page = data.page ?? 'index';
		this.#selectedCar = data.selectedCar ?? false;
		this.#selectedVenue = data.selectedVenue ?? false;
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