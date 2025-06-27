import {setButtons} from "../buttons.js";
import Ui from "../../src/classes/Ui/Ui.js";
import {HemisphericLight, Vector3} from "@babylonjs/core";
import Ground from "./Ground.js";

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

	#id = 'race';

	constructor() {
		setButtons(['back', 'exit']);
		this.#canvas = document.getElementById('world');
		this.#ui = new Ui({
			canvas: this.#canvas,
			name: 'FWJS'
		});
		this.start();
	}

	get id() {
		return this.#id;
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

		this.#ground = new Ground(this.id);
		this.#ground.render();

		// retrieve the layout
	}

	#render() {
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
		});
	}


}