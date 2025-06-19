let json = [];
const idDatabase = new Map();
const nameDatabase = new Map();
import CarData from './CarData.js';

export default class CarDb {
	constructor() {
		throw new Error('CarDb is a static class and cannot be instantiated');
	}

	static setDatabase(jsonDatabase) {
		json = JSON.parse(jsonDatabase);
		json.forEach((car) => {
			const carData = new CarData(car);
			idDatabase.set(carData.id, carData);
			nameDatabase.set(carData.name, carData);
		});
	}

	static getAllCars() {
		return [...idDatabase.values()]
	}

	static getCarById(id) {
		return idDatabase.get(id);
	}

	static getCarByName(name) {
		return nameDatabase.get(name);
	}

	static loadCar(carData) {
		return carData.loadCar();
	}
}