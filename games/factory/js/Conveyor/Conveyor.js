export default class Conveyor {
	static STRAIGHT = Symbol('straight');
	static CURVE = Symbol('curve');
	static BRIDGE = Symbol('bridge');
	static T_INTERSECTION = Symbol('t_intersection');
	static X_INTERSECTION = Symbol('x_intersection');

	static TYPES = [Conveyor.STRAIGHT, Conveyor.CURVE, Conveyor.BRIDGE, Conveyor.T_INTERSECTION, Conveyor.X_INTERSECTION];

	#id;
	#type;
	#orientation;
	#level;

	constructor(args = {}) {
		const { type, orientation = 0 } = args;
		if (!Conveyor.TYPES.includes(type)) {
			throw new Error(`Invalid conveyor type: ${type}`);
		}
		this.#orientation = this.setOrientation(orientation);
		this.#id = window.crypto.randomUUID();
		this.#type = type;
		this.#orientation = orientation;
		this.#level = 1;
	}

	get id() {
		return this.#id;
	}
	get type() {
		return this.#type;
	}
	get orientation() {
		return this.#orientation;
	}
	get level() {
		return this.#level;
	}

	setOrientation(orientation) {
		if (![0, 90, 180, 270].includes(orientation)) {
			throw new Error(`Invalid orientation: ${orientation}`);
		}
		this.#orientation = orientation;
	}

	incrementLevel() {
		this.#level++;
	}
}