import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import Character from './Character.js';
import Ability from '../Ability/Ability.js';
import Attribute from '../Attribute/Attribute.js';
import Equipment from '../Equipment/Equipment.js';
import RaceData from "../RaceData/RaceData.js";
import CharacterClassData from "../CharacterClassData/CharacterClassData.js";
import config from './../../../config.json' with { type: 'json' };


const abilityDatabase = readFileSync('./databases/jsonl/abilities.jsonl', 'utf-8');
const abilityData = JSON.parse(`[${abilityDatabase.split(config.database.delimiter).join(',')}]`);

const attributeDatabase = readFileSync('./databases/jsonl/attributes.jsonl', 'utf-8');
const attributeData = JSON.parse(`[${attributeDatabase.split(config.database.delimiter).join(',')}]`);

const equipmentDatabase = readFileSync('./databases/jsonl/equipment.jsonl', 'utf-8');
const equipmentData = JSON.parse(`[${equipmentDatabase.split(config.database.delimiter).join(',')}]`);

const raceDatabase = readFileSync('./databases/jsonl/race.jsonl', 'utf-8');
const raceDataRaw = JSON.parse(`[${raceDatabase.split(config.database.delimiter).join(',')}]`);

const characterClassDatabase = readFileSync('./databases/jsonl/characterClass.jsonl', 'utf-8');
const characterClassData = JSON.parse(`[${characterClassDatabase.split(config.database.delimiter).join(',')}]`);

const VALID_ABILITY_ID = abilityData[0]['id'];
const VALID_ABILITY_ID_2 = abilityData[1]['id'];
const VALID_ATTRIBUTE_ID = attributeData[0]['id'];
const VALID_ATTRIBUTE_ID_2 = attributeData[1]['id'];

const VALID_EQUIPMENT_ID = equipmentData[0]['id'];
const VALID_EQUIPMENT_ID_2 = equipmentData[1]['id'];
const VALID_EQUIPMENT_NAME = equipmentData[0]['name'];

