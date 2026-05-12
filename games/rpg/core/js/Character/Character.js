import Race from "../Race/Race.js";
import CharacterClass from "../CharacterClass/CharacterClass.js";
import Ability from "../Ability/Ability.js";
import Attribute from "../Attribute/Attribute.js";

export default class Character {

	#id;
	#name;
	#race;
	#characterClass;
	#abilities;
	#attributes;

	constructor(args = {}) {
		const { name, race: raceType, characterClass: characterClassType } = args;
		this.setRace(raceType);
		this.setCharacterClass(characterClassType);
		this.setName(name);
		this.#id = window.crypto.randomUUID();
		this.#abilities = new Map();
		this.#attributes = new Map();
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get race() {
		return this.#race;
	}

	get characterClass() {
		return this.#characterClass;
	}

	setName(name) {
		if (typeof name !== 'string' || name.trim() === '') {
			throw new Error('Name must be a string');
		}
		this.#name = name;
	}

	setRace(raceType) {
		if (!Race.IsRace(raceType)) {
			throw new Error('Invalid race type');
		}
		this.#race = new Race({ type: raceType });
	}

	setCharacterClass(characterClassType) {
		if (!CharacterClass.IsCharacterClass(characterClassType)) {
			throw new Error('Invalid character class type');
		}
		this.#characterClass = new CharacterClass({ type: characterClassType});
	}

	addAbility(ability) {
		if (!(ability instanceof Ability)) {
			throw new Error('Invalid ability');
		}
		this.#abilities.set(ability.type, ability);
	}

	getAbility(abilityType) {
		if (!Ability.IsAbility(abilityType)) {
			throw new Error('Invalid ability type');
		}
		return this.#abilities.get(abilityType);
	}

	removeAbility(abilityType) {
		if (!Ability.IsAbility(abilityType)) {
			throw new Error('Invalid ability type');
		}
		this.#abilities.delete(abilityType);
	}

	addAttribute(attribute) {
		if (!(attribute instanceof Attribute)) {
			throw new Error('Invalid attribute');
		}
		this.#attributes.set(attribute.type, attribute);
	}

	getAttribute(attributeType) {
		if (!Attribute.IsAttribute(attributeType)) {
			throw new Error('Invalid attribute type');
		}
		return this.#attributes.get(attributeType);
	}

	removeAttribute(attributeType) {
		if (!Attribute.IsAttribute(attributeType)) {
			throw new Error('Invalid attribute type');
		}
		this.#attributes.delete(attributeType);
	}

}