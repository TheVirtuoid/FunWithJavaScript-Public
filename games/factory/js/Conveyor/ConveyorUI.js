import Conveyor from "./Conveyor.js";

export default class ConveyorUI {


	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	preload() {
		Conveyor.TYPES.forEach(conveyor => {
			this.#scene.load.image(conveyor.description, `img/${conveyor.description}.png`);
		});
	};

}