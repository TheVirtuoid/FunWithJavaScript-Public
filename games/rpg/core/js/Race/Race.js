import crypto from 'crypto';
import Attribute from "../Attribute/Attribute.js";
import Ability from "../Ability/Ability.js";
import CharacterClass from "../CharacterClass/CharacterClass.js";

export default class Race {

	static Restrictions = {
		ABILITY: Symbol('restrictions-ability'),
		WEAPON_SIZE: Symbol('restrictions-weapon-size'),
		CHARACTER_CLASS: Symbol('restrictions-character-class'),
		HIT_POINTS: Symbol('restrictions-hit-points')
	}

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
		const restrictions = this.restrictions.map((entry) => {
			return {
				restrictionType: entry.restrictionType.description,
					type: typeof entry.type === 'symbol' ? entry.type.description : entry.type,
					min: entry.min,
					max: entry.max
			}
		});
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
		const validRestrictions = Object.values(Race.Restrictions);
		restrictions.forEach((entry) => {
			if (!validRestrictions.includes(entry.restrictionType)) {
				throw new Error('Race restrictions must be a member of Race.Restrictions');
			}
			const { restrictionType, type, min, max } = entry;
			if (restrictionType === Race.Restrictions.ABILITY) {
				if (!type || !Ability.IsAbility(type)) {
					throw new Error('Race restrictions for ABILITY must have type set to an Ability');
				}
				if (min !== undefined && (typeof min !== 'number' || min < 3)) {
					throw new Error('Race restrictions for ABILITY must have a minimum value of 3');
				}
				if (max !== undefined && (typeof max !== 'number' || max > 18)) {
					throw new Error('Race restrictions for ABILITY must have a maximum value of 18');
				}
			}
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
			if (!savingThrow || savingThrow.category !== Attribute.ATTRIBUTE_CATEGORY_SAVING_THROW) {
				throw new Error('Race savingThrows must be Attribute types with category "saving-throw"');
			}
			if (typeof bonus !== 'number') {
				throw new Error('Race savingThrows must have a bonus number');
			}
		})
	}

}