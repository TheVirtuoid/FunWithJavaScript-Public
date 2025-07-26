export default class MockScene {
	constructor() {
		// Mock the physics system
		this.physics = {
			add: {
				image: (x, y, texture)  => this,
			}
		};

		this.setScale = () => this;

		// Mock the loader
		this.load = {
			image: (key, url) => this
		};

		// Mock the add system
		this.add = {
			image: (x, y, texture) => this,
			rectangle: () => this
		};

		this.events = {
			on: (event, fn) => this,
			emit: (event, ...args) => this
		};
	}


	setVisible() {
		return this;
	}

	// Mock scene methods
	create() {
		return this;
	}
	update() {
		return this;
	}
	setRotation() {
		return this;
	}

	setPosition() {
		return this;
	}
}