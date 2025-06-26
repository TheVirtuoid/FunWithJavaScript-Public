import Track from "../Track/Track.js";
import {Axis, Color3, Color4, MeshBuilder, Ray, StandardMaterial, Texture, Vector3, Quaternion} from "@babylonjs/core";
import {calculateMeshCorners, generateAStraightRoad, genId} from "./Utilities.js";
import V3 from "../V3/V3.js";

export default class StartingLine {
	#track;
	#mesh;
	#scene;
	#width;
	#id;
	#countdown;

	#frontGate;
	#backGate;

	#frontGateAggregate;
	#backGateAggregate;

	constructor(track, width, scene, id, countdown = 5000) {
		if (!(track instanceof Track)) {
			throw new Error("Invalid track instance");
		}
		this.#track = track;
		this.#scene = scene;
		this.#width = width;
		this.#id = id;
		this.#countdown = countdown;
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

	get frontGate() {
		return this.#frontGate;
	}

	get backGate() {
		return this.#backGate;
	}

	get countdown() {
		return this.#countdown;
	}

	set frontGateAggregate(aggregate) {
		this.#frontGateAggregate = aggregate;
	}

	set backGateAggregate(aggregate) {
		this.#backGateAggregate = aggregate;
	}

	lowerBars() {
		this.#frontGateAggregate.body.disablePreStep = true;
		this.#backGateAggregate.body.disablePreStep = true;
		this.#frontGate.position.y -= 4;
		this.#backGate.position.y -= 4;
		this.#scene.onBeforePhysicsObservable.addOnce(() => {
			this.#frontGateAggregate.body.disablePreStep = false;
			this.#backGateAggregate.body.disablePreStep = false;
		});
	}

	render() {
		this.#mesh = generateAStraightRoad(this.track, this.width, this.scene, genId(this.id, 'starting-line'));
		const startLineMaterial = new StandardMaterial(genId(this.id, 'starting-line-material'), this.#scene);
		startLineMaterial.diffuseColor = new Color3(1, 1, .6);
		const startGateMaterial = new StandardMaterial(genId(this.id, 'starting-line-gate-material'), this.#scene);
		startGateMaterial.diffuseColor = new Color3(0, 0, 0);
		this.#mesh.material = startLineMaterial;
		this.#frontGate = MeshBuilder.CreateBox(genId(this.id, 'starting-line-front-gate'), { height: 2, width: this.width, depth: .25 }, this.#scene);
		this.#frontGate.position = new Vector3(this.track.endingPosition.x, this.track.endingPosition.y + 1, this.track.endingPosition.z);
		this.#frontGate.material = startGateMaterial;
		this.#frontGate.rotate(new Vector3(1, 0, 0), Math.PI / 3);
		this.#backGate = MeshBuilder.CreateBox(genId(this.id, 'starting-line-back-gate'), { height: 2, width: this.width, depth: .25 }, this.#scene);
		const backGatePosition = this.track.startingDirectionVector.setDirectedPosition(this.track.startingPosition, 5);
		this.#backGate.position = new Vector3(backGatePosition.x, backGatePosition.y + 1, backGatePosition.z);
		this.#backGate.material = startGateMaterial;
		this.#backGate.rotate(new Vector3(1, 0, 0), Math.PI / 3);
		return [this.mesh, this.frontGate, this.backGate];
	}
}