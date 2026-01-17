import Vector2d from "../Vector/Vector2d/Vector2d.js";
import WorldData from "../WorldData/WorldData.js";
import Mineral from "../Mineral/Mineral.js";

export default class World {
	static UNIT_WIDTH = 50;
	static UNIT_HEIGHT = 50;
	static UNIT_SIZE = 64;

	static DISTRIBUTION = new Map([
		[Mineral.AETHERITE, 25],
		[Mineral.PYROTITE, 20],
		[Mineral.LUMINITE, 15],
		[Mineral.OBSIDIANITE, 10],
		[Mineral.ZENITHITE, 5]
	]);

	#unitSize;
	#unitWidth;
	#unitHeight;
	#id;
	#mineralPositions;
	#map;

	constructor() {
		this.#unitSize = World.UNIT_SIZE;
		this.#unitWidth = World.UNIT_WIDTH;
		this.#unitHeight = World.UNIT_HEIGHT;
		this.#id = window.crypto.randomUUID();
		this.#map = new Map();
		this.#mineralPositions = new Map([
			[Mineral.AETHERITE, []],
			[Mineral.PYROTITE, []],
			[Mineral.LUMINITE, []],
			[Mineral.OBSIDIANITE, []],
			[Mineral.ZENITHITE, []]
		]);
		for (let x = 0; x < World.UNIT_WIDTH; x++) {
			for (let y = 0; y < World.UNIT_HEIGHT; y++) {
				this.#map.set((new Vector2d(x,y)).toString(), new WorldData());
			}
		}
		// randomize the mineral deposit positions
		World.DISTRIBUTION.forEach((count, mineral) => {
			for (let i = 0; i < count; i++) {
				const position = this.#getRandomPosition();
				const positionCollection = this.#mineralPositions.get(mineral);
				positionCollection.push(position);
				this.#mineralPositions.set(mineral, positionCollection);
			}
		});
		console.log(this.#mineralPositions);
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

	#getRandomPosition() {
		const xMid = Math.floor(World.UNIT_WIDTH / 2);
		const yMid = Math.floor(World.UNIT_HEIGHT / 2);
		const distributionCenterPositions = [
			new Vector2d(xMid - 2, yMid - 2).toString(),
			new Vector2d(xMid - 2, yMid - 1).toString(),
			new Vector2d(xMid - 2, yMid).toString(),
			new Vector2d(xMid - 2, yMid + 1).toString(),

			new Vector2d(xMid - 1, yMid - 2).toString(),
			new Vector2d(xMid - 1, yMid - 1).toString(),
			new Vector2d(xMid - 1, yMid).toString(),
			new Vector2d(xMid - 1, yMid + 1).toString(),

			new Vector2d(xMid, yMid - 2).toString(),
			new Vector2d(xMid, yMid - 1).toString(),
			new Vector2d(xMid, yMid).toString(),
			new Vector2d(xMid, yMid + 1).toString(),

			new Vector2d(xMid + 1, yMid - 2).toString(),
			new Vector2d(xMid + 1, yMid - 1).toString(),
			new Vector2d(xMid + 1, yMid).toString(),
			new Vector2d(xMid + 1, yMid + 1).toString(),

		];
		let x = Math.floor(World.UNIT_WIDTH / 2);
		let y = Math.floor(World.UNIT_HEIGHT / 2);
		while (distributionCenterPositions.includes(new Vector2d(x, y).toString())) {
			x = Math.floor(Math.random() * World.UNIT_WIDTH);
			y = Math.floor(Math.random() * World.UNIT_HEIGHT);
		}
		return new Vector2d(x, y);
	}
}