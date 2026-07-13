import crypto from 'crypto';
import Ability from '../Ability/Ability.js';
import { validateUUID } from '../Utilities/utilities.js';
import Armor from "../Armor/Armor.js";
import Weapon from "../Weapon/Weapon.js";
import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
const databasePath = config.databasePath;

const database = new Database(databasePath);
const characterClassCollection = database.getAll({ databaseName: 'characterClass' });
const characterClasses = new Map(characterClassCollection.map((characterClass) => [characterClass.id, characterClass]));
const characterClassesByName = new Map(characterClassCollection.map((characterClass) => [characterClass.name.toLowerCase(), characterClass]));
const idList = [...characterClasses.keys()];
const nameList = [...characterClassesByName.keys()];


export default class CharacterClass {

	static IsCharacterClass(id) {
		if (typeof id !== 'string') {
			throw new Error('CharacterClass: id must be a string');
		}
		if (id === '') {
			throw new Error('CharacterClass: id must not be empty');
		}
		return idList.includes(id);
	}

	static IsCharacterClassByName(name) {
		if (typeof name !== 'string') {
			throw new Error('CharacterClass: name must be a string');
		}
		if (name === '') {
			throw new Error('CharacterClass: name must not be empty');
		}
		return nameList.includes(name.toLowerCase());
	}

	static GetCharacterClassId(name) {
		if (this.IsCharacterClassByName(name)) {
			return characterClassesByName.get(name.toLowerCase()).id;
		}
	}

	static GetCharacterClassData(id) {
		if (this.IsCharacterClass(id)) {
			return characterClasses.get(id);
		}
	}

	constructor() {
		throw new Error('CharacterClass: cannot instantiate CharacterClass as it is a Static class');
	}

}
