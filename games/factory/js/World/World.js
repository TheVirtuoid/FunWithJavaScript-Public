import Vector2d from "../Vector/Vector2d/Vector2d.js";
import WorldData from "../WorldData/WorldData.js";

export default class World {
	static UNIT_WIDTH = 50;
	static UNIT_HEIGHT = 50;
	static UNIT_SIZE = 64;

	#unitSize;
	#unitWidth;
	#unitHeight;
	#id;

	#map;

	constructor() {
		this.#unitSize = World.UNIT_SIZE;
		this.#unitWidth = World.UNIT_WIDTH;
		this.#unitHeight = World.UNIT_HEIGHT;
		this.#id = window.crypto.randomUUID();
		this.#map = new Map();
		for (let x = 0; x < World.UNIT_WIDTH; x++) {
			for (let y = 0; y < World.UNIT_HEIGHT; y++) {
				this.#map.set((new Vector2d(x,y)).toString(), new WorldData());
			}
		}
	}

	get unitSize() {
		return this.#unitSize;
	}
	get unitWidth() {
		return this.#unitWidth;
	}
	get unitHeight() {
		return this.#unitHeight;
	}
	get id() {
		return this.#id;
	}

	getPosition(position) {
		if (!(position instanceof Vector2d)) {
			throw new Error('Position must be a Vector2d');
		}
		if (position.x < 0 || position.y < 0) {
			return undefined;
		}
		if (position.x >= World.UNIT_WIDTH || position.y >= World.UNIT_HEIGHT) {
			return undefined;
		}
		return this.#map.get(position);
	}
}