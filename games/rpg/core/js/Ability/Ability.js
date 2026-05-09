export default class Ability {

	static STRENGTH = Symbol( 'strength');
	static DEXTERITY = Symbol( 'dexterity');
	static INTELLIGENCE = Symbol( 'intelligence');
	static WISDOM = Symbol( 'wisdom');
	static CHARISMA = Symbol( 'charisma');
	static CONSTITUTION = Symbol( 'constitution');

	static IsAbility(ability) {
		return Ability.#LIST.includes(ability);
	}

	static GetAbility(ability) {
		return Ability.#DATA.get(ability);
	}

	static #DATA = new Map([
		[Ability.STRENGTH, { name: 'Strength', abbreviation: 'STR' }],
		[Ability.DEXTERITY, { name: 'Dexterity', abbreviation: 'DEX' }],
		[Ability.INTELLIGENCE, { name: 'Intelligence', abbreviation: 'INT' }],
		[Ability.WISDOM, { name: 'Wisdom', abbreviation: 'WIS' }],
		[Ability.CHARISMA, { name: 'Charisma', abbreviation: 'CHA' }],
		[Ability.CONSTITUTION, { name: 'Constitution', abbreviation: 'CON' }],
	])

	static #LIST = [...Ability.#DATA.keys()];

	#type;
	#value;
	#bonus;

	constructor(args = {}) {
		const { type, value, bonus = 0 } = args;
		if (!Ability.IsAbility(type)) {
			throw new Error('Invalid ability type');
		}
		this.#type = type;
		this.setBonus(bonus);
		this.setValue(value);
	}

	get bonus() {
		return this.#bonus;
	}

	get type() {
		return this.#type;
	}

	get value() {
		return this.#value;
	}

	setBonus(bonus) {
		if (Number.isInteger(bonus)) {
			this.#bonus = bonus;
		} else {
			throw new Error('Bonus must be an integer');
		}
	}

	setValue(value) {
		if (Number.isInteger(value)) {
			this.#value = value;
		} else {
			throw new Error('Value must be an integer');
		}
	}
}