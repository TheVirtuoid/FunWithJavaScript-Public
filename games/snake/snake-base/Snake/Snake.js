import Game from "../Game/Game.js";
import Head from "../Head/Head.js";

export default class Snake {
	#game;
	#id;
	#ui;
	#head;
	#body;

	constructor(args = {}) {
		const { game, id = window.crypto.randomUUID() } = args;
		if (!(game instanceof Game)) {
			throw new Error(`'game' property must be an instance of Game`);
		}
		this.#game = game;
		this.#id = id;
		this.#head = new Head({ game });
	}

	get id() {
		return this.#id;
	}
}