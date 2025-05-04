import Game from "../../src/classes/Game/Game.js";
import Venue from "../../src/classes/Venue/Venue.js";
import Car from "../../src/classes/Car/Car.js";
import Ui from "../../src/classes/Ui/Ui.js";
import Model from "../../src/classes/databases/Model/Model.js";
import VenueDb from "../../src/classes/databases/VenueDb/VenueDb.js";

import venueData from '../support/venue-data.json';
import modelData from '../support/model-data.json';
import carData from '../support/car-data.json';
import CarDb from "../../src/classes/databases/CarDb/CarDb.js";

Model.setDatabase(JSON.stringify(modelData));
VenueDb.setDatabase(JSON.stringify(venueData));
CarDb.setDatabase(JSON.stringify(carData));

describe('When I work with the Game class', () => {
	it('should instantiate the class', () => {
		const game = new Game();
		expect(game).to.be.instanceOf(Game);
	});

	describe('And when I work with the properties', () => {
		let game;
		const id = 'test';
		beforeEach(() => {
			game = new Game({ id });
		});

		it('should have a id property', () => {
			expect(game.id).to.equal(id);
		});

		it('should have a venue property', () => {
			expect('venue' in game).to.be.true;
		});

		it('should have a ui property', () => {
			expect('ui' in game).to.be.true;
		});
	});

	describe('And when I work with the methods', () => {
		let game;
		beforeEach(() => {
			game = new Game({ id: 'test' });
		});

		it('getVenue() should return the venue by venueId', () => {
			const venue = game.getVenue('venue-one');
			expect(venue).to.be.instanceOf(Venue);
			expect(game.venue).to.equal(venue);
		});

		it('getVenue() should return undefined if the venue id is not found', () => {
			const venue = game.getVenue('bad');
			expect(venue).to.be.undefined;
			expect(game.venue).to.be.undefined;
		});

		it('getCar() should return the car by carId', () => {
			const car = game.getCar('car-one');
			expect(car).to.be.instanceOf(Car);
		});

		it('getCar() should return undefined if the car id is not found', () => {
			const car = game.getCar('bad');
			expect(car).to.be.undefined;
		});

		it('getAllVenues() should return all venues', () => {
			const allVenues = game.getAllVenues();
			expect(allVenues).to.have.length(venueData.length);
			allVenues.forEach((venue) => {
				expect(venue).to.be.instanceOf(Venue);
			});
		});

		it('getAllCars() should return all cars', () => {
			const allCars = game.getAllCars();
			expect(allCars).to.have.length(modelData.length);
			allCars.forEach((car) => {
				expect(car).to.be.instanceOf(Car);
			});
		});

		it('should set the UI', () => {
			const ui = game.setUi(new Ui());
			expect(ui).to.be.instanceof(Ui);
			expect(game.ui).to.equal(ui);
		});
	});
});