import Track from "../../src/classes/Track/Track.js";
import StartingAnchor from "../../src/classes/Ui/StartingAnchor.js";
import Straight from "../../src/classes/Ui/Straight.js";
import EndingAnchor from "../../src/classes/Ui/EndingAnchor.js";
import Curve from "../../src/classes/Ui/Curve.js";
import StartingLine from "../../src/classes/Ui/StartingLine.js";
import FinishLine from "../../src/classes/Ui/FinishLine.js";
import {PhysicsAggregate, PhysicsShapeType} from "@babylonjs/core";
import {genUnique} from "../../src/classes/Ui/Utilities.js";
import V3 from "../../src/classes/V3/V3.js";
import Layout from "../../src/classes/Layout/Layout.js";

export default class LayoutRenderer {
	#id;
	#layout;
	#scene;
	#trackWidth;

	#startingAnchor;
	#endingAnchor;
	#startingLine;
	#finishLine;

	#trackLayout;

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

	get startingPosition() {
		const startingAnchor = this.layout.tracks.filter((track) => track.type === Track.STARTING_ANCHOR);
		return startingAnchor[0].startingPosition;
	}

	set scene(scene) {
		this.#scene = scene;
	}

	buildLayout(layout) {
		const tracks = [];
		layout.forEach((track) => {
			const trackType = Track.TRACK_TYPES[track.type];
			const id = track.id;
			if (trackType === Track.STARTING_ANCHOR) {
				const startingPosition = new V3(track.startingPosition.x, track.startingPosition.y, track.startingPosition.z);
				const startingDirectionVector = new V3(track.startingDirectionVector.x, track.startingDirectionVector.y, track.startingDirectionVector.z);
				tracks.push(Track.CreateStartingAnchor({ id, startingPosition, startingDirectionVector }));
			} else if (trackType === Track.ENDING_ANCHOR) {
				tracks.push(Track.CreateEndingAnchor({ id }));
			} else if (trackType === Track.STRAIGHT) {
				if (track.length) {
					const length = track.length;
					tracks.push(Track.CreateStraight({ id, length }));
				} else {
					const endingPosition = new V3(track.endingPosition.x, track.endingPosition.y, track.endingPosition.z);
					const controlPoint1 = new V3(track.contour.controlPoint1.x, track.contour.controlPoint1.y, track.contour.controlPoint1.z);
					const controlPoint2 = new V3(track.contour.controlPoint2.x, track.contour.controlPoint2.y, track.contour.controlPoint2.z);
					const contour = { controlPoint1, controlPoint2 };
					tracks.push(Track.CreateStraight({ id, endingPosition, contour }));
				}
			} else if (trackType === Track.CURVE) {
				const radius = track.radius;
				const degrees = track.degrees;
				const curveDirection = Track.CURVE_DIRECTION_TYPES[track.curveDirection];
				tracks.push(Track.CreateCurve({ id, radius, degrees, curveDirection }));
			} else if (trackType === Track.STARTLINE) {
				tracks.push(Track.CreateStartLine({ id }));
			} else if (trackType === Track.FINISHLINE) {
				tracks.push(Track.CreateFinishLine({ id }));
			}
		});
		this.#layout = new Layout({ tracks });
	}

	render() {
		this.#trackLayout = [];
		this.layout.tracks.forEach((track) => {
			if (track.type === Track.STARTING_ANCHOR) {
				this.#startingAnchor = new StartingAnchor(track, this.trackWidth, this.scene, this.id);
				this.#trackLayout.push(this.#startingAnchor.render());
			} else if (track.type === Track.STRAIGHT) {
				const straight = new Straight(track, this.trackWidth, this.scene, genUnique('straight'));
				this.#trackLayout.push(straight.render());
			} else if (track.type === Track.ENDING_ANCHOR) {
				this.#endingAnchor = new EndingAnchor(track, this.trackWidth, this.scene, this.id);
				this.#trackLayout.push(...this.#endingAnchor.render());
			} else if (track.type === Track.CURVE) {
				const curve = new Curve(track, this.trackWidth, this.scene, genUnique('curve'));
				this.#trackLayout.push(curve.render());
			} else if (track.type === Track.STARTLINE) {
				this.#startingLine = new StartingLine(track, this.trackWidth, this.scene, this.id);
				this.#trackLayout.push(...this.#startingLine.render());
			} else if (track.type === Track.FINISHLINE) {
				this.#finishLine = new FinishLine(track, this.trackWidth, this.scene, this.id);
				this.#trackLayout.push(this.#finishLine.render());
			}
		});
		const boxes = [this.#startingLine.frontGate.id, this.#startingLine.backGate.id];
		this.#trackLayout.forEach((track) => {
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