import Track from "../Track/Track.js";
import {Color3, MeshBuilder, StandardMaterial, Vector3} from "@babylonjs/core";
import { generateAStraightRoad } from "./Utilities.js";
import Ui from "./Ui.js";
import V3 from "../V3/V3.js";

export default class EndingAnchor {
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
		const blackMaterial = new StandardMaterial("ending-anchor", this.#scene);
		blackMaterial.diffuseColor = new Color3(0, 0, 0);
		this.#mesh.material = blackMaterial;
		const stopBoxPosition = this.track.startingDirectionVector.setDirectedPosition(this.track.startingPosition, this.track.length);
		// const boundingInfo = this.#mesh.getBoundingInfo();
		// Create a 1-unit box
		const box = MeshBuilder.CreateBox("endpointBox", { depth: this.width, width: this.width, height: 10 }, this.scene);
		// Position the box at the endpoint
		box.position = Ui.toVector3(stopBoxPosition);
		box.material = blackMaterial;
		return [this.mesh, box];
	}
}