import GameData from "../../../src/classes/databases/GameData/GameData.js";

describe('When I work with the game data in localStorage', () => {
	beforeEach(() => {
		// Create an object to hold our mock data
		const mockLocalStorage = {};

		// Stub localStorage methods
		cy.window().then((win) => {
			cy.stub(win.localStorage, 'getItem').callsFake((key) => {
				return mockLocalStorage[key] || null;
			});

			cy.stub(win.localStorage, 'setItem').callsFake((key, value) => {
				mockLocalStorage[key] = value;
			});

			cy.stub(win.localStorage, 'removeItem').callsFake((key) => {
				delete mockLocalStorage[key];
			});

			cy.stub(win.localStorage, 'clear').callsFake(() => {
				Object.keys(mockLocalStorage).forEach(key => {
					delete mockLocalStorage[key];
				});
			});
		});
	});

	it('should initialize the game data object when no data is there', () => {
		window.localStorage.removeItem(GameData.DATABASE_KEY);
		const gameData = new GameData();
		expect(gameData.page).to.equal('index');
		expect(gameData.selectedCar).to.be.false;
		expect(gameData.selectedVenue).to.be.false;
	});

	it('should initialize the game data object if some data was already there', () => {
		window.localStorage.removeItem(GameData.DATABASE_KEY);
		const data = {page: 'racing', selectedCar: 'car1', selectedVenue: 'venue1'};
		window.localStorage.setItem(GameData.DATABASE_KEY, JSON.stringify(data));
		const gameData = new GameData();
		expect(gameData.page).to.equal('racing');
		expect(gameData.selectedCar).to.equal('car1');
		expect(gameData.selectedVenue).to.equal('venue1');
	});

	describe('And when I change the values', () => {
		it('should update page', () => {
			const gameData = new GameData();
			gameData.page = 'newPage';
			expect(gameData.page).to.equal('newPage');
			const storedData = JSON.parse(window.localStorage.getItem(GameData.DATABASE_KEY));
			expect(storedData.page).to.equal('newPage');
		});

		it('should update selectedCar', () => {
			const gameData = new GameData();
			gameData.selectedCar = 'car2';
			expect(gameData.selectedCar).to.equal('car2');
			const storedData = JSON.parse(window.localStorage.getItem(GameData.DATABASE_KEY));
			expect(storedData.selectedCar).to.equal('car2');
		});

		it('should update selectedVenue', () => {
			const gameData = new GameData();
			gameData.selectedVenue = 'venue2';
			expect(gameData.selectedVenue).to.equal('venue2');
			const storedData = JSON.parse(window.localStorage.getItem(GameData.DATABASE_KEY));
			expect(storedData.selectedVenue).to.equal('venue2');
		});
	});



});