import { describe, it, expect, beforeEach } from 'vitest';
import {readFileSync} from "fs";
import PlayerCharacter from "./PlayerCharacter.js";

const raceDatabase = readFileSync('./databases/jsonl/race.jsonl', 'utf-8');
const raceData = JSON.parse(`[${raceDatabase.split('\r\n').join(',')}]`);

const characterClassDatabase = readFileSync('./databases/jsonl/characterClass.jsonl', 'utf-8');
const characterClassData = JSON.parse(`[${characterClassDatabase.split('\r\n').join(',')}]`);

const abilitiesDatabase = readFileSync('./databases/jsonl/abilities.jsonl', 'utf-8');
const abilitiesData = JSON.parse(`[${abilitiesDatabase.split('\r\n').join(',')}]`);
const abilitiesByAbbreviation = new Map(abilitiesData.map((ability) => [ability.abbreviation, ability]));

const VALID_NAME = 'Alfred';
const VALID_RACE_ID = raceData[0]['id'];
const VALID_RACE_NAME = raceData[0]['name'];
const VALID_CHARACTER_CLASS_ID = characterClassData[0]['id'];
const VALID_CHARACTER_CLASS_NAME = characterClassData[0]['name'];

describe('PlayerCharacter', () => {
	let playerCharacter;

	beforeEach( () => {
		playerCharacter = new PlayerCharacter({ name: VALID_NAME, race: VALID_RACE_ID, characterClass: VALID_CHARACTER_CLASS_ID });
	});

	describe('constructor', () => {
		it('should create a new PlayerCharacter with the provided race, characterClass, and name', () => {
			const playerCharacter = new PlayerCharacter({ name: VALID_NAME, race: VALID_RACE_ID, characterClass: VALID_CHARACTER_CLASS_ID });
			expect(playerCharacter).toBeInstanceOf(PlayerCharacter);
		});
	});

	describe('Abilities', () => {
		const abilityList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

		it.each(abilityList)(`should have a number of %s`, (abbreviation) => {
			const playerCharacter = new PlayerCharacter({ name: VALID_NAME, race: VALID_RACE_ID, characterClass: VALID_CHARACTER_CLASS_ID });
			const id = abilitiesByAbbreviation.get(abbreviation).id;
			const ability = playerCharacter.getAbility(id);
			expect(ability.value).toBeGreaterThanOrEqual(3);
			expect(ability.value).toBeLessThanOrEqual(18);
			expect(ability.bonus).toBeGreaterThanOrEqual(-2);
			expect(ability.bonus).toBeLessThanOrEqual(2);
		});
	});


});