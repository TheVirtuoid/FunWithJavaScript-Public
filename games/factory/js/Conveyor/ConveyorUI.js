import Conveyor from "./Conveyor.js";

export default class ConveyorUI {

	static Preload = (scene) => {
		Conveyor.TYPES.forEach(conveyor => {
			scene.load.image(conveyor.description, `img/${conveyor.description}.png`);
		});
	};


	constructor(conveyor) {

	}
}