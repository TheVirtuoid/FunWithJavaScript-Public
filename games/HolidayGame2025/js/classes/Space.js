export default class Space {
	#scene;
	#leftInset = 450;
	#margin = 10;
	#left;
	#top;
	#width;
	#height;

	constructor(scene) {
		this.#scene = scene;
		const { width: cameraWidth, height: cameraHeight } = this.#scene.cameras.main;
		this.#left = this.#leftInset + this.#margin;
		this.#top = this.#margin;
		this.#width = cameraWidth - this.#leftInset - this.#margin * 2;
		this.#height = cameraHeight - this.#margin * 2;
		this.#scene.physics.world.setBounds(this.left, this.top, this.width, this.height);
		this.#scene.add.rectangle(this.left, this.top, this.width, this.height, 0x1a1a2e)
			.setOrigin(0, 0)
			.setDepth(-1); // Ensure it is drawn behind the game objects
		const { width, height } = this.#scene.cameras.main;
		const middleX = Math.floor(width / 2);
		const middleY = Math.floor(height / 2);
	}

	get width () {
		return this.#width;
	}
		get left () {
		return this.#left;
	}
	get top () {
		return this.#top;
	}
	get height () {
		return this.#height;
	}
	get midPoint() {
		return { x: this.left + this.width / 2, y: this.top + this.height / 2 };
	}
	get right() {
		return this.left + this.width;
	}
	get bottom() {
		return this.top + this.height;
	}
}