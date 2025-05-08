import {Vector3} from "@babylonjs/core";

export default class Track {
	static NONE = Symbol('none');
	static STRAIGHT = Symbol('straight');
	static CURVE = Symbol('curve');
	static ANCHOR = Symbol('anchor');
	static STARTLINE = Symbol('startLine');
	static FINISHLINE = Symbol('finishLine');

	static STARTLINE_LENGTH = 10;
	static FINISHLINE_LENGTH = 1;

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
		this.#attributes = attributes || {
			startingPosition: null,
			endingPosition: null,
			startingDirectionVector: null,
			endingDirectionVector: null,
			radius: null,
			degrees: null,
			depthDrop: null,
			curveDirection: null,
			contour: null,
			length: null
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

	get attributes() {
		return this.#attributes;
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


	static CreateStraight(args = {}) {
		const { endingPosition = null, endingDirectionVector = null, length = 0, contour = null } = args;
		if (!(endingPosition instanceof Vector3) && endingPosition !== null) {
			throw new Error('Track.CreateStraight: endingPosition must be a Vector3');
		}
		if (!(endingDirectionVector instanceof Vector3) && endingDirectionVector !== null) {
			throw new Error('Track.CreateStraight: endingDirectionVector must be a Vector3');
		}
		if (contour !== null) {
			if (!'controlPoint1' in contour || !'controlPoint2' in contour) {
				throw new Error('Track.CreateStraight: contour must be an object with controlPoint1 and controlPoint2 properties');
			}
			if (!(contour.controlPoint1 instanceof Vector3) || !(contour.controlPoint2 instanceof Vector3)) {
				throw new Error('Track.CreateStraight: contour controlPoint1 and controlPoint2 properties must both be Vector3');
			}
		}
		return new Track({
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
		const { radius = null, degrees = null, depthDrop = null, curveDirection = null } = args;
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
			type: Track.CURVE,
			attributes: {
				startingPosition: null,
				startingDirectionVector: null,
				endingPosition: null,
				endingDirectionVector: null,
				radius: radius,
				degrees: degrees,
				depthDrop: depthDrop,
				curveDirection: curveDirection
			}
		});
	}

	static CreateAnchor(args = {}) {
		const { startingPosition = null, startingDirectionVector = null } = args;
		if (startingPosition !== null && !(startingPosition instanceof Vector3)) {
			throw new Error('Track.CreateAnchor: startingPosition must be a Vector3 or null');
		}
		if (startingDirectionVector !== null && !(startingDirectionVector instanceof Vector3)) {
			throw new Error('Track.CreateAnchor: startingDirectionVector must be a Vector3 or null');
		}
		return new Track({
			type: Track.ANCHOR,
			attributes: {
				startingPosition: startingPosition,
				startingDirectionVector: startingDirectionVector,
				endingPosition: startingPosition,
				endingDirectionVector: startingDirectionVector
			}
		});
	}

	static CreateStartLine() {
		return new Track({
			type: Track.STARTLINE,
			attributes: {
				length: Track.STARTLINE_LENGTH
			}
		});
	}

	static CreateFinishLine() {
		return new Track({
			type: Track.FINISHLINE,
			attributes: {
				length: Track.FINISHLINE_LENGTH
			}
		});
	}

}