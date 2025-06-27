import Track from "../../src/classes/Track/Track.js";
import StartingAnchor from "../../src/classes/Ui/StartingAnchor.js";
import Straight from "../../src/classes/Ui/Straight.js";
import EndingAnchor from "../../src/classes/Ui/EndingAnchor.js";
import Curve from "../../src/classes/Ui/Curve.js";
import StartingLine from "../../src/classes/Ui/StartingLine.js";
import FinishLine from "../../src/classes/Ui/FinishLine.js";
import {PhysicsAggregate, PhysicsShapeType} from "@babylonjs/core";
import {genUnique} from "../../src/classes/Ui/Utilities.js";

export default class LayoutRenderer {
	#id;
	#layout;
	#scene;
	#trackWidth;

	#startingAnchor;
	#endingAnchor;
	#startingLine;
	#finishLine;

	constructor(args = {}) {
		const { id, layout, scene, trackWidth = 6 } = args;
		this.#id = id;
		this.#layout = layout;
		this.#scene = scene;
		this.#trackWidth = trackWidth;
	}

	get id() {
		return this.#id;
	}

	get layout() {
		return this.#layout;
	}

	get scene() {
		return this.#scene;
	}

	get trackWidth() {
		return this.#trackWidth;
	}

	render() {
		this.layout.tracks.forEach((track) => {
			if (track.type === Track.STARTING_ANCHOR) {
				this.#startingAnchor = new StartingAnchor(track, this.trackWidth, this.scene, this.id);
				this.#layout.push(this.#startingAnchor.render());
			} else if (track.type === Track.STRAIGHT) {
				const straight = new Straight(track, this.trackWidth, this.scene, genUnique('straight'));
				this.#layout.push(straight.render());
			} else if (track.type === Track.ENDING_ANCHOR) {
				this.#endingAnchor = new EndingAnchor(track, this.trackWidth, this.scene, this.id);
				this.#layout.push(...this.#endingAnchor.render());
			} else if (track.type === Track.CURVE) {
				const curve = new Curve(track, this.trackWidth, this.scene, genUnique('curve'));
				this.#layout.push(curve.render());
			} else if (track.type === Track.STARTLINE) {
				this.#startingLine = new StartingLine(track, this.trackWidth, this.scene, this.id);
				this.#layout.push(...this.#startingLine.render());
			} else if (track.type === Track.FINISHLINE) {
				this.#finishLine = new FinishLine(track, this.trackWidth, this.scene, this.id);
				this.#layout.push(this.#finishLine.render());
			}
		});
		const boxes = [this.#startingLine.frontGate.id, this.#startingLine.backGate.id];
		this.#layout.forEach((track) => {
			const friction = track.material.id === this.#endingAnchor.mesh.material.id ? 1 : .2;
			const physicsShape = boxes.includes(track.name) ? PhysicsShapeType.BOX : PhysicsShapeType.MESH;
			const aggregate = new PhysicsAggregate(
				track,
				physicsShape,
				{ mass: 0, friction, restitution: 0}, this.scene
			);
			if (track.id === this.#startingLine.frontGate.id) {
				this.#startingLine.frontGateAggregate = aggregate;
			} else if (track.id === this.#startingLine.backGate.id) {
				this.#startingLine.backGateAggregate = aggregate;
			}
		});
	}
}