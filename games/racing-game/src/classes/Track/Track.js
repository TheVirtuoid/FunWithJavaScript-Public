import V3 from "../V3/V3.js";

export default class Track {
	static NONE = Symbol('none');
	static STRAIGHT = Symbol('straight');
	static CURVE = Symbol('curve');
	static STARTING_ANCHOR = Symbol('starting-anchor');
	static ENDING_ANCHOR = Symbol('ending-anchor');
	static STARTLINE = Symbol('startLine');
	static FINISHLINE = Symbol('finishLine');

	static STARTLINE_LENGTH = 10;
	static FINISHLINE_LENGTH = 1;

	static STARTING_GUARDRAIL_START_HEIGHT = 0.6;
	static STARTING_GUARDRAIL_END_HEIGHT = 0.6;
	static ENDING_GUARDRAIL_START_HEIGHT = 0.6;
	static ENDING_GUARDRAIL_END_HEIGHT = 0.6;

	static STARTING_CIRCLE_GUARDRAIL_START_HEIGHT = 0.6;
	static STARTING_CIRCLE_GUARDRAIL_END_HEIGHT = 0.6;
	static ENDING_CIRCLE_GUARDRAIL_START_HEIGHT = 0.6;
	static ENDING_CIRCLE_GUARDRAIL_END_HEIGHT = 3;

	static TRACK_WIDTH = 4;
	static ANCHOR_DEFAULT_LENGTH = 1;

	static CURVE_DIRECTION_POSITIVE = Symbol('curve-direction-positive');
	static CURVE_DIRECTION_NEGATIVE = Symbol('curve-direction-negative');

	#id;
	#type;
	#name;
	#description;
	#attributes;

