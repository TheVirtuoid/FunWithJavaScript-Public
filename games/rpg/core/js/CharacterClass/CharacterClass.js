import crypto from 'crypto';
import Ability from '../Ability/Ability.js';
import { validateUUID } from '../Utilities/utilities.js';

export default class CharacterClass {

	static RESTRICTION_MINIMUM_ABILITY = Symbol('restriction-minimum-ability');
	static RESTRICTION_WEAPON_SHARPNESS = Symbol('restriction-weapon-sharpness');
	static RESTRICTION_ARMOR_TYPE = Symbol('restriction-armor-type');
	static RESTRICTION_WEAPON_TYPE = Symbol('restriction-weapon-type');

	static RESTRICTION_SYMBOLS = [
		CharacterClass.RESTRICTION_MINIMUM_ABILITY,
		CharacterClass.RESTRICTION_WEAPON_SHARPNESS,
		CharacterClass.RESTRICTION_ARMOR_TYPE,
		CharacterClass.RESTRICTION_WEAPON_TYPE
	];

	#id;
	#name;
	#description;
	#levelData;
	#restrictions;

	constructor(args = {}) {
		const { name, description, levelData, restrictions } = args;

		if (typeof name !== 'string') {
			throw new Error('CharacterClass: name must be a string');
		}
		if (typeof description !== 'string') {
			throw new Error('CharacterClass: description must be a string');
		}
		this.#validateLevelData(levelData);
		this.#validateRestrictions(restrictions);

		this.#id = crypto.randomUUID();
		this.#name = name;
		this.#description = description;
		this.#levelData = levelData;
		this.#restrictions = restrictions;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get levelData() {
		return [...this.#levelData];
	}

	get restrictions() {
		return [...this.#restrictions];
	}

	#validateLevelData(levelData) {
		if (!Array.isArray(levelData)) {
			throw new Error('CharacterClass: levelData must be an array');
		}
		// how level data is constructed at this point is up to the classes
	}

	#validateRestrictions(restrictions) {
		if (!Array.isArray(restrictions)) {
			throw new Error('CharacterClass: restrictions must be an array');
		}
		restrictions.forEach(item => {
			if (!CharacterClass.RESTRICTION_SYMBOLS.includes(item.restrictionType)) {
				throw new Error('CharacterClass: restriction object has incorrect restrictionType');
			}
			if (item.restrictionType === CharacterClass.RESTRICTION_MINIMUM_ABILITY) {
				if (!Ability.IsAbility(item.type)) {
					throw new Error('CharacterClass: restriction object has incorrect type for RESTRICTION_MINIMUM_ABILITY');
				}
				if (typeof item.value !== 'number') {
					throw new Error('CharacterClass: restriction object has incorrect value for RESTRICTION_MINIMUM_ABILITY');
				}
			} else if (item.restrictionType === CharacterClass.RESTRICTION_ARMOR_TYPE) {
				if (!validateUUID(item.type)) {
					throw new Error('CharacterClass: restriction object has incorrect type for RESTRICTION_ARMOR_TYPE');
				}
				// TODO: If there is a database available later, check against that.
			} else if (item.restrictionType === CharacterClass.RESTRICTION_WEAPON_TYPE) {
				if (!validateUUID(item.type)) {
					throw new Error('CharacterClass: restriction object has incorrect type for RESTRICTION_WEAPON_TYPE');
				}
				// TODO: If there is a database available later, check against that.
			}
		});
	}
}
