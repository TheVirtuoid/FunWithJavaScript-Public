import Car from "../../carbox/OldCarDesigns/Ferrari.js";
import CarDb from "../../src/classes/databases/CarDb/CarDb.js";
import {Color3, Vector3} from "@babylonjs/core";

export default class CarRenderer {
	#id;
	#scene;
	#cars;
	#renderedCars;
	#chassisToCars = new Map();
	#collisionBoxToCars = new Map();
	#startingPosition;

	#carParameters = [
		{ pos: new Vector3(-1.5, 1, 1), color: new Color3(0.8, 0, 0) },
		{ pos: new Vector3(1.5, 1, 1), color: new Color3(0, 0.8, 0) },
		{ pos: new Vector3(-1.5, -5.5, 4.5), color: new Color3(0, 0, 0.8) },
		{ pos: new Vector3(1.5, -5.5, 4.5), color: new Color3(0.8, 0.8, 0) }
	];


	constructor(args = {}) {
		const { id, scene } = args;
		this.#id = id;
		this.#scene = scene;
	}

	get id() {
		return this.#id;
	}

	get scene() {
		return this.#scene;
	}

	set scene(scene) {
		this.#scene = scene;
	}

	buildCars(cars, startingPosition) {
		this.#startingPosition = startingPosition;
		this.#cars = [];
		for(const carId of cars) {
			const carData = CarDb.getCarById(carId);
			this.#cars.push(carData);
		}
	}

	get renderedCars() {
		return this.#renderedCars;
	}

	getCarByChassis(chassis) {
		return this.#chassisToCars.get(chassis);
	}

	getCarByCollisionBox(collisionBox) {
		return this.#collisionBoxToCars.get(collisionBox);
	}

	async render(startingDirectionVector) {
		let group = 4;
		let index = 0;
		this.#renderedCars = [];
		// TODO: This is awful code, but I need it for the demo.
		if (startingDirectionVector.z === 0) {
			this.#carParameters = [
				{ pos: new Vector3(1, 1, -1.5), color: new Color3(0.8, 0, 0) },
				{ pos: new Vector3(1, 1, 1.5), color: new Color3(0, 0.8, 0) },
				{ pos: new Vector3(4.5, -5.5, -1.5), color: new Color3(0, 0, 0.8) },
				{ pos: new Vector3(4.5, -5.5, 1.5), color: new Color3(0.8, 0.8, 0) }
			];
		}
		for (const car of this.#cars) {
			const { name } = car;
			const { pos, color } = this.#carParameters[index++];
			pos.x += this.#startingPosition.x;
			pos.y += this.#startingPosition.y;
			pos.z += this.#startingPosition.z;
			const newCar = new Car({
				position: pos,
				scene: this.#scene,
				scale: 0.5,
				color,
				id: name,
				physicsGroup: group
			});
			await newCar.build();
			group *= 2;
			this.#renderedCars.push(newCar);
			this.#chassisToCars.set(newCar.chassis, car);
			this.#collisionBoxToCars.set(newCar.collisionBox, car);
		}
	}
}