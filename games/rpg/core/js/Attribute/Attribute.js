export default class Attribute {

	static LEVEL = Symbol('level');
	static EXPERIENCE = Symbol('experience');
	static ARMOR_CLASS = Symbol('armor-class');
	static HIT_POINTS = Symbol('hit-points');
	static ATTACK_BONUS = Symbol('attack-bonus');
	static MONEY = Symbol('money');

	static #DATA = new Map([
		[Attribute.LEVEL, { name: 'Level', abbreviation: 'lvl' }],
		[Attribute.EXPERIENCE, { name: 'Experience', abbreviation: 'xp' }],
		[Attribute.ARMOR_CLASS, { name: 'Armor class', abbreviation: 'ac' }],
		[Attribute.HIT_POINTS, { name: 'Hit points', abbreviation: 'hp' }],
		[Attribute.ATTACK_BONUS, { name: 'Attack bonus', abbreviation: 'atk' }],
		[Attribute.MONEY, { name: 'Money', abbreviation: 'gp' }]
	]);

	static #LIST = [...Attribute.#DATA.keys()];

	static IsAttribute(attributeType) {
		return Attribute.#LIST.includes(attributeType);
	}

	static GetAttribute(attributeType) {
		const data = Attribute.#DATA.get(attributeType);
		return data ? { ... data } : data;
	}

	#type;
	#value;

	constructor(args = {}) {
		const { type, value } = args;
		if (!Attribute.IsAttribute(type)) {
			throw new Error(`Invalid attribute type: ${type}`);
		}
		this.setValue(value);
		this.#type = type;
	}

	get type() {
		return this.#type;
	}

	get value() {
		return this.#value;
	}

	setValue(newValue) {
		if (!Number.isInteger(newValue)) throw new Error(
			`Attribute value must be an integer: ${newValue}`
		);
		this.#value = newValue;
	}

}