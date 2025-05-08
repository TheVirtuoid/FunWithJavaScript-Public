import {MeshBuilder, StandardMaterial} from "@babylonjs/core";
import App from "./app.js";

export default class Marble {
	#name;
	#color;
	#marble;
	#scene;
	#initialPosition;

	constructor(args = {}) {
		const { name, color, scene, position = null } = args;
		this.#name = name;
		this.#marble = null;
		this.#color = color;
		this.#scene = scene;
		this.#initialPosition = position;
	}

	get name() {
		return this.#name;
	}

	get color() {
		return this.#color;
	}

	getMarble() {
		if (this.#marble === null) {
			this.#marble = MeshBuilder.CreateSphere(this.name, { diameter: .5 }, this.#scene);
			const sphereMaterial = new StandardMaterial(`${this.name}-color`, this.#scene);
			sphereMaterial.diffuseColor = this.color;
			this.#marble.material = sphereMaterial;
			if (this.#initialPosition !== null) {
				this.#marble.position.x = this.#initialPosition.x;
				this.#marble.position.y = this.#initialPosition.y;
				this.#marble.position.z = this.#initialPosition.z;
			}
		}
		return this.#marble;
	}

}