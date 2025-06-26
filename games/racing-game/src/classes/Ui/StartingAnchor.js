import Track from "../Track/Track.js";
import {Color3, Color4, MeshBuilder, Ray, StandardMaterial, Texture, Vector3} from "@babylonjs/core";
import {calculateMeshCorners, generateAStraightRoad, genId} from "./Utilities.js";

export default class StartingAnchor {
	#track;
	#mesh;
	#scene;
	#width;
	#id;

	constructor(track, width, scene, id) {
		if (!(track instanceof Track)) {
			throw new Error("Invalid track instance");
		}
		this.#track = track;
		this.#scene = scene;
		this.#width = width;
		this.#id = id;
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

	get id() {
		return this.#id;
	}

	render() {
		this.#mesh = generateAStraightRoad(this.track, this.width, this.scene, genId(this.id, 'starting-anchor'));
		const blackMaterial = new StandardMaterial(genId(this.id, 'starting-anchor-material'), this.#scene);
		blackMaterial.diffuseColor = new Color3(0, 0, 0);
		this.#mesh.material = blackMaterial;
		return this.mesh;
	}
}