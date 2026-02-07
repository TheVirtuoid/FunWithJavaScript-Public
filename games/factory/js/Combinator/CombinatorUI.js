import Alloy from "../Alloy/Alloy.js";
import Combinator from "./Combinator.js";

export default class CombinatorUI {

	static Preload = (scene) => {
		Alloy.TYPES.forEach(alloy => {
			const combinator = `combinator-${alloy.description}`;
			scene.load.image(combinator, `img/${combinator}.png`);
		});
	}

	#scene;
	#image;

	constructor(scene) {
		this.#scene = scene;
	}

	createCombinator(type) {
		const combinator = new Combinator({ type });
		combinator.setImage(`combinator-${type.description}`);
		return combinator;
	}

}