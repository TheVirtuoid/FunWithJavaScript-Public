import Car1 from "../../carbox/OldCarDesigns/Ferrari.js";
import Car2 from '../../carbox/OldCarDesigns/LowPoly1.js';
import Car3 from '../../carbox/OldCarDesigns/LowPoly2.js';
// import Car4 from '../../carbox/OldCarDesigns/Camero.js';
// import Car4 from '../../carbox/OldCarDesigns/DodgeCharger.js';
import Car4 from '../../carbox/OldCarDesigns/PolyCar.js';
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
		// TODO: find some way to associate the car with the instance.
		this.#cars[0].instance = Car1;
		this.#cars[1].instance = Car2;
		this.#cars[2].instance = Car3;
		this.#cars[3].instance = Car4;
		this.#cars[0].scale = 1;
		this.#cars[1].scale = 1;
		this.#cars[2].scale = 1;
		this.#cars[3].scale = 1;
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
			const { name, instance, scale } = car;
			const { pos, color } = this.#carParameters[index++];
			pos.x += this.#startingPosition.x;
			pos.y += this.#startingPosition.y;
			pos.z += this.#startingPosition.z;
			const newCar = new instance({
				position: pos,
				scene: this.#scene,
				scale: 0.5 * scale,
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