import Conveyor from "./Conveyor.js";

export default class ConveyorUI {

	static Preload = (scene) => {
		Conveyor.TYPES.forEach(conveyor => {
			scene.load.image(conveyor.description, `img/${conveyor.description}.png`);
		});
	};

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createConveyor(type) {
		const conveyor = new Conveyor({ type });
		conveyor.setImage(`conveyor-${type.description}`);
		return conveyor;
	}
}