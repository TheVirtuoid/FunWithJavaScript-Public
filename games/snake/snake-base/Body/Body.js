import Segment from './../Segment/Segment.js';

export default class Body {
	#segments;
	#id;

	constructor(args = {}) {
		const { segments = [], id = window.crypto.randomUUID() } = args;
		this.#segments = segments.map(segment => segment);
		this.#id = id;
	}

	get length() {
		return this.#segments.length;
	}

	get id() {
		return this.#id;
	}

	get segments() {
		return this.#segments.map(segment => segment.position.clone());
	}

	getSegmentAt(index) {
		if (index < 0 || index >= this.#segments.length) {
			return undefined;
		}
		return this.#segments[index];
	}

	grow(args = {}) {
		const { position, direction } = args;
		const newSegment = new Segment({ position, direction });
		this.#segments.unshift(newSegment);
	}

}