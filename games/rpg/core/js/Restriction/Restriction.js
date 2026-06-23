import config from "../../../config.json";
import Database from "../Database/Database.js";
import Dice from "../Dice/Dice.js";

const databasePath = config.databasePath;
const database = new Database(databasePath);

/*
const abilitiesData = database.getAll({ databaseName: 'abilities' });
const abilities = new Map(abilitiesData.map((ability) => [ability.id, ability]));
const abilitiesByType = new Map(abilitiesCollection.map((ability) => [ability.type, ability]));
const idList = [...abilities.keys()];
*/

export default class Restriction {

	static IsRestricted = (args = {}) => {
		const { type } = args;
		const restriction = database.get({ key: 'id', value: type });
		if (!restriction) {
			throw new Error(`Invalid restriction type: ${type}`);
		}
		if (restriction.name === 'ability') {
			return Restriction.#processAbility(args);
		}
		if (restriction.name === 'armor-type') {
			return Restriction.#processArmorType(args);
		}
		if (restriction.name === 'weapon-type') {
			return Restriction.#processWeaponType(args);
		}
		if (restriction.name === 'weapon-sharp') {
			return Restriction.#processWeaponSharp(args);
		}
		if (restriction.name === 'weapon-size') {
			return Restriction.#processWeaponSize(args);
		}
		if (restriction.name === 'hit-points') {
			return Restriction.#processHitPoints(args);
		}
	}

	static #processAbility(args) {
		const { value, min, max } = args;
		if (!Number.isInteger(value)) {
			throw new Error('value is required and be a number.');
		}
		if (min === undefined && max === undefined) {
			throw new Error('Either min or max must be provided.');
		}
		if (min === undefined) {
			return value > max;
		} else if (max === undefined) {
			return value < min;
		} else {
			return value < min || value > max;
		}
	}

	static #processArmorType(args) {
		const { value, armorType } = args;
		if (armorType === undefined) {
			throw new Error('armorType is required.');
		}
		if (!Array.isArray(value)) {
			throw new Error('value must be an array.');
		}
		value.forEach((armor) => {
			if (!database.get({ key: 'id', value: armor })) {
				throw new Error(`Invalid armor type: ${armor}`);
			}
		});
		if (!value.includes(armorType) && database.get({ key: 'id', value: armorType }).type !== 'none') {
			return true;
		}
		return false;
	}

	static #processWeaponType(args) {
		const { value, weaponType } = args;
		if (weaponType === undefined) {
			throw new Error('weaponType is required.');
		}
		if (!Array.isArray(value)) {
			throw new Error('value must be an array.');
		}
		value.forEach((weapon) => {
			if (!database.get({ key: 'id', value: weapon })) {
				throw new Error(`Invalid weapon type: ${weapon}`);
			}
		});
		if (!value.includes(weaponType)) {
			return true;
		}
		return false;
	}

	static #processWeaponSharp(args) {
		const { value, weaponType } = args;
		if (weaponType === undefined) {
			throw new Error('weaponType is required.');
		}
		if (typeof value !== 'boolean' ) {
			throw new Error('value must be a boolean.');
		}
		const weapon = database.get({ key: 'id', value: weaponType });
		if (!weapon) {
			throw new Error('Invalid weaponType.');
		}
		if (value) {
			return false;
		}
		return weapon.sharp;
	}

	static #processWeaponSize(args) {
		const { value, weaponType } = args;
		if (weaponType === undefined) {
			throw new Error('weaponType is required.');
		}
		if (!Array.isArray(value)) {
			throw new Error('value must be an array.');
		}
		value.forEach((weapon) => {
			if (!database.get({ key: 'id', value: weapon })) {
				throw new Error(`Invalid weapon type: ${weapon}`);
			}
		});
		const weapon = database.get({ key: 'id', value: weaponType });
		if (!weapon.size) {
			return false;
		}
		if (!value.includes(weaponType)) {
			return true;
		}
		return false;
	}

	static #processHitPoints(args) {
		const { value, diceExpression } = args;
		if (typeof value !== 'string') {
			throw new Error('value must be a string.');
		}
		if (typeof diceExpression !== 'string') {
			throw new Error('diceExpression must be a string.');
		}
		try {
			Dice.Roll(value);
		} catch (err) {
			throw new Error(`Invalid dice expression: ${value}`);
		}
		try {
			Dice.Roll(diceExpression);
		} catch (err) {
			throw new Error(`Invalid dice expression: ${diceExpression}`);
		}
		return !(value === diceExpression);
	}

	constructor() {
		throw new Error('Restriction class is static and cannot be instantiated directly.');
	}
}