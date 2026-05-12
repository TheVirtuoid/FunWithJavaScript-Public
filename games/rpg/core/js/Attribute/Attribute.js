import {UpdateAttractorBlock} from "@babylonjs/core";

export default class Attribute {

	static LEVEL = Symbol('level');
	static EXPERIENCE = Symbol('experience');
	static ARMOR_CLASS = Symbol('armor-class');
	static HIT_POINTS = Symbol('hit-points');
	static ATTACK_BONUS = Symbol('attack-bonus');
	static MONEY = Symbol('money');

	static DEATH_POISON = Symbol('death-poison');
	static WANDS = Symbol('wands');
	static PARALYZE_STONE = Symbol('paralyze-stone');
	static DRAGON_BREATH = Symbol('dragon-breath');
	static SPELLS = Symbol('spells');

	static CHARACTER = Symbol('character');
	static SAVING_THROW = Symbol('saving-throw');

	static #DATA = new Map([
		[Attribute.LEVEL, { name: 'Level', abbreviation: 'lvl', attributeType: Attribute.CHARACTER }],
		[Attribute.EXPERIENCE, { name: 'Experience', abbreviation: 'xp', attributeType: Attribute.CHARACTER }],
		[Attribute.ARMOR_CLASS, { name: 'Armor class', abbreviation: 'ac', attributeType: Attribute.CHARACTER }],
		[Attribute.HIT_POINTS, { name: 'Hit points', abbreviation: 'hp', attributeType: Attribute.CHARACTER }],
		[Attribute.ATTACK_BONUS, { name: 'Attack bonus', abbreviation: 'atk', attributeType: Attribute.CHARACTER }],
		[Attribute.MONEY, { name: 'Money', abbreviation: 'gp', attributeType: Attribute.CHARACTER }],
		[Attribute.DEATH_POISON, { name: 'Death poison', abbreviation: '', attributeType: Attribute.SAVING_THROW }],
		[Attribute.WANDS, { name: 'Wands', abbreviation: '', attributeType: Attribute.SAVING_THROW }],
		[Attribute.PARALYZE_STONE, { name: 'Paralyze stone', abbreviation: '', attributeType: Attribute.SAVING_THROW }],
		[Attribute.DRAGON_BREATH, { name: 'Dragon breath', abbreviation: '', attributeType: Attribute.SAVING_THROW }],
		[Attribute.SPELLS, { name: 'Spells', abbreviation: '', attributeType: Attribute.SAVING_THROW }]
	]);

	static #LIST = [...Attribute.#DATA.keys()];

	static IsAttribute(attributeType) {
		return Attribute.#LIST.includes(attributeType);
	}

	static GetAttribute(type) {
		const data = Attribute.#DATA.get(type);
		return data ? { ... data } : data;
	}

	static IsAttributeOfType(type, attributeType) {
		const data = Attribute.GetAttribute(type);
		return data?.attributeType === attributeType;
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