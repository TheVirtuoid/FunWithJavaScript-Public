import Alloy from "../Alloy/Alloy.js";
import Combinator from "./Combinator.js";

export default class CombinatorUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createCombinator(type) {
		const combinator = new Combinator({ type });
		combinator.setImage(`combinator-${type.description}`);
		return combinator;
	}

	preload() {
		Alloy.TYPES.forEach(alloy => {
			const combinator = `combinator-${alloy.description}`;
			this.#scene.load.image(combinator, `img/${combinator}.png`);
		});
	}

}