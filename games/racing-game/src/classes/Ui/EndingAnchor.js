import Track from "../Track/Track.js";
import {Color3, MeshBuilder, StandardMaterial, Vector3} from "@babylonjs/core";
import {generateAStraightRoad, genId} from "./Utilities.js";
import Ui from "./Ui.js";
import V3 from "../V3/V3.js";

export default class EndingAnchor {
	#track;
	#mesh;
	#scene;
	#width;
	#id;

	#catcherBox;

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

	get catcherBox() {
		return this.#catcherBox;
	}

	render() {
		this.#mesh = generateAStraightRoad(this.track, this.width, this.scene, genId(this.id, 'ending-anchor'));
		const blackMaterial = new StandardMaterial(genId(this.id, 'ending-anchor'), this.#scene);
		blackMaterial.diffuseColor = new Color3(0, 0, 0);
		this.#mesh.material = blackMaterial;
		const stopBoxPosition = this.track.startingDirectionVector.setDirectedPosition(this.track.startingPosition, this.track.length);
		// const boundingInfo = this.#mesh.getBoundingInfo();
		// Create a 1-unit box
		this.#catcherBox = MeshBuilder.CreateBox(genId(this.id, 'ending-anchor-box'), { depth: this.width, width: this.width, height: 10 }, this.scene);
		// Position the box at the endpoint
		this.#catcherBox.position = Ui.toVector3(stopBoxPosition);
		this.#catcherBox.material = blackMaterial;
		return [this.mesh, this.#catcherBox];
	}
}