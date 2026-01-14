import Base from "../Base/Base.js";

export default class Conveyor extends Base {
	static STRAIGHT = Symbol('straight');
	static CURVE = Symbol('curve');
	static BRIDGE = Symbol('bridge');
	static T_INTERSECTION = Symbol('t_intersection');
	static X_INTERSECTION = Symbol('x_intersection');

	static TYPES = [Conveyor.STRAIGHT, Conveyor.CURVE, Conveyor.BRIDGE, Conveyor.T_INTERSECTION, Conveyor.X_INTERSECTION];

	constructor(args = {}) {
		const { type, orientation = 0 } = args;
		if (!Conveyor.TYPES.includes(type)) {
			throw new Error(`Invalid conveyor type: ${type}`);
		}
		super(args);
	}
}