	constructor(args = {}) {

		const { id = '', description = '', name = '', type = Track.NONE, attributes} = args;
		this.#id = id;
		this.#type = type;
		this.#name = name;
		this.#description = description;
		this.#attributes = {
			startingPosition: attributes?.startingPosition || null,
			endingPosition: attributes?.endingPosition || null,
			startingDirectionVector: attributes?.startingDirectionVector || null,
			endingDirectionVector: attributes?.endingDirectionVector || null,
			radius: attributes?.radius || null,
			degrees: attributes?.degrees || null,
			depthDrop: attributes?.depthDrop || null,
			curveDirection: attributes?.curveDirection || null,
			contour: attributes?.contour || null,
			length: attributes?.length || null,
			testEndPoint: attributes?.testEndPoint || null,
			startingGuardRail: {
				startingHeight: attributes?.startingGuardRail?.startingHeight || Track.STARTING_GUARDRAIL_START_HEIGHT,
				endingHeight: attributes?.startingGuardRail?.endingHeight || Track.STARTING_GUARDRAIL_END_HEIGHT,
			},
			endingGuardRail: {
				startingHeight: attributes?.endingGuardRail?.startingHeight || Track.ENDING_GUARDRAIL_START_HEIGHT,
				endingHeight: attributes?.endingGuardRail?.endingHeight || Track.ENDING_GUARDRAIL_END_HEIGHT,
			},
			trackWidth: attributes?.trackWidth || Track.TRACK_WIDTH
		};
	}

	get id() {
		return this.#id;
	}

	get type() {
		return this.#type;
	}

	get description() {
		return this.#description;
	}

	get name() {
		return this.#name;
	}

	get startingPosition() {
		return this.#attributes.startingPosition;
	}

	get startingDirectionVector() {
		return this.#attributes.startingDirectionVector;
	}

	get endingPosition() {
		return this.#attributes.endingPosition;
	}

	get endingDirectionVector() {
		return this.#attributes.endingDirectionVector;
	}

	get length() {
		return this.#attributes.length;
	}

	get contour() {
		return this.#attributes.contour;
	}

	get radius() {
		return this.#attributes.radius;
	}

	get degrees() {
		return this.#attributes.degrees;
	}

	get depthDrop() {
		return this.#attributes.depthDrop;
	}

	get curveDirection() {
		return this.#attributes.curveDirection;
	}

	get startingGuardRail() {
		return this.#attributes.startingGuardRail;
	}

	get endingGuardRail() {
		return this.#attributes.endingGuardRail;
	}

	get trackWidth() {
		return this.#attributes.trackWidth;
	}

	get testEndPoint() {
		return this.#attributes.testEndPoint;
	}

	connectTo(track) {
		if (!(track instanceof Track)) {
			throw new Error('Track.connectTo(): Argument must be an instance of Track');
		}
		this.#attributes.startingPosition = new V3(...track.endingPosition.coordinates());
		this.#attributes.startingDirectionVector = new V3(...track.endingDirectionVector.coordinates());
		let normalized;
		let perpendicular;
		switch(this.type) {
			case Track.CURVE:
				const { x: svx, y: svy, z: svz } = this.startingDirectionVector;
				const { x: spx, y: spy, z: spz } = this.startingPosition;
				const vectorDirection = this.curveDirection === Track.CURVE_DIRECTION_POSITIVE
					? V3.DIRECTION_POSITIVE
					: V3.DIRECTION_NEGATIVE
				switch(this.degrees) {
					case 180: {
						this.#attributes.endingDirectionVector = this.startingDirectionVector.getDirectionVectorFromDegrees(180, vectorDirection);
						normalized = this.startingDirectionVector.normalize();
						perpendicular = normalized.perpendicular(vectorDirection);
						this.#attributes.endingPosition = new V3(
							spx + 2 * this.radius * perpendicular.x,
							spy,
							spz + 2 * this.radius * perpendicular.z,
						);
						const cp1 = this.startingDirectionVector.setDirectedPosition(this.startingPosition, this.radius);
						const cpDirectionVector = this.startingDirectionVector.perpendicular(vectorDirection);
						const cp2 = cpDirectionVector.setDirectedPosition(cp1, this.radius * 2);
						const controlPoint1 = new V3(cp1.x - this.startingPosition.x, 0, cp1.z - this.startingPosition.z);
						const controlPoint2 = new V3(cp2.x - this.startingPosition.x, 0, cp2.z - this.startingPosition.z);

						this.#attributes.contour = {controlPoint1, controlPoint2};
						break;
					}
					case 90: {
						this.#attributes.endingDirectionVector = this.startingDirectionVector.perpendicular(vectorDirection);
						normalized = this.startingDirectionVector.normalize();
						perpendicular = normalized.perpendicular(vectorDirection);
						const center = new V3(
							spx + this.radius * perpendicular.x,
							spy,
							spz + this.radius * perpendicular.z
						);
						this.#attributes.endingPosition = new V3(
							center.x + this.radius * normalized.x,
							spy,
							center.z + this.radius * normalized.z,
						);
						const cp1 = this.startingDirectionVector.setDirectedPosition(this.startingPosition, this.radius / 2);
						const cp2StartPosition = this.startingDirectionVector.setDirectedPosition(this.startingPosition, this.radius);
						const cp2 = this.endingDirectionVector.setDirectedPosition(cp2StartPosition, this.radius / 2);
						const controlPoint1 = new V3(cp1.x - this.startingPosition.x, 0, cp1.z - this.startingPosition.z);
						const controlPoint2 = new V3(cp2.x - this.startingPosition.x, 0, cp2.z - this.startingPosition.z);
						this.#attributes.contour = {controlPoint1, controlPoint2};
						break;
					}
				}
				break;
			case Track.STRAIGHT:
				if (this.length && this.length !== 0) {
					this.#attributes.endingPosition = this.startingDirectionVector.setDirectedPosition(this.startingPosition, this.length);
				} else {
					if (this.endingPosition) {
						this.#attributes.endingPosition = new V3(
							this.endingPosition.x + this.startingPosition.x,
							this.endingPosition.y + this.startingPosition.y,
							this.endingPosition.z + this.startingPosition.z
						);
					}
				}
				if (this.contour === null) {
					this.#attributes.endingDirectionVector = this.startingDirectionVector.clone();
				} else {
					const tangent = {
						x: 3 * (this.endingPosition.x - (this.contour.controlPoint2.x + this.startingPosition.x)),
						y: 3 * (this.endingPosition.y - (this.contour.controlPoint2.y + this.startingPosition.y)),
						z: 3 * (this.endingPosition.z - (this.contour.controlPoint2.z + this.startingPosition.z)),
					};
					const magnitude = Math.sqrt(tangent.x ** 2 + tangent.y ** 2 + tangent.z ** 2);
					this.#attributes.endingDirectionVector = new V3(
						tangent.x / magnitude,
						tangent.y / magnitude,
						tangent.z / magnitude
					);
				}
				break;
			case Track.STARTLINE:
				this.#attributes.endingPosition = this.startingDirectionVector.setDirectedPosition(this.startingPosition, this.length);
				this.#attributes.endingDirectionVector = this.startingDirectionVector.clone();
				break;
			case Track.FINISHLINE:
				this.#attributes.endingPosition = this.startingDirectionVector.setDirectedPosition(this.startingPosition, this.length);
				this.#attributes.endingDirectionVector = this.startingDirectionVector.clone();
				break;
			case Track.ENDING_ANCHOR: // not really required, but doing so for completeness. Both endPos and endDir are already null
				this.#attributes.endingPosition = null;
				this.#attributes.endingDirectionVector = null;
				break;
		}
	}

	static CreateStraight(args = {}) {
		const { id = '', length = 0, contour = null, endingPosition = null } = args;
		if (isNaN(length)) {
			throw new Error('Track.CreateStraight: length must be a number');
		}
		if (contour !== null) {
			if (!'controlPoint1' in contour || !'controlPoint2' in contour) {
				throw new Error('Track.CreateStraight: contour must be an object with controlPoint1 and controlPoint2 properties');
			}
			if (!(contour.controlPoint1 instanceof V3) || !(contour.controlPoint2 instanceof V3)) {
				throw new Error('Track.CreateStraight: contour controlPoint1 and controlPoint2 properties must both be Vector3');
			}
		}
		return new Track({
			id,
			type: Track.STRAIGHT,
			attributes: {
				length: length,
				contour: contour,
				endingPosition: endingPosition,
			}
		});
	}

	static CreateCurve(args = {}) {
		const { id = '', radius = null, degrees = null, depthDrop = null, curveDirection = null } = args;
		if (degrees !== null && ![45, 90, 135, 180, 225, 270, 315, 360].includes(degrees)) {
			throw new Error('Track.CreateCurve: degrees must be a number (45, 89, 135, 180, 225, 270, 315, 360)');
		}
		if (depthDrop !== null) {
			if (!(depthDrop instanceof Array) || (depthDrop.some((element) => typeof(element) !== 'number'))) {
				throw new Error('Track.CreateCurve: depthDrop must be an array of numbers');
			}
		}
		if (curveDirection !== null && curveDirection !== Track.CURVE_DIRECTION_POSITIVE && curveDirection !== Track.CURVE_DIRECTION_NEGATIVE) {
			throw new Error('Track.CreateCurve: curveDirection must be Track.CURVE_DIRECTION_POSITIVE or Track.CURVE_DIRECTION_NEGATIVE');
		}
		return new Track({
			id,
			type: Track.CURVE,
			attributes: {
				radius: radius,
				degrees: degrees,
				depthDrop: depthDrop,
				curveDirection: curveDirection,
				startingGuardRail: {
					startingHeight: Track.STARTING_CIRCLE_GUARDRAIL_START_HEIGHT,
					endingHeight: Track.STARTING_CIRCLE_GUARDRAIL_END_HEIGHT,
				},
				endingGuardRail: {
					startingHeight: Track.ENDING_CIRCLE_GUARDRAIL_START_HEIGHT,
					endingHeight: Track.ENDING_CIRCLE_GUARDRAIL_END_HEIGHT,
				},
			}
		});
	}

	static CreateStartingAnchor(args = {}) {
		const { id = '', startingPosition = null, startingDirectionVector = null } = args;
		if (startingPosition !== null && !(startingPosition instanceof V3)) {
			throw new Error('Track.CreateStartingAnchor: startingPosition must be a Vector3 or null');
		}
		if (startingDirectionVector !== null && !(startingDirectionVector instanceof V3)) {
			throw new Error('Track.CreateStartingAnchor: startingDirectionVector must be a Vector3 or null');
		}
		return new Track({
			id,
			type: Track.STARTING_ANCHOR,
			attributes: {
				startingPosition: startingPosition,
				startingDirectionVector: startingDirectionVector,
				endingPosition: startingDirectionVector?.setDirectedPosition(startingPosition, 1) || null,
				endingDirectionVector: startingDirectionVector,
				length: Track.ANCHOR_DEFAULT_LENGTH
			}
		});
	}

	static CreateEndingAnchor(args = {}) {
		const { id = '' } = args;
		return new Track({
			id,
			type: Track.ENDING_ANCHOR,
			attributes: {
				length: Track.ANCHOR_DEFAULT_LENGTH,
			}
		});
	}

	static CreateStartLine(args = {}) {
		const { id = '' } = args;
		return new Track({
			id,
			type: Track.STARTLINE,
			attributes: {
				length: Track.STARTLINE_LENGTH
			}
		});
	}

	static CreateFinishLine(args = {}) {
		const { id = '' } = args;
		return new Track({
			id,
			type: Track.FINISHLINE,
			attributes: {
				length: Track.FINISHLINE_LENGTH
			}
		});
	}

}