import crypto from 'crypto';
import Attribute from "../Attribute/Attribute.js";
import Ability from "../Ability/Ability.js";

export default class Race {

	static Restrictions = Object.freeze({
		ABILITY: 'ability',
		WEAPON_SIZE: 'weapon-size',
		CHARACTER_CLASS: 'character-class',
		HIT_POINTS: 'hit-points'
	});

	static #restrictionValidators = {
		[Race.Restrictions.ABILITY]: ({ id, min, max }) => {
			if (typeof id !== 'string' || !Ability.IsAbility(id)) {
				throw new Error('Race restrictions for ABILITY must have id set to a valid Ability id');
			}
			if (min !== undefined && (typeof min !== 'number' || min < 3)) {
				throw new Error('Race restrictions for ABILITY must have a minimum value of at least 3');
			}
			if (max !== undefined && (typeof max !== 'number' || max > 18)) {
				throw new Error('Race restrictions for ABILITY must have a maximum value of at most 18');
			}
		},
		[Race.Restrictions.WEAPON_SIZE]: ({ type }) => {
			// TODO: validate against WeaponSize lookup when it exists
			if (!Array.isArray(type)) {
				throw new Error('Race restrictions for WEAPON_SIZE must be an array of weapon sizes');
			}
		},
		[Race.Restrictions.CHARACTER_CLASS]: ({ type }) => {
			// TODO: validate against CharacterClass lookup when it exists
			if (typeof type !== 'string') {
				throw new Error('Race restrictions for CHARACTER_CLASS must have a string type');
			}
		},
		[Race.Restrictions.HIT_POINTS]: ({ min, max }) => {
			if (min !== undefined && typeof min !== 'number') {
				throw new Error('Race restrictions for HIT_POINTS min must be a number');
			}
			if (max !== undefined && typeof max !== 'number') {
				throw new Error('Race restrictions for HIT_POINTS max must be a number');
			}
		}
	};

	#id;
	#name;
	#description;
	#weight;
	#height;
	#age;
	#classes;
	#restrictions;
	#specialAbilities;
	#savingThrows;

	constructor(args = {}) {
		const { name, description, weight, height, age, classes, restrictions, specialAbilities, savingThrows } = args;
		if (typeof name !== 'string') {
			throw new Error('Race name must be a string');
		}
		if (typeof description !== 'string') {
			throw new Error('Race description must be a string');
		}
		if (typeof weight !== 'number') {
			throw new Error('Race weight must be a number');
		}
		if (typeof height !== 'number') {
			throw new Error('Race height must be a number');
		}
		if (typeof age !== 'number') {
			throw new Error('Race age must be a number');
		}
		this.#validateClasses(classes);
		this.#validateRestrictions(restrictions);
		this.#validateSpecialAbilities(specialAbilities);
		this.#validateSavingThrows(savingThrows);
		this.#id = crypto.randomUUID();
		this.#name = name;
		this.#description = description;
		this.#weight = weight;
		this.#height = height;
		this.#age = age;
		this.#classes = classes;
		this.#restrictions = restrictions;
		this.#specialAbilities = specialAbilities;
		this.#savingThrows = savingThrows;
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
	get weight() {
		return this.#weight;
	}
	get height() {
		return this.#height;
	}
	get age() {
		return this.#age;
	}
	get classes() {
		return [...this.#classes];
	}
	get restrictions() {
		return [...this.#restrictions];
	}
	get specialAbilities() {
		return [...this.#specialAbilities];
	}
	get savingThrows() {
		return [...this.#savingThrows];
	}

	toObject() {
		const classes = this.classes.map((entry) => entry.description);
		const restrictions = this.restrictions.map((entry) => ({
			restrictionType: entry.restrictionType,
			type: entry.type,
			min: entry.min,
			max: entry.max
		}));
		const specialAbilities = this.specialAbilities.map((entry) => entry.description);
		const savingThrows = this.savingThrows.map((entry) => {
			return {
				attribute: entry.attribute.description,
				bonus: entry.bonus
			}
		});
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			weight: this.weight,
			height: this.height,
			age: this.age,
			classes: classes,
			restrictions: restrictions,
			specialAbilities: specialAbilities,
			savingThrows: savingThrows
		}
	}

	#validateRestrictions(restrictions) {
		if (!Array.isArray(restrictions)) {
			throw new Error('Race restrictions must be an array');
		}
		const validators = Race.#restrictionValidators;
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

	#validateClasses(classes) {
		if (!Array.isArray(classes)) {
			throw new Error('Race classes must be an array');
		}
		// TODO: Fix when you get classes done
	}

	#validateSpecialAbilities(specialAbilities) {
		if (!Array.isArray(specialAbilities)) {
			throw new Error('Race specialAbilities must be an array');
		}
		// TODO: Fix when you figure out special abilities
	}

	#validateSavingThrows(savingThrows) {
		if (!Array.isArray(savingThrows)) {
			throw new Error('Race savingThrows must be an array');
		}
		savingThrows.forEach((entry) => {
			const { attribute, bonus } = entry;
			const savingThrow = Attribute.GetAttribute(attribute);
			if (!savingThrow || savingThrow.category !== 'attribute-category-saving-throw') {
				throw new Error('Race savingThrows must be Attribute types with category "saving-throw"');
			}
			if (typeof bonus !== 'number') {
				throw new Error('Race savingThrows must have a bonus number');
			}
		})
	}

}