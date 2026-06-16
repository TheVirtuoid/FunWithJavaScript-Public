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
		const { name, race: raceId, characterClass: characterClassId } = args;
		this.#setRace(raceId);
		this.#setCharacterClass(characterClassId);
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

	#setRace(id) {
		if (!Race.IsRace(id))
		if (!(race instanceof Race)) {
			throw new Error('Invalid race');
		}
		this.#race = race;
	}

	#setCharacterClass(characterClass) {
		if (!(characterClass instanceof CharacterClass)) {
			throw new Error('Invalid character class');
		}
		this.#characterClass = characterClass;
	}

	addAbility(ability) {
		if (!(ability instanceof Ability)) {
			throw new Error('Invalid ability');
		}
		this.#abilities.set(ability.id, ability);
	}

	getAbility(abilityId) {
		if (!Ability.IsAbility(abilityId)) {
			throw new Error('Invalid ability id');
		}
		return this.#abilities.get(abilityId);
	}

	removeAbility(abilityId) {
		if (!Ability.IsAbility(abilityId)) {
			throw new Error('Invalid ability type');
		}
		this.#abilities.delete(abilityId);
	}

	/*addAttribute(attribute) {
		if (!(attribute instanceof Attribute)) {
			throw new Error('Invalid attribute');
		}
		this.#attributes.set(attribute.type, attribute);
	}*/

	/*getAttribute(attributeType) {
		if (!Attribute.IsAttribute(attributeType)) {
			throw new Error('Invalid attribute type');
		}
		return this.#attributes.get(attributeType);
	}*/

	/*removeAttribute(attributeType) {
		if (!Attribute.IsAttribute(attributeType)) {
			throw new Error('Invalid attribute type');
		}
		this.#attributes.delete(attributeType);
	}*/

}