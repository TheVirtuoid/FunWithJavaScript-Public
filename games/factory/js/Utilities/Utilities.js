import Game from "../Game/Game.js";

export default class Utilities {

	static 	GridToPosition = (position) =>{
		return {
			x: position.x * Game.UNIT_SIZE + Game.HALF_SIZE,
			y: position.y * Game.UNIT_SIZE + Game.HALF_SIZE
		};
	}

	static PositionToGrid = (position) => {
		return {
			x: Math.floor(position.x / Game.UNIT_SIZE),
			y: Math.floor(position.y / Game.UNIT_SIZE)
		};
	}

	constructor() {
		throw new Error('Cannot instantiate. Static class');
	}
}