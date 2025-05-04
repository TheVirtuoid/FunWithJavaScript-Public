let database = [];
import CarData from './CarData.js';

export default class CarDb {
	constructor() {
		throw new Error('CarDb is a static class and cannot be instantiated');
	}

	static setDatabase(jsonDatabase) {
		database = JSON.parse(jsonDatabase);
	}

	static getAllCars() {
		return database.map((carData) => new CarData(carData));
	}

	static getCarById(id) {
		const carData = database.find((car) => car.id === id);
		return carData ? new CarData(carData) : undefined;
	}

	static getCarByName(name) {
		const carData = database.find((car) => car.name === name);
		return carData ? new CarData(carData) : undefined;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	static loadCar(carData) {
		if (carData.model === undefined) {
			carData.loadCar();
		}
	}
}