const VALID_RACE_ID = raceDataRaw[0]['id'];
const VALID_RACE_NAME = raceDataRaw[0]['name'];
const VALID_CHARACTER_CLASS_ID = characterClassData[0]['id'];
const VALID_CHARACTER_CLASS_ID_2 = characterClassData[1]['id'];
const VALID_CHARACTER_CLASS_NAME = characterClassData[0]['name'];
const VALID_CHARACTER_CLASS_NAME_2 = characterClassData[1]['name'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeAbility(id = VALID_ABILITY_ID) {
	return new Ability({ id, value: 10 });
}

function makeAbility2() {
	return new Ability({ id: VALID_ABILITY_ID_2, value: 12 });
}

function makeAttribute(id = VALID_ATTRIBUTE_ID) {
	return new Attribute({ id, value: 5 });
}

function makeAttribute2() {
	return new Attribute({ id: VALID_ATTRIBUTE_ID_2, value: 8 });
}

function makeEquipment() {
	return new Equipment({ id: VALID_EQUIPMENT_ID, name: VALID_EQUIPMENT_NAME });
}

function makeCharacter(overrides = {}) {
	return new Character({
		name: 'Aldric',
		race: VALID_RACE_ID,
		characterClass: VALID_CHARACTER_CLASS_ID,
		...overrides
	});
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Character', () => {

	let character;

	beforeEach(() => {
		character = makeCharacter();
	});

	// ─── constructor ──────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with all required arguments', () => {
				expect(character).toBeInstanceOf(Character);
			});
		});

		describe('name argument', () => {
			it('throws when name is missing', () => {
				expect(() => makeCharacter({ name: undefined })).toThrow();
			});

			it('throws when name is not a string', () => {
				expect(() => makeCharacter({ name: 123 })).toThrow();
			});

			it('throws when name is an empty string', () => {
				expect(() => makeCharacter({ name: '' })).toThrow();
			});

			it('throws when name is a whitespace-only string', () => {
				expect(() => makeCharacter({ name: '   ' })).toThrow();
			});
		});

		describe('race argument', () => {
			it('accepts a null argument', () => {
				const character = makeCharacter({ race: null });
				expect(character.race).toBeNull();
			});

			it('throws when race is missing', () => {
				expect(() => makeCharacter({ race: undefined })).toThrow();
			});

			it('throws when race is an invalid id', () => {
				expect(() => makeCharacter({ race: 'not-a-race' })).toThrow();
			});

			it('throws when race is not a string', () => {
				expect(() => makeCharacter({ race: 123 })).toThrow();
			});
		});

		describe('characterClass argument', () => {
			it('can accept null', () => {
				const character = makeCharacter({ characterClass: null });
				expect(character.characterClass).toBeNull();
			});
			it('throws when characterClass is missing', () => {
				expect(() => makeCharacter({ characterClass: undefined })).toThrow();
			});

			it('throws when characterClass is an invalid id', () => {
				expect(() => makeCharacter({ characterClass: 'not-a-class' })).toThrow();
			});

			it('throws when characterClass is not a string', () => {
				expect(() => makeCharacter({ characterClass: 123 })).toThrow();
			});
		});
	});

	// ─── properties ───────────────────────────────────────────────────────────

	describe('properties', () => {

		it('id is unique per instance', () => {
			const other = makeCharacter();
			expect(character.id).not.toBe(other.id);
		});

		it('name returns the name passed to the constructor', () => {
			expect(character.name).toBe('Aldric');
		});

		it('race contains RaceData', () => {
			expect(character.race).toBeInstanceOf(RaceData);
		});

		it('characterClass is an instance of CharacterClass', () => {
			expect(character.characterClass).toBeInstanceOf(CharacterClassData);
		});

		it('abilities is an Array', () => {
			expect(character.abilities).toBeInstanceOf(Array);
		});

		it('attributes is an Array', () => {
			expect(character.attributes).toBeInstanceOf(Array);
		});

		it('inventory is an Array', () => {
			expect(character.inventory).toBeInstanceOf(Array);
		});

		describe('read-only', () => {
			it('id cannot be reassigned', () => {
				expect(() => { character.id = 'new-id'; }).toThrow();
			});

			it('name cannot be reassigned', () => {
				expect(() => { character.name = 'Bob'; }).toThrow();
			});

			it('race cannot be reassigned', () => {
				expect(() => { character.race = null; }).toThrow();
			});

			it('characterClass cannot be reassigned', () => {
				expect(() => { character.characterClass = null; }).toThrow();
			});

			it('abilities cannot be reassigned', () => {
				expect(() => { character.abilities = new Map(); }).toThrow();
			});

			it('attributes cannot be reassigned', () => {
				expect(() => { character.attributes = new Map(); }).toThrow();
			});

			it('inventory cannot be reassigned', () => {
				expect(() => { character.inventory = new Map(); }).toThrow();
			});
		});
	});

	describe('methods', () => {
		describe('setName()', () => {
			it('updates the name property', () => {
				character.setName('Berin');
				expect(character.name).toBe('Berin');
			});

			it('throws when given a non-string', () => {
				expect(() => character.setName(42)).toThrow();
			});

			it('throws when given null', () => {
				expect(() => character.setName(null)).toThrow();
			});

			it('throws when given undefined', () => {
				expect(() => character.setName(undefined)).toThrow();
			});

			it('throws when given an empty string', () => {
				expect(() => character.setName('')).toThrow();
			});

			it('throws when given a whitespace-only string', () => {
				expect(() => character.setName('   ')).toThrow();
			});

			it('does not affect id, race, or characterClass', () => {
				const originalId = character.id;
				character.setName('Toruk');
				expect(character.id).toBe(originalId);
				expect(character.race).toBeInstanceOf(RaceData);
				expect(character.characterClass).toBeInstanceOf(CharacterClassData);
			});
		});

		describe('setCharacterClass()', () => {
			it('updates the characterClass property', () => {
				character.setCharacterClass(VALID_CHARACTER_CLASS_ID_2);
				expect(character.characterClass).toBeInstanceOf(CharacterClassData);
				expect(character.characterClass.name).toBe(VALID_CHARACTER_CLASS_NAME_2);
			});

			it('throws when given an invalid characterClassType', () => {
				expect(() => character.setCharacterClass('not-a-class')).toThrow();
			});

			it('throws when given a non-string', () => {
				expect(() => character.setCharacterClass(123)).toThrow();
			});

			it('does not throw when given null', () => {
				character.setCharacterClass(null);
				expect(character.characterClass).toBe(null);
			});

			it('throws when given undefined', () => {
				expect(() => character.setCharacterClass(undefined)).toThrow();
			});
		});

		describe('addAbility()', () => {
			it('adds an ability to the character', () => {
				const ability = makeAbility();
				character.addAbility(ability);
				expect(character.abilities.length).toBe(1);
				expect(character.abilities[0].ability.value).toBe(ability.value);
			});

			it('throws when ability is not an instance of Ability', () => {
				expect(() => character.addAbility({ id: VALID_ABILITY_ID, value: 10 })).toThrow();
			});

			it('throws when ability is null', () => {
				expect(() => character.addAbility(null)).toThrow();
			});

			it('throws when adding a duplicate ability', () => {
				const ability = makeAbility();
				character.addAbility(ability);
				expect(() => character.addAbility(ability)).toThrow();
			});

			it('allows adding multiple distinct abilities', () => {
				character.addAbility(makeAbility());
				character.addAbility(makeAbility2());
				expect(character.abilities.length).toBe(2);
			});
		});

		describe('removeAbility()', () => {
			it('removes an ability and returns it', () => {
				const ability = makeAbility();
				character.addAbility(ability);
				const removed = character.removeAbility(VALID_ABILITY_ID);
				expect(removed).toBeInstanceOf(Ability);
				expect(character.abilities.length).toBe(0);
			});

			it('returns undefined when the ability was not found', () => {
				const result = character.removeAbility(VALID_ABILITY_ID);
				expect(result).toBeUndefined();
			});

			it('throws when given a non-string', () => {
				expect(() => character.removeAbility(123)).toThrow();
			});

			it('throws when given null', () => {
				expect(() => character.removeAbility(null)).toThrow();
			});
		});

		describe('getAbility()', () => {
			it('returns the ability when found', () => {
				const ability = makeAbility();
				character.addAbility(ability);
				const result = character.getAbility(VALID_ABILITY_ID);
				expect(result).toBeInstanceOf(Ability);
			});

			it('returns undefined when the ability is not found', () => {
				expect(character.getAbility(VALID_ABILITY_ID)).toBeUndefined();
			});

			it('throws when given an invalid ability', () => {
				expect(() => character.getAbility(123)).toThrow();
			});

			it('throws when given null', () => {
				expect(() => character.getAbility(null)).toThrow();
			});
		});

		describe('addAttribute()', () => {
			it('adds an attribute to the character', () => {
				const attribute = makeAttribute();
				character.addAttribute(attribute);
				expect(character.attributes.length).toBe(1);
			});

			it('throws when attribute is not an instance of Attribute', () => {
				expect(() => character.addAttribute({ id: VALID_ATTRIBUTE_ID, value: 5 })).toThrow();
			});

			it('throws when attribute is null', () => {
				expect(() => character.addAttribute(null)).toThrow();
			});

			it('throws when adding a duplicate attribute', () => {
				character.addAttribute(makeAttribute());
				expect(() => character.addAttribute(makeAttribute())).toThrow();
			});

			it('allows adding multiple distinct attributes', () => {
				character.addAttribute(makeAttribute());
				character.addAttribute(makeAttribute2());
				expect(character.attributes.length).toBe(2);
			});
		});

		describe('removeAttribute()', () => {
			it('removes an attribute and returns it', () => {
				const attribute = makeAttribute();
				character.addAttribute(attribute);
				const removed = character.removeAttribute(VALID_ATTRIBUTE_ID);
				expect(removed).toBeInstanceOf(Attribute);
				expect(character.attributes.length).toBe(0);
			});

			it('returns undefined when the attribute was not found', () => {
				const result = character.removeAttribute(VALID_ATTRIBUTE_ID);
				expect(result).toBeUndefined();
			});

			it('throws when given an invalid attribute id', () => {
				expect(() => character.removeAttribute(123)).toThrow();
			});

			it('throws when given null', () => {
				expect(() => character.removeAttribute(null)).toThrow();
			});
		});

		describe('getAttribute()', () => {
			it('returns the attribute when found', () => {
				const attribute = makeAttribute();
				character.addAttribute(attribute);
				const result = character.getAttribute(VALID_ATTRIBUTE_ID);
				expect(result).toBeInstanceOf(Attribute);
			});

			it('returns undefined when the attribute is not found', () => {
				expect(character.getAttribute(VALID_ATTRIBUTE_ID)).toBeUndefined();
			});

			it('throws when given an invalid attribute id', () => {
				expect(() => character.getAttribute(123)).toThrow();
			});

			it('throws when given null', () => {
				expect(() => character.getAttribute(null)).toThrow();
			});
		});

		describe('addInventory()', () => {
			it('adds equipment to the inventory', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 2 });
				expect(character.inventory.length).toBe(1);
			});

			it('throws when id is null', () => {
				expect(() => character.addInventory({ id: null, quantity: 1 })).toThrow();
			});

			it('throws when quantity is not an integer', () => {
				expect(() => character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 1.5 })).toThrow();
			});

			it('throws when quantity is a string', () => {
				expect(() => character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: '2' })).toThrow();
			});

			it('throws when quantity is null', () => {
				expect(() => character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: null })).toThrow();
			});

			it('accepts positive quantity', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 5 });
				expect(character.getInventory(VALID_EQUIPMENT_ID).quantity).toBe(5);
			});

			it('accepts negative quantity', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: -3 });
				expect(character.getInventory(VALID_EQUIPMENT_ID).quantity).toBe(-3);
			});

			it('accepts zero as a quantity', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 0 });
				expect(character.getInventory(VALID_EQUIPMENT_ID).quantity).toBe(0);
			});

			it('adjusts the quantity when adding more', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 5 });
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 3 });
				expect(character.getInventory(VALID_EQUIPMENT_ID).quantity).toBe(8);
			})
		});

		describe('removeInventory()', () => {
			it('removes equipment and returns the inventory object', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 1 });
				const removed = character.removeInventory(VALID_EQUIPMENT_ID);
				expect(removed).toBeDefined();
				expect(character.inventory.length).toBe(0);
			});

			it('returns undefined when equipment was not in inventory', () => {
				const result = character.removeInventory(VALID_EQUIPMENT_ID);
				expect(result).toBeUndefined();
			});

			it('throws when given null', () => {
				expect(() => character.removeInventory(null)).toThrow();
			});

			it('throws when given a non-string', () => {
				expect(() => character.removeInventory(123)).toThrow();
			});
		});

		describe('getInventory()', () => {
			it('returns the quantity when equipment is found', () => {
				character.addInventory({ id: VALID_EQUIPMENT_ID, quantity: 3 });
				expect(character.getInventory(VALID_EQUIPMENT_ID).quantity).toBe(3);
			});

			it('returns 0 when equipment is not in inventory', () => {
				expect(character.getInventory(VALID_EQUIPMENT_ID).quantity).toBe(0);
			});

			it('throws when given null', () => {
				expect(() => character.getInventory(null)).toThrow();
			});

			it('throws when given a non-string', () => {
				expect(() => character.getInventory(123)).toThrow();
			});
		});

	});

});