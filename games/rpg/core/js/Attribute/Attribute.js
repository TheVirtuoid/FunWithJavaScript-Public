import attributeData from './attributes.json' with { type: 'json' };

export default class Attribute {

	static LEVEL = Symbol('level');
	static EXPERIENCE = Symbol('experience');
	static ARMOR_CLASS = Symbol('armor-class');
	static HIT_POINTS = Symbol('hit-points');
	static ATTACK_BONUS = Symbol('attack-bonus');
	static GOLD_PIECES = Symbol('gold-pieces');

	static DEATH_POISON = Symbol('death-poison');
	static WANDS = Symbol('wands');
	static PARALYZE_STONE = Symbol('paralyze-stone');
	static DRAGON_BREATH = Symbol('dragon-breath');
	static SPELLS = Symbol('spells');

	static ATTRIBUTE_CATEGORY_CHARACTER = Symbol('attribute-category-character');
	static ATTRIBUTE_CATEGORY_SAVING_THROW = Symbol('attribute-category-saving-throw');
	static ATTRIBUTE_CATEGORY_MONEY = Symbol('attribute-category-money');

	static SYMBOLS = new Map([
		[Attribute.LEVEL.description, Attribute.LEVEL],
		[Attribute.EXPERIENCE.description, Attribute.EXPERIENCE],
		[Attribute.ARMOR_CLASS.description, Attribute.ARMOR_CLASS],
		[Attribute.HIT_POINTS.description, Attribute.HIT_POINTS],
		[Attribute.ATTACK_BONUS.description, Attribute.ATTACK_BONUS],
		[Attribute.GOLD_PIECES.description, Attribute.GOLD_PIECES],
		[Attribute.DEATH_POISON.description, Attribute.DEATH_POISON],
		[Attribute.WANDS.description, Attribute.WANDS],
		[Attribute.PARALYZE_STONE.description, Attribute.PARALYZE_STONE],
		[Attribute.DRAGON_BREATH.description, Attribute.DRAGON_BREATH],
		[Attribute.SPELLS.description, Attribute.SPELLS],
		[Attribute.ATTRIBUTE_CATEGORY_CHARACTER.description, Attribute.ATTRIBUTE_CATEGORY_CHARACTER],
		[Attribute.ATTRIBUTE_CATEGORY_SAVING_THROW.description, Attribute.ATTRIBUTE_CATEGORY_SAVING_THROW],
		[Attribute.ATTRIBUTE_CATEGORY_MONEY.description, Attribute.ATTRIBUTE_CATEGORY_MONEY],
	]);

	static #DATA = new Map(attributeData.map(({ type, name, category, abbreviation, description }) =>
		[Attribute.SYMBOLS.get(type), {
			type: Attribute.SYMBOLS.get(type),
			name,
			abbreviation,
			description,
			category: Attribute.SYMBOLS.get(category)
		}]));

	static #LIST = [...Attribute.#DATA.keys()];

	static IsAttribute(attributeType) {
		return Attribute.#LIST.includes(attributeType);
	}

	static GetAttribute(type) {
		const data = Attribute.#DATA.get(type);
		return data ? { ... data } : data;
	}

	#type;
	#value;
	#attributeData;

	constructor(args = {}) {
		const { type, value } = args;
		if (!Attribute.IsAttribute(type)) {
			throw new Error(`Invalid attribute type: ${type}`);
		}
		this.setValue(value);
		this.#type = type;
		this.#attributeData = Attribute.GetAttribute(type);
	}

	get type() {
		return this.#type;
	}

	get value() {
		return this.#value;
	}

	get category() {
		return this.#attributeData.category;
	}

	get name() {
		return this.#attributeData.name;
	}

	get abbreviation() {
		return this.#attributeData.abbreviation;
	}

	get description() {
		return this.#attributeData.description;
	}

	setValue(newValue) {
		if (!Number.isInteger(newValue)) throw new Error(
			`Attribute value must be an integer: ${newValue}`
		);
		this.#value = newValue;
	}

}