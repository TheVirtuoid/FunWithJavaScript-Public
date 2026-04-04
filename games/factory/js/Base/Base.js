import Vector2d from "../Vector/Vector2d/Vector2d.js";

export default class Base {
	#id;
	#type;
	#position;
	#level;
	#orientation;
	#directionVector;
	#active;
	#purity;
	#image;
	#startingDirectionVector;
	#endingDirectionVector;

	#upgrade;
	#speed;
	#cost;
	#price;

	constructor(args = {}) {
		const { speed = Number.POSITIVE_INFINITY, cost = Number.POSITIVE_INFINITY, price = Number.POSITIVE_INFINITY, upgrade = {}, image, purity, type, position = new Vector2d(0, 0), orientation = 0, directionVector = Vector2d.Down(), startingDirectionVector = [], endingDirectionVector = [] } = args;
		this.#id = window.crypto.randomUUID();
		this.#type = type;
		this.#level = 1;
		this.#active = true;
		this.#image = this.setImage(image);
		this.setPurity(purity || 0);
		this.setPosition(position);
		this.setOrientation(orientation);
		this.setDirectionVector(directionVector);
		this.setSpeed(speed);
		this.setCost(cost);
		this.setPrice(price);
		this.setUpgrade(upgrade);
		this.#startingDirectionVector = startingDirectionVector;
		this.#endingDirectionVector = endingDirectionVector;
	}

	get id() {
		return this.#id;
	}
	get type() {
		return this.#type;
	}
	get position() {
		return this.#position;
	}
	get level() {
		return this.#level;
	}
	get orientation() {
		return this.#orientation;
	}
	get directionVector() {
		return this.#directionVector.clone();
	}
	get active() {
		return this.#active;
	}
	get purity() {
		return this.#purity;
	}
	get image() {
		return this.#image;
	}
	get startingDirectionVector() {
		return this.#startingDirectionVector;
	}
	get endingDirectionVector() {
		return this.#endingDirectionVector;
	}
	get upgrade() {
		return this.#upgrade;
	}
	get speed() {
		return this.#speed;
	}
	get cost() {
		return this.#cost;
	}
	get price() {
		return this.#price;
	}

	setPosition(position) {
		if (!(position instanceof Vector2d)) {
			throw new Error('Position must be a Vector2d');
		}
		this.#position = position;
	}

	incrementLevel() {
		this.#level++;
	}

	setInactive() {
		this.#active = false;
	}

	setActive() {
		this.#active = true;
	}

	setPurity(purity) {
		if (purity < 0 || purity > 1) {
			throw new Error('Purity must be between 0 and 1 inclusive');
		}
		purity = Math.max(0, Math.min(purity, 1));
		this.#purity = purity;
	}

	setUpgrade(upgrade) {
		this.#upgrade = upgrade;
	}

	setPrice(price) {
		this.#price = price;
	}
	setCost(cost) {
		this.#cost = cost;
	}
	setSpeed(speed) {
		this.#speed = speed;
	}

	setOrientation(orientation) {
		if (![0, 90, 180, 270].includes(orientation)) {
			throw new Error(`Invalid orientation: ${orientation}`);
		}
		this.#orientation = orientation;
	}

	setDirectionVector(directionVector) {
		if (!(directionVector instanceof Vector2d)) {
			throw new Error('Direction vector must be a Vector2d');
		}
		this.#directionVector = directionVector;
	}

	setImage(image) {
		this.#image = image;
	}

	setStartingDirectionVector(startingDirectionVector) {
		this.#startingDirectionVector = this.#setDirectionVector(startingDirectionVector);
	}

	setEndingDirectionVector(endingDirectionVector) {
		this.#endingDirectionVector = this.#setDirectionVector(endingDirectionVector);
	}

	#setDirectionVector(directionVector) {
		if (!Array.isArray(directionVector)) {
			throw new Error('Direction vector must be an array of Vector2d');
		}
		if (directionVector.some((vector) => !(vector instanceof Vector2d))) {
			throw new Error('Direction vector must be an array of Vector2d');
		}
		return directionVector;
	}
}