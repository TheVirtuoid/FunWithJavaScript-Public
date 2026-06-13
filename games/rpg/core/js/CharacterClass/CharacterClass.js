import crypto from 'crypto';
import Ability from '../Ability/Ability.js';
import { validateUUID } from '../Utilities/utilities.js';
import Armor from "../Armor/Armor.js";
import Weapon from "../Weapon/Weapon.js";

export default class CharacterClass {

	static Restriction = Object.freeze({
		MINIMUM_ABILITY: 'minimum-ability',
		WEAPON_SHARPNESS: 'weapon-sharpness',
		ARMOR_TYPE: 'armor-type',
		WEAPON_TYPE: 'weapon-type'
	});

	static #restrictionValidators = {
		[CharacterClass.Restriction.MINIMUM_ABILITY]: ({ value, type }) => {
			if (!Ability.GetAbilityByType(type)) {
				throw new Error('CharacterClass: restriction object has incorrect type for Restriction.MINIMUM_ABILITY');
			}
			if (typeof value !== 'number') {
				throw new Error('CharacterClass: restriction object has incorrect value for Restriction.MINIMUM_ABILITY');
			}
		},
		[CharacterClass.Restriction.WEAPON_SHARPNESS]: ({ type }) => {
			// TODO: No validation for this at this time.
		},
		[CharacterClass.Restriction.ARMOR_TYPE]: ({ type }) => {
			if (!Array.isArray(type)) {
				throw new Error('CharacterClass: restriction object ARMOR_TYPE must be an array');
			}
			type.forEach((armorType) => {
				if (!Armor.GetArmorByType(armorType)) {
					throw new Error('CharacterClass: restriction object has incorrect type for ARMOR_TYPE');
				}
			});
		},
		[CharacterClass.Restriction.WEAPON_TYPE]: ({ type }) => {
			if (!Array.isArray(type)) {
				throw new Error('CharacterClass: restriction object WEAPON_TYPE must be an array');
			}
			type.forEach((armorType) => {
				if (!Weapon.GetWeaponByType(armorType)) {
					throw new Error('CharacterClass: restriction object has incorrect type for WEAPON_TYPE');
				}
			});
		}
	};

	/*static RESTRICTION_MINIMUM_ABILITY = Symbol('restriction-minimum-ability');
	static RESTRICTION_WEAPON_SHARPNESS = Symbol('restriction-weapon-sharpness');
	static RESTRICTION_ARMOR_TYPE = Symbol('restriction-armor-type');
	static RESTRICTION_WEAPON_TYPE = Symbol('restriction-weapon-type');*/

	/*static RESTRICTION_SYMBOLS = [
		CharacterClass.RESTRICTION_MINIMUM_ABILITY,
		CharacterClass.RESTRICTION_WEAPON_SHARPNESS,
		CharacterClass.RESTRICTION_ARMOR_TYPE,
		CharacterClass.RESTRICTION_WEAPON_TYPE
	];
*/
	#id;
	#name;
	#description;
	#levelData;
	#restrictions;

	constructor(args = {}) {
		const { id, name, description, levelData, restrictions } = args;

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
			throw new Error('Race restrictions must be an array');
		}
		const validators = CharacterClass.#restrictionValidators;
		restrictions.forEach((entry) => {
			if (!entry || typeof entry !== 'object') {
				throw new Error('Each restriction must be an object');
			}
			const validator = validators[entry.restrictionType];
			if (!validator) {
				throw new Error(`Unknown restrictionType: ${entry.restrictionType}`);
			}
			validator(entry);
		});
	}
}
