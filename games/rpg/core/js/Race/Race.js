/*import crypto from 'crypto';
import Attribute from "../Attribute/Attribute.js";
import Ability from "../Ability/Ability.js";*/
import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
const databasePath = config.databasePath;

const database = new Database(databasePath);
const raceCollection = database.getAll({ databaseName: 'race' });
const races = new Map(raceCollection.map((race) => [race.id, race]));
const racesByName = new Map(raceCollection.map((race) => [race.name.toLowerCase(), race]));
const idList = [...races.keys()];
const nameList = [...racesByName.keys()];
export default class Race {

	static IsRace(id) {
		if (typeof id !== 'string') {
			throw new Error('Race id must be a string');
		}
		if (id === '') {
			throw new Error('Race id must not be an empty string');
		}
		return idList.includes(id);
	}

	static IsRaceByName(name) {
		if (typeof name !== 'string') {
			throw new Error('Race name must be a string');
		}
		if (name === '') {
			throw new Error('Race name must not be an empty string');
		}
		return nameList.includes(name.toLowerCase());
	}

	static GetRaceId(name) {
		if (typeof name !== 'string') {
			throw new Error('Race name must be a string');
		}
		if (name === '') {
			throw new Error('Race name must not be an empty string');
		}
		return racesByName.get(name.toLowerCase())?.id;
	}

	static GetRaceData(id) {
		if (Race.IsRace(id)) {
			return races.get(id);
		}
	}
	constructor(args = {}) {
		throw new Error('Race is a static class and cannot be instantiated');
	}
}