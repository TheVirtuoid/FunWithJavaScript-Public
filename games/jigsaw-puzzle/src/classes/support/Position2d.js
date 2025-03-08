export default class Position2d {
	#x;
	#y;

	constructor(args = {}) {
		this.#x = args?.x || 0;
		this.#y = args?.y || 0;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	static valid(args) {
		return args.x !== undefined && args.y !== undefined;
	}
}