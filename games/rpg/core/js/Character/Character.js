import crypto from 'crypto';
import Race from "../Race/Race.js";
import CharacterClass from "../CharacterClass/CharacterClass.js";

export default class Character {

	#id;
	#name;
	#raceData;
	#characterClassData;

	constructor(args = {}) {
		const { name, race, characterClass  } = args;
		this.setName(name);
		this.#setRace(race);
		this.#setCharacterClass(characterClass);
		this.#id = crypto.randomUUID();
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	setName(name) {
		if (typeof name !== 'string' || name.trim() === '') {
			throw new Error('Name must be a string');
		}
		this.#name = name;
	}

	#setRace(name) {
		this.#raceData = Race.GetRaceData(Race.GetRaceId(name));
	}

	#setCharacterClass(name) {
		this.#characterClassData = CharacterClass.GetCharacterClassData(CharacterClass.GetCharacterClassId(name));
	}


}