import crypto from 'crypto';
import Race from "../Race/Race.js";
import CharacterClass from "../CharacterClass/CharacterClass.js";
import RaceData from "../RaceData/RaceData.js";
import CharacterClassData from "../CharacterClassData/CharacterClassData.js";
import Ability from "../Ability/Ability.js";
import Attribute from "../Attribute/Attribute.js";
import Equipment from "../Equipment/Equipment.js";

export default class Character {

	#id;
	#name;
	#raceData;
	#characterClassData;
	#abilities;
	#attributes;
	#inventory;

	constructor(args = {}) {
		const { name, race, characterClass, abilities = [], attributes = []  } = args;
		this.setName(name);
		this.#setRace(race);
		this.setCharacterClass(characterClass);
		this.#setAbilities(abilities);
		this.#setAttributes(attributes);
		this.#id = crypto.randomUUID();
		this.#inventory = new Map();
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get race() {
		return this.#raceData;
	}

	get characterClass() {
		return this.#characterClassData;
	}

	get abilities() {
		return [...this.#abilities.entries()].map(([id, ability]) => ({ id, ability }));
	}

	get attributes() {
		return [...this.#attributes.entries()].map(([id, attribute]) => ({id, attribute }));
	}

	get inventory() {
		return [...this.#inventory.entries()].map(([id, item]) => ({ id, item }));
	}

	setName(name) {
		if (typeof name !== 'string' || name.trim() === '') {
			throw new Error('Name must be a string');
		}
		this.#name = name;
	}

	#setRace(id) {
		if (id === null) {
			this.#raceData = null;
		} else {
			if (!Race.IsRace(id) && id !== null) {
				throw new Error('Invalid race id');
			}
			this.#raceData = new RaceData(Race.GetRaceData(id));
		}
	}

	#setAbilities(abilities) {
		if (!Array.isArray(abilities)) {
			throw new Error('Abilities must be an array');
		}
		this.#abilities = new Map(abilities.map((ability) => [ability.id, ability]));
	}

	#setAttributes(attributes) {
		if (!Array.isArray(attributes)) {
			throw new Error('Attributes must be an array');
		}
		this.#attributes = new Map(attributes.map((attribute) => [attribute.id, attribute]));
	}

	setCharacterClass(id) {
		if (id === null) {
			this.#characterClassData = null;
		} else {
			if (!CharacterClass.IsCharacterClass(id)) {
				throw new Error('Invalid character class id');
			}
			this.#characterClassData = new CharacterClassData(CharacterClass.GetCharacterClassData(id));
		}
	}

	addAbility(ability)	{
		if (!(ability instanceof Ability)) {
			throw new Error('Ability must be an instance of Ability');
		}
		if (this.#abilities.has(ability.id)) {
			throw new Error('Ability already exists');
		}
		this.#abilities.set(ability.id, ability);
	}

	removeAbility(id) {
		if (typeof id !== 'string') {
			throw new Error('Ability id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Ability id cannot be empty');
		}
		const removedAbility = this.#abilities.get(id);
		if (removedAbility) {
			this.#abilities.delete(id);
		}
		return removedAbility;
	}

	getAbility(id) {
		if (typeof id !== 'string') {
			throw new Error('Ability id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Ability id cannot be empty');
		}
		return this.#abilities.get(id);
	}

	addAttribute(attribute)	{
		if (!(attribute instanceof Attribute)) {
			throw new Error('Attribute must be an instance of Attribute');
		}
		if (this.#attributes.has(attribute.id)) {
			throw new Error('Attribute already exists');
		}
		this.#attributes.set(attribute.id, attribute);
	}

	removeAttribute(id) {
		if (typeof id !== 'string') {
			throw new Error('Attribute id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Attribute id cannot be empty');
		}
		const removedAttribute = this.#attributes.get(id);
		if (removedAttribute) {
			this.#attributes.delete(id);
		}
		return removedAttribute;
	}

	getAttribute(id) {
		if (typeof id !== 'string') {
			throw new Error('Attribute id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Attribute id cannot be empty');
		}
		return this.#attributes.get(id);
	}

	addInventory(args = {}) {
		const { id, quantity} = args;
		if (typeof id !== 'string') {
			throw new Error('Equipment id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Equipment id cannot be empty');
		}
		if (!Number.isInteger(quantity)) {
			throw new Error('Quantity must be an integer');
		}
		if (!this.#inventory.has(id)) {
			this.#inventory.set(id, { id, quantity });
		} else {
			const item = this.#inventory.get(id);
			item.quantity += quantity;
			this.#inventory.set(id, item);
		}
	}

	removeInventory(id) {
		if (typeof id !== 'string') {
			throw new Error('Equipment id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Equipment id cannot be empty');
		}
		const removedItem = this.#inventory.get(id);
		if (removedItem) {
			this.#inventory.delete(id);
		}
		return removedItem;
	}

	getInventory(id) {
		if (typeof id !== 'string') {
			throw new Error('Equipment id must be a string');
		}
		if (id.trim() === '') {
			throw new Error('Equipment id cannot be empty');
		}
		const item = this.#inventory.get(id);
		return item ? item : { id: undefined, quantity: 0 };
	}

}