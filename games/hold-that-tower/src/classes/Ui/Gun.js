import Position from "../Position.js";
import GunPosition from "../../enums/GunPosition.js";

export default class Gun {
	static NAME = 'gun';
	static IMAGE_URL = '/src/images/gun.png';
	static DEFAULT_SCALE = 0.1;

	#scene;
	#scale;
	#image;
	#position;
	#rotation;
	#visible;
	#angle;
	#placement;
	#centerX;
	#centerY;
	#radius;

	constructor(args = {}) {
		const { centerX, centerY, radius, placement, scene, scale, position = new Position(0, 0), rotation = 0, visible = true } = args;
		this.#scene = scene;
		this.#scale = scale || Gun.DEFAULT_SCALE;
		this.#position = position;
		this.#rotation = rotation;
		this.#visible = visible;
		this.#placement = placement;
		this.#angle = GunPosition.ANGLES.get(placement);
		this.#centerX = centerX;
		this.#centerY = centerY;
		this.#radius = radius;
	}

	get scene() {
		return this.#scene;
	}

	get scale() {
		return this.#scale;
	}

	get rotation() {
		return this.#rotation;
	}

	get position() {
		return this.#position;
	}

	get image() {
		return this.#image;
	}

	get visible() {
		return this.#visible;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	get angle() {
		return this.#angle;
	}

	get placement() {
		return this.#placement;
	}

	setAngle(angle) {
		this.#angle = angle;
	}

	static preload(scene) {
		scene.load.image(Gun.NAME, Gun.IMAGE_URL);
	}

	create(args = {}) {
		const gunAngle = GunPosition.ANGLES.get(this.placement); // Get the angle for the clock position
		this.#position = this.getPositionOnCircle(gunAngle);
		this.#image = this.#scene.add.image(this.position.x, this.position.y, Gun.NAME).setScale(this.scale);
		this.setRotation(gunAngle + Math.PI / 2);
	}

	resetPosition() {
		this.#angle = GunPosition.ANGLES.get(this.placement); // Get the angle for the clock position
		this.#position = this.getPositionOnCircle(this.#angle);
		this.#image = this.#scene.add.image(this.x, this.y, Gun.NAME).setScale(this.scale);
		this.setRotation(this.#angle + Math.PI / 2);
	}

	setPosition(position) {
		this.#position = position;
		if (this.#image) {
			this.#image.setPosition(this.position.x, this.position.y);
		}
	}

	setRotation(rotation) {
		this.#rotation = rotation;
		if (this.#image) {
			this.#image.setRotation(rotation);
		}
	}

	setVisible(visible) {
		this.#visible = visible;
		if (this.#image) {
			this.#image.setVisible(this.visible);
		}
	}

	getPositionOnCircle(angle) {
		return {
			x: this.#centerX + this.#radius * Math.cos(angle),
			y: this.#centerY + this.#radius * Math.sin(angle)
		};
	}
}