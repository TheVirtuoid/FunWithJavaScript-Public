import Alloy from "../Alloy/Alloy.js";

export default class CombinatorUI {

	static Preload = (scene) => {
		Alloy.TYPES.forEach(alloy => {
			const combinator = `combinator-${alloy.description}`;
			scene.load.image(combinator, `img/${combinator}.png`);
		});
	}


	constructor(combinator) {

	}
}