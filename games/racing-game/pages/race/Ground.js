import Ui from "../../src/classes/Ui/Ui.js";
import {genId} from "../../src/classes/Ui/Utilities.js";

export default class Ground {

	static WIDTH = 200;
	static HEIGHT = 200;
	static SUBDIVISIONS = 256;

	static DEPTH = -85;
	#base;
	#northWall;
	#eastWall;
	#westWall;
	#southWall;

	#groundMaterial;
	#wallMaterial;

	#id;

	constructor(id) {
		this.#id = id;
	}

	get id() {
		return this.#id;
	}

	render() {
		this.#groundMaterial = Ui.CreateMaterial({name: genId(this.id, 'groundMaterial'), diffuseColor: { r: 0, g: .5, b: 0 } });
		this.#wallMaterial = Ui.CreateMaterial({name: genId(this.id, 'wallMaterial'), diffuseColor: { r: 0, g: 0, b: 0 } });
		this.#base = Ui.CreateGround({ position: { x: 0, y: Ground.DEPTH, z: Ground.WIDTH / 2 }, name: genId(this.id, 'ground'), material: this.#groundMaterial, width: Ground.WIDTH, height: Ground.HEIGHT });
		this.#northWall = Ui.CreateBox({
			position: { x: 0, y: Ground.DEPTH, z: Ground.HEIGHT },
			name: genId(this.id, 'groundWallNorth'),
			material: this.#wallMaterial,
			width: Ground.WIDTH,
			height: 4,
			depth: 1,
			physicsOptions: { mass: 0, friction: 1 }
		});
		this.#southWall = Ui.CreateBox({
			position: { x: 0, y: Ground.DEPTH, z: 0 },
			name: genId(this.id, 'groundWallSouth'),
			material: this.#wallMaterial,
			width: Ground.WIDTH,
			height: 4,
			depth: 1,
			physicsOptions: { mass: 0, friction: 1 }
		});
		this.#eastWall = Ui.CreateBox({
			position: { x: Ground.WIDTH / 2, y: Ground.DEPTH, z: Ground.HEIGHT / 2 },
			name: genId(this.id, 'groundWallNorth'),
			material: this.#wallMaterial,
			width: 1,
			height: 4,
			depth: Ground.HEIGHT,
			physicsOptions: { mass: 0, friction: 1 }
		});
		this.#westWall = Ui.CreateBox({
			position: { x: -Ground.WIDTH / 2, y: Ground.DEPTH, z: Ground.HEIGHT / 2 },
			name: genId(this.id,'groundWallNorth'),
			material: this.#wallMaterial,
			width: 1,
			height: 4,
			depth: Ground.HEIGHT,
			physicsOptions: { mass: 0, friction: 1 }
		});

	}
}