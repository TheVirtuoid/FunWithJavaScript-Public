export default class Dice {

	#descriptor;
	#numberOfSides;
	#numberOfDice;

	static Roll(descriptor) {
		const { numberOfDice, numberOfSides } = Dice.#parseDescriptor(descriptor);
		return Dice.#rollTheDice(numberOfDice, numberOfSides);
	}

	static #rollTheDice(numberOfDice, numberOfSides) {
		let sum = 0;
		for (let i = 0; i < numberOfDice; i++) {
			const roll = Math.floor(Math.random() * numberOfSides) + 1;
			sum += roll;
		}
		return sum;
	}


	static #parseDescriptor(descriptor) {
		if (typeof(descriptor) !== 'string') {
			throw new Error('Dice: Descriptor must be a string');
		}
		if (descriptor === '') {
			throw new Error('Dice: Descriptor cannot be empty');
		}
		const descriptorParts = descriptor.split(/[dD]/);
		if (descriptorParts.length !== 2) {
			throw new Error('Dice: Descriptor must be in the format "xdy"');
		}
		if (descriptorParts[0] === '') {
			descriptorParts[0] = '1';
		}
		const numberOfDice = Number(descriptorParts[0]);
		const numberOfSides = Number(descriptorParts[1]);
		if (!Number.isInteger(numberOfDice)) {
			throw new Error('Dice: Number of dice must be an integer');
		}
		if (!Number.isInteger(numberOfSides)) {
			throw new Error('Dice: Number of sides must be an integer');
		}
		if (numberOfSides < 2) {
			throw new Error('Dice: Number of sides must be greater than 1');
		}
		if (numberOfDice < 1) {
			throw new Error('Dice: Number of dice must be greater than 0');
		}
		return { numberOfDice, numberOfSides };
	}

	constructor(descriptor = null) {
		if (descriptor !== null) {
			const { numberOfSides, numberOfDice } = Dice.#parseDescriptor(descriptor);
			this.#numberOfSides = numberOfSides;
			this.#numberOfDice = numberOfDice;
		}
		this.#descriptor = descriptor;
	}

	get descriptor() {
		return this.#descriptor;
	}

	roll(descriptor = this.descriptor) {
		if (this.#numberOfDice && this.#numberOfSides && descriptor === this.descriptor) {
			return Dice.#rollTheDice(this.#numberOfDice, this.#numberOfSides);
		} else {
			return Dice.Roll(descriptor);
		}
	}

}
