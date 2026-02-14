import Conveyor from "./Conveyor.js";

export default class ConveyorUI {


	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createConveyor(type) {
		const conveyor = new Conveyor({ type });
		conveyor.setImage(`conveyor-${type.description}`);
		return conveyor;
	}

	preload() {
		Conveyor.TYPES.forEach(conveyor => {
			this.#scene.load.image(conveyor.description, `img/${conveyor.description}.png`);
		});
	};

}