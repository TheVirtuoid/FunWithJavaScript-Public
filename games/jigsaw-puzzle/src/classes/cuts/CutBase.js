import Position2d from "../support/Position2d.js";

export default class CutBase {
	#width;
	#height;
	#image;

	constructor(args = {}) {
		this.#width = args.width || 0;
		this.#height = args.height || 0;
		this.#image = args.image || null;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	get image() {
		return this.#image;
	}

	cut(position) {
		throw new Error('You need to define a "cut" method when extending the CutBase class');
	}

	configurePuzzleCut(args = {}) {
		throw new Error('You need to define a "configurePuzzleCut" method when extending the CutBase class');
	}
}

























