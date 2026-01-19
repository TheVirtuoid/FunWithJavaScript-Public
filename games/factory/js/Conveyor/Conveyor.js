import Base from "../Base/Base.js";

export default class Conveyor extends Base {
	static STRAIGHT = Symbol('conveyor-straight');
	static CURVE_LEFT = Symbol('conveyor-curve-left');
	static CURVE_RIGHT = Symbol('conveyor-curve-right');
	static T_INTERSECTION_LEFT = Symbol('conveyor-t-intersection-left');
	static T_INTERSECTION_RIGHT = Symbol('conveyor-t-intersection-right');
	static X_INTERSECTION = Symbol('conveyor-x-intersection');

	static TYPES = [
		Conveyor.STRAIGHT,
		Conveyor.CURVE_LEFT,
		Conveyor.CURVE_RIGHT,
		Conveyor.T_INTERSECTION_LEFT,
		Conveyor.T_INTERSECTION_RIGHT,
		Conveyor.X_INTERSECTION
	];

	static SYMBOLS = new Map([
		[Conveyor.STRAIGHT.description, Conveyor.STRAIGHT],
		[Conveyor.CURVE_LEFT.description, Conveyor.CURVE_LEFT],
		[Conveyor.CURVE_RIGHT.description, Conveyor.CURVE_RIGHT],
		[Conveyor.T_INTERSECTION_LEFT.description, Conveyor.T_INTERSECTION_LEFT],
		[Conveyor.T_INTERSECTION_RIGHT.description, Conveyor.T_INTERSECTION_RIGHT],
		[Conveyor.X_INTERSECTION.description, Conveyor.X_INTERSECTION]
	]);

	constructor(args = {}) {
		const { type, orientation = 0 } = args;
		if (!Conveyor.TYPES.includes(type)) {
			throw new Error(`Invalid conveyor type: ${type}`);
		}
		super(args);
	}
}