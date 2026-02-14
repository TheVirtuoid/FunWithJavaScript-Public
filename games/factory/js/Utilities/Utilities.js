import Game from "../Game/Game.js";

export default class Utilities {

	static 	GridToPosition = (position) =>{
		return {
			x: position.x * Game.UNIT_SIZE + Game.HALF_SIZE,
			y: position.y * Game.UNIT_SIZE + Game.HALF_SIZE
		};
	}

	constructor() {
		throw new Error('Cannot instantiate. Static class');
	}
}