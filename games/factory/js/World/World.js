import Vector2d from "../Vector/Vector2d/Vector2d.js";
import WorldData from "../WorldData/WorldData.js";
import Mineral from "../Mineral/Mineral.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";
import DistributionCenter from "../DistributionCenter/DistributionCenter.js";
import EventHandler from "../Utilities/EventHandler.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class World extends EventHandler {
	static WIDTH = 50;
	static HEIGHT = 50;
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
	#width;
	#height;
	#id;
	#mineralPositions;
	#map;
	#idMap;

	#buildings;

	#distributionCenter;

	constructor() {
		super();
		this.#unitSize = World.UNIT_SIZE;
		this.#width = World.WIDTH;
		this.#height = World.HEIGHT;
		this.#id = window.crypto.randomUUID();
		this.#map = new Map();
		this.#idMap = new Map();
		this.#mineralPositions = new Map([
			[Mineral.AETHERITE, []],
			[Mineral.PYROTITE, []],
			[Mineral.LUMINITE, []],
			[Mineral.OBSIDIANITE, []],
			[Mineral.ZENITHITE, []]
		]);
		for (let x = 0; x < World.WIDTH; x++) {
			for (let y = 0; y < World.HEIGHT; y++) {
				const worldData = new WorldData();
				this.#map.set((new Vector2d(x,y)).toString(), worldData);
			}
		}
		this.#buildings = new Map();

		this.#distributionCenter = new DistributionCenter();
		this.#initialize();
	}

	get unitSize() {
		return this.#unitSize;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	get id() {
		return this.#id;
	}

	get buildings() {
		return this.#buildings;
	}

	get distributionCenter() {
		return this.#distributionCenter;
	}

	#initialize() {
		const takenPositions = this.#distributionCenter.buildingPosition.map((position) => position.toString());
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
		if (Extractor.Has(building.type) || Purifier.Has(building.type) || Combinator.Has(building.type)) {
			building.setActive();
			this.#buildings.set(position.toString(), building);
		}
		building.setImage(image);
		const worldData = this.getPosition(position);
		worldData.addBuilding(building);
		if (Extractor.Has(building.type) && worldData.deposit?.type !== building.mineralType) {
			building.setInactive();
		}
		this.setPosition(position, worldData);
		this.#idMap.set(building.id, building);
		return true;
	}

	hasBuilding(position) {
		this.#validatePosition(position);
		const worldData = this.getPosition(position);
		return !!worldData.building;
	}

	getBuildingById(id) {
		return this.#idMap.get(id);
	}

	removeBuilding(position) {
		this.#validatePosition(position);
		const worldData = this.getPosition(position);
		if (!worldData.building) {
			return false;
		}
		GameEvent.Emit(GameEvent.BUILDING_REMOVED);
		const removedBuilding = worldData.removeBuilding();
		this.setPosition(position, worldData);
		this.#idMap.delete(removedBuilding.id);
		return removedBuilding;
	}

	getMineralDeposits(mineral) {
		if (!Mineral.Has(mineral)) {
			throw new Error('Invalid mineral provided');
		}
		return this.#mineralPositions.get(mineral);
	}

	#getRandomPosition(takenPositions) {
		let x = Math.floor(World.WIDTH / 2);
		let y = Math.floor(World.HEIGHT / 2);
		while (takenPositions.includes(new Vector2d(x, y).toString())) {
			x = Math.floor(Math.random() * World.WIDTH);
			y = Math.floor(Math.random() * World.HEIGHT);
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
		if (position.x >= World.WIDTH || position.y >= World.HEIGHT) {
			throw new Error('Position is an invalid position');
		}
	}
}