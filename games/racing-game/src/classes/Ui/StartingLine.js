import Track from "../Track/Track.js";
import {Color3, Color4, MeshBuilder, Ray, StandardMaterial, Texture, Vector3} from "@babylonjs/core";
import {calculateMeshCorners, generateAStraightRoad} from "./Utilities.js";

export default class StartingLine {
	#track;
	#mesh;
	#scene;
	#width;

	constructor(track, width, scene) {
		if (!(track instanceof Track)) {
			throw new Error("Invalid track instance");
		}
		this.#track = track;
		this.#scene = scene;
		this.#width = width;
	}

	get track() {
		return this.#track;
	}

	get mesh() {
		return this.#mesh;
	}

	get scene() {
		return this.#scene;
	}

	get width() {
		return this.#width;
	}

	render() {
		this.#mesh = generateAStraightRoad(this.track, this.width, this.scene);
		const startLineMaterial = new StandardMaterial("startline", this.#scene);
		startLineMaterial.diffuseColor = new Color3(1, 1, .6);
		this.#mesh.material = startLineMaterial;
		return this.mesh;
	}
}