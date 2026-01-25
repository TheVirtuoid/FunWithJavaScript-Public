import Game from "../Game/Game.js";

export default class GroundUI {

	static Preload(scene) {
		scene.load.image('ground', 'img/ground.png');
	}

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	place = (args = {}) => {
		const { position, piece, orientation = 0 } = args;
		const { x, y } = position;
		const screenX = x * Game.UNIT_SIZE - Game.HALF_SIZE;
		const screenY = y * Game.UNIT_SIZE - Game.HALF_SIZE;
		const image = this.#scene.add.image(screenX, screenY, piece);
		switch(orientation) {
			case 90:
				image.rotation = Math.PI / 2;
				break;
			case 180:
				image.rotation = Math.PI;
				break;
			case 270:
				image.rotation = 3 * Math.PI / 2;
				break;
		}
	};
}