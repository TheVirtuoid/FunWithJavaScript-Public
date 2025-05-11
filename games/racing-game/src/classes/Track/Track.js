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

	connectTo(track) {
		if (!(track instanceof Track)) {
			throw new Error('Track.connectTo(): Argument must be an instance of Track');
		}
		this.#attributes.startingPosition = new V3(...track.endingPosition.coordinates());
		this.#attributes.startingDirectionVector = new V3(...track.endingDirectionVector.coordinates());
	}

	setEndPoints() {
		if (this.startingPosition === null || this.startingDirectionVector === null) {
			throw new Error('Track.getEndPoints(): startingPosition and startingDirectionVector must be set. Use connectTo() to set them.');
		}
		switch(this.type) {
			case Track.STRAIGHT:
				if (this.contour === null) {
					this.#attributes.endingPosition = this.startingDirectionVector.getNewPosition(this.startingPosition, this.length);
					this.#attributes.endingDirectionVector = new V3(...this.startingDirectionVector.coordinates());
				} else {
					const temporaryEndingPosition = this.startingDirectionVector.getNewPosition(this.startingPosition, this.length);
					const tangent = {
						x: 3 * (temporaryEndingPosition.x - this.contour.controlPoint2.x),
						y: 3 * (temporaryEndingPosition.y - this.contour.controlPoint2.y),
						z: 3 * (temporaryEndingPosition.z - this.contour.controlPoint2.z),
					};
					const magnitude = Math.sqrt(tangent.x ** 2 + tangent.y ** 2 + tangent.z ** 2);
					this.#attributes.endingDirectionVector = new V3(
						tangent.x / magnitude,
						tangent.y / magnitude,
						tangent.z / magnitude
					);
			}
				break;
			case Track.CURVE:
				break;
			case Track.STARTING_ANCHOR:
			case Track.ENDING_ANCHOR:
				this.#attributes.endingPosition = new V3(...this.startingPosition.coordinates());
				this.#attributes.endingDirectionVector = new V3(...this.startingDirectionVector.coordinates());
				break;
			case Track.STARTLINE:
			case Track.FINISHLINE:
				this.#attributes.endingPosition = this.startingDirectionVector.getNewPosition(this.startingPosition, this.length);
				this.#attributes.endingDirectionVector = new V3(...this.startingDirectionVector.coordinates());
				break;
			default:
				throw new Error('Track.getEndPoints(): Invalid track type');
		}
	}

	static CreateStraight(args = {}) {
		const { id = '', endingPosition = null, endingDirectionVector = null, length, contour = null } = args;
		if (!(endingPosition instanceof V3) && endingPosition !== null) {
			throw new Error('Track.CreateStraight: endingPosition must be a Vector3');
		}
		if (!(endingDirectionVector instanceof V3) && endingDirectionVector !== null) {
			throw new Error('Track.CreateStraight: endingDirectionVector must be a Vector3');
		}
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
				startingPosition: null,
				startingDirectionVector: null,
				endingPosition: endingPosition,
				endingDirectionVector: endingDirectionVector,
				length: length,
				contour: contour
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
		if (curveDirection !== null && curveDirection !== 'left' && curveDirection !== 'right') {
			throw new Error('Track.CreateCurve: curveDirection must be "left" or "right"');
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
				endingPosition: startingPosition,
				endingDirectionVector: startingDirectionVector,
				length: 1
			}
		});
	}

	static CreateEndingAnchor(args = {}) {
		const { id = '' } = args;
		return new Track({
			id,
			type: Track.ENDING_ANCHOR,
			attributes: {
				length: 1
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