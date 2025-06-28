import Track from "../Track/Track.js";
import {Color3, Color4, MeshBuilder, Ray, StandardMaterial, Texture, Vector3} from "@babylonjs/core";
import {calculateMeshCorners, generateAStraightRoad, genId} from "./Utilities.js";

export default class FinishLine {
	#track;
	#mesh;
	#scene;
	#width;
	#id;

	#finishLineRay = null;

	#finishedMeshes;
	#meshesToCheck;

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

	get finishLineRay() {
		return this.#finishLineRay;
	}

	setFinishLineMeshes(meshes) {
		this.#finishedMeshes = [];
		this.#meshesToCheck = meshes;
	}

	checkForFinish() {
		let meshThatCrossed = null;
		const meshHit = this.#finishLineRay.intersectsMeshes(this.#meshesToCheck);
		for (const mesh of meshHit) {
			const { pickedMesh } = mesh;
			if (!this.#finishedMeshes.includes(pickedMesh)) {
				this.#finishedMeshes.push(pickedMesh);
				meshThatCrossed = pickedMesh;
			}
		}
		return meshThatCrossed;
	}

	render() {
		this.#mesh = generateAStraightRoad(this.track, this.width, this.scene, genId(this.id, 'finish-line'));
		const material = new StandardMaterial(genId(this.id, 'finish-line-material'), this.scene);
		// material.disableLighting = true;
		const texture = new Texture('/images/checkerboard-7800519_1280.jpg', this.scene);
		texture.uScale = .25; // Scale texture in U direction
		// texture.vScale = 2.0; // Scale texture in V direction
		// texture.hasAlpha = true; // If your texture has transparency
		material.diffuseTexture = texture;
		// material.emmisiveTexture = texture;
		this.#mesh.material = material;
		const corners = calculateMeshCorners(this.#mesh);
		const startDiff = corners[3].subtract(corners[1]).divide(new Vector3(6, 6, 6)).multiply(new Vector3(5, 5, 5));
		const endDiff = corners[7].subtract(corners[5]).divide(new Vector3(6, 6, 6)).multiply(new Vector3(5, 5, 5));
		const start = corners[3].subtract(startDiff);
		const end = corners[7].subtract(endDiff);
		const lines = [start, end];
		const colors = [
			new Color4(0, 1, 1, 1),
			new Color4(0, 1, 1, 1)
		]
		MeshBuilder.CreateLines(genId(this.id, 'finish-line-line'), { points: lines, colors }, this.#scene);
		const lineDiff = end.subtract(start);
		const directionVector = end.subtract(start).normalize();
		const lengthAlongDirection = Vector3.Dot(lineDiff, directionVector);
		this.#finishLineRay = new Ray(start, directionVector, lengthAlongDirection);
		return this.mesh;
	}
}