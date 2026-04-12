import Alloy from "../Alloy/Alloy.js";

export default class CombinatorUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	preload() {
		Alloy.TYPES.forEach(alloy => {
			const combinator = `combinator-${alloy.description}`;
			this.#scene.load.image(combinator, `img/${combinator}.png`);
		});
	}

}