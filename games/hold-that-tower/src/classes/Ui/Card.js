export default class Card {
	#scene;
	#position;

	constructor(args = {}) {
		const { scene, position } = args;
		this.#scene = scene;
		this.#position = position;
	}

	create() {
		this.#scene.add.rectangle(this.#position.x, this.#position.y, 200, 300, 0x116611, 1)
			.setStrokeStyle(2, 0xffffff);
	}
}