import Vector2d from "../Vector/Vector2d/Vector2d.js";
import WorldData from "../WorldData/WorldData.js";
import Mineral from "../Mineral/Mineral.js";
import Extractor from "../Extractor/Extractor.js";

export default class World {
	static UNIT_WIDTH = 50;
	static UNIT_HEIGHT = 50;
	static UNIT_SIZE = 64;
	static UNIT_HALF_SIZE = World.UNIT_SIZE / 2;

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
	#extractors;

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
				const worldData = new WorldData();
				this.#map.set((new Vector2d(x,y)).toString(), worldData);
			}
		}
		// the following represent the distribution center positions
		const xMid = Math.floor(World.UNIT_WIDTH / 2);
		const yMid = Math.floor(World.UNIT_HEIGHT / 2);
		const takenPositions = [
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
		World.DISTRIBUTION.forEach((count, mineral) => {
			for (let i = 0; i < count; i++) {
				const position = this.#getRandomPosition(takenPositions);
				const worldData = this.#map.get(position.toString());
				this.#map.set(position.toString(), worldData);
				takenPositions.push(position);
				const mineralPositions = this.#mineralPositions.get(mineral);
				mineralPositions.push(position);
				this.#mineralPositions.set(mineral, mineralPositions);
			}
		});
		this.#extractors = new Map();
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
	get extractors() {
		return new Map([...this.#extractors]);
	}

	getPosition(position) {
		this.#validatePosition(position);
		return this.#map.get(position.toString());
	}

	setPosition(position, worldData) {
		this.#validatePosition(position);
		this.#map.set(position.toString(), worldData);
	}

	addBuilding(args = {}) {
		const { position, building, image } = args;
		this.#validatePosition(position);
		if (this.hasBuilding(position)) {
			return false;
		}
		if (Extractor.Has(building.type)) {
			building.setInactive();
			this.#extractors.set(position.toString(), building);
		}
		building.setImage(image);
		const worldData = this.getPosition(position);
		worldData.addBuilding(building);
		if (worldData.deposit?.type === building.mineralType) {
			building.setActive();
		}
		this.setPosition(position, worldData);
		return true;
	}

	hasBuilding(position) {
		this.#validatePosition(position);
		const worldData = this.getPosition(position);
		return !!worldData.building;
	}

	removeBuilding(position) {
		this.#validatePosition(position);
		const worldData = this.getPosition(position);
		if (!worldData.building) {
			return false;
		}
		console.log(worldData.building);
		if (Extractor.Has(worldData.building.type)) {
			this.#extractors.delete(position.toString());
		}
		const removedBuilding = worldData.removeBuilding();
		this.setPosition(position, worldData);
		return removedBuilding;
	}

	removeDeposit(position) {
		this.#validatePosition(position);
		const worldData = this.getPosition(position);
		worldData.setDeposit(WorldData.DEPOSIT_NONE);
		this.setPosition(position, worldData);
		return true;
	}

	getMineralDeposits(mineral) {
		if (!Mineral.Has(mineral)) {
			throw new Error('Invalid mineral provided');
		}
		return this.#mineralPositions.get(mineral);
	}

	#getRandomPosition(takenPositions) {
		let x = Math.floor(World.UNIT_WIDTH / 2);
		let y = Math.floor(World.UNIT_HEIGHT / 2);
		while (takenPositions.includes(new Vector2d(x, y).toString())) {
			x = Math.floor(Math.random() * World.UNIT_WIDTH);
			y = Math.floor(Math.random() * World.UNIT_HEIGHT);
		}
		return new Vector2d(x, y);
	}

	#validatePosition(position) {
		if (!(position instanceof Vector2d)) {
			throw new Error('Position must be a Vector2d');
		}
		if (position.x < 0 || position.y < 0) {
			throw new Error('Position is an invalid position');
		}
		if (position.x >= World.UNIT_WIDTH || position.y >= World.UNIT_HEIGHT) {
			throw new Error('Position is an invalid position');
		}
	}
}