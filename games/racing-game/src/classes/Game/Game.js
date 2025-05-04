import VenueDb from "../databases/VenueDb/VenueDb.js";
import CarDb from "../databases/CarDb/CarDb.js";
import Venue from "../Venue/Venue.js";
import Car from "../Car/Car.js";

export default class Game {
	#id;
	#venue;
	#ui;

	constructor(args = {}) {
		const {id = window?.crypto.randomUUID() || ''} = args;
		this.#id = id;
	}

	get id() {
		return this.#id;
	}

	get venue() {
		return this.#venue;
	}

	get ui() {
		return this.#ui;
	}

	getVenue(venueId) {
		const venueData = VenueDb.getVenueById(venueId);
		if (venueData) {
			this.#venue = new Venue(venueData);
			return this.venue;
		}
		return undefined;
	}

	getCar(carId) {
		const carData = CarDb.getCarById(carId);
		if (carData) {
			return new Car(carData);
		}
		return undefined;
	}

	getAllVenues() {
		const allVenuesData = VenueDb.getAllVenues();
		const allVenues = [];
		allVenuesData.forEach((venueData) => {
			if (venueData) {
				allVenues.push(new Venue(venueData));
			}
		});
		return allVenues;
	}

	getAllCars() {
		const allCarsData = CarDb.getAllCars();
		const allCars = [];
		allCarsData.forEach((carData) => {
			if (carData) {
				allCars.push(new Car(carData));
			}
		});
		return allCars;
	}

	setUi(ui) {
		this.#ui = ui;
		return this.ui;
	}
}