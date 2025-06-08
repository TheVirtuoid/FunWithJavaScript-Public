import {setButtons} from "../buttons.js";
import Ui from "../../src/classes/Ui/Ui.js";
import {HemisphericLight, Vector3} from "@babylonjs/core";

export default class Race {
	#engine;
	#scene;
	#canvas;
	#camera;
	#ui;
	#light;
	#groundMaterial;
	#ground;
	#wallMaterial;
	#groundWallNorth;
	#groundWallSouth;
	#groundWallEast;
	#groundWallWest;

	constructor() {
		setButtons(['back', 'exit']);
		this.#canvas = document.getElementById('world');
		this.#ui = new Ui({
			canvas: this.#canvas,
			name: 'FWJS'
		});
		this.start();
	}

	start() {
		this.#initialize()
			.then(this.#render.bind(this));
	}

	async #initialize() {
		const width = document.body.offsetWidth * .8;
		const height = width / 16 * 9;
		this.#canvas.width = width;
		this.#canvas.height = height;
		this.#engine = Ui.CreateEngine();
		this.#scene = Ui.CreateScene();
		this.#camera = Ui.CreateCamera({
			position: {x: 0, y: 60, z: -100},
			target: {x: 0, y: 0, z: 0}
		});
		this.#light = Ui.CreateLight({ position: { x: -1, y: 1, z: 0 } });
		await Ui.LoadPhysics();
		this.#groundMaterial = Ui.CreateMaterial({name: 'groundMaterial', diffuseColor: { r: 0, g: .5, b: 0 } });
		this.#wallMaterial = Ui.CreateMaterial({name: 'wallMaterial', diffuseColor: { r: 0, g: 0, b: 0 } });
		this.#ground = Ui.CreateGround({ position: { x: 0, y: -20, z: 0 }, name: 'ground', material: this.#groundMaterial, width: 100, height: 100 });
		this.#groundWallNorth = Ui.CreateBox({
			position: { x: 0, y: -18, z: -50 },
			name: 'groundWallNorth',
			material: this.#wallMaterial,
			width: 100,
			height: 4,
			depth: 1,
			physicsOptions: { mass: 0, friction: 1 }
		});
		this.#groundWallSouth = Ui.CreateBox({
			position: { x: 0, y: -18, z: 50 },
			name: 'groundWallSouth',
			material: this.#wallMaterial,
			width: 100,
			height: 4,
			depth: 1,
			physicsOptions: { mass: 0, friction: 1 }
		});
		this.#groundWallEast = Ui.CreateBox({
			position: { x: -50, y: -18, z: 0 },
			name: 'groundWallNorth',
			material: this.#wallMaterial,
			width: 1,
			height: 4,
			depth: 100,
			physicsOptions: { mass: 0, friction: 1 }
		});
		this.#groundWallWest = Ui.CreateBox({
			position: { x: 50, y: -18, z: 0 },
			name: 'groundWallNorth',
			material: this.#wallMaterial,
			width: 1,
			height: 4,
			depth: 100,
			physicsOptions: { mass: 0, friction: 1 }
		});

	}

	#render() {
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
		});
	}


}