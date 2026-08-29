import { describe, it, expect, beforeEach } from 'vitest';
import CharacterClass from './CharacterClass.js';
import {readFileSync} from "fs";
import config from './../../../config.json' with { type: 'json' };


const characterClassDatabase = readFileSync('./databases/jsonl/characterClass.jsonl', 'utf-8');
const characterCLassData = JSON.parse(`[${characterClassDatabase.split(config.database.delimiter).join(',')}]`);

const VALID_CHARACTER_CLASS_ID = characterCLassData[0].id;
const VALID_CHARACTER_CLASS_NAME = characterCLassData[0].name;

describe('CharacterClass', () => {
	describe('constructor', () => {
		it('should throw since characterClass is a Static class', () => {
			expect(() => new CharacterClass()).toThrow();
		});
	});

	describe('Static Methods', () => {
		describe('IsCharacterClass(id)', () => {
			it('should throw if id is not a string', () => {
				expect(() => {CharacterClass.IsCharacterClass(123)}).toThrow();
			});
			it('should throws if id is an empty string', () => {
				expect(() => {CharacterClass.IsCharacterClass('')}).toThrow();
			});
			it('should return true if id is a valid Race', () => {
				expect(CharacterClass.IsCharacterClass(VALID_CHARACTER_CLASS_ID)).toBe(true);
			});
			it('should return false if id is not a valid Race', () => {
				expect(CharacterClass.IsCharacterClass('invalid')).toBe(false);
			});
		});

		describe('IsCharacterClassByName(name)', () => {
			it('should throw if name is not a string', () => {
				expect(() => {CharacterClass.IsCharacterClassByName(123)}).toThrow();
			});
			it('should throws if name is an empty string', () => {
				expect(() => {CharacterClass.IsCharacterClassByName('')}).toThrow();
			});
			it('should return true if name is a valid CharacterClass', () => {
				expect(CharacterClass.IsCharacterClassByName(VALID_CHARACTER_CLASS_NAME)).toBe(true);
			});
			it('should return false if name is not a valid CharacterClass', () => {
				expect(CharacterClass.IsCharacterClassByName('invalid')).toBe(false);
			});
		});
	});

	describe('GetCharacterClassId(name)', () => {
		it('should throw error if name is not a string', () => {
			expect(() => {CharacterClass.GetCharacterClassId(123)}).toThrow();
		});
		it('should throw error if name is an empty string', () => {
			expect(() => {CharacterClass.GetCharacterClassId('')}).toThrow();
		});
		it('should return undefined if not found', () => {
			expect(CharacterClass.GetCharacterClassId('invalid')).toBeUndefined();
		});
		it('should return an id', () => {
			expect(CharacterClass.GetCharacterClassId(VALID_CHARACTER_CLASS_NAME)).toBe(VALID_CHARACTER_CLASS_ID);
		});
	});

	describe('GetCharacterClassData(id)', () => {
		it('should throw if id is not a string', () => {
			expect(() => {CharacterClass.GetCharacterClassData(123)}).toThrow();
		});
		it('should throws if id is an empty string', () => {
			expect(() => {CharacterClass.GetCharacterClassData('')}).toThrow();
		});
		it('should return data if id is a valid CharacterClass', () => {
			const characterClassData = CharacterClass.GetCharacterClassData(VALID_CHARACTER_CLASS_ID);
			expect(characterClassData).toHaveProperty('id');
			expect(characterClassData).toHaveProperty('name');
			expect(characterClassData).toHaveProperty('description');
			expect(characterClassData).toHaveProperty('restrictions');
			expect(characterClassData).toHaveProperty('levelData');
		});
		it('should return undefined if id is not a valid Race', () => {
			expect(CharacterClass.GetCharacterClassData('invalid')).toBeUndefined();
		});

	})
});


/*
describe('CharacterClass', () => {
	const VALID_NAME = characterData[0]['name'];
	const VALID_DESCRIPTION = characterData[0]['description'];
	const VALID_LEVEL_DATA = characterData[0]['levelData'];
	const VALID_RESTRICTIONS = characterData[0]['restrictions'];
	const VALID_ID = characterData[0]['id'];

	let validArgs;

	beforeEach(() => {
		validArgs = {
			id: VALID_ID,
			name: VALID_NAME,
			description: VALID_DESCRIPTION,
			levelData: VALID_LEVEL_DATA,
			restrictions: VALID_RESTRICTIONS
		};
	});

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {
		it('constructs with all required arguments', () => {
			const charClass = new CharacterClass(validArgs);
			expect(charClass).toBeInstanceOf(CharacterClass);
		});

		describe('required arguments', () => {
			it('throws when name is missing', () => {
				const { name, ...invalidArgs } = validArgs;
				expect(() => new CharacterClass(invalidArgs)).toThrow();
			});

			it('throws when levelData is missing', () => {
				const { levelData, ...invalidArgs } = validArgs;
				expect(() => new CharacterClass(invalidArgs)).toThrow();
			});

			it('throws when description missing', () => {
				const { description, ...invalidArgs } = validArgs;
				expect(() => new CharacterClass(invalidArgs)).toThrow();
			});

			it('throws when restrictions missing', () => {
				const { restrictions, ...invalidArgs } = validArgs;
				expect(() => new CharacterClass(invalidArgs)).toThrow();
			});
		});

	});

	// ─── properties ────────────────────────────────────────────────────────────

	describe('properties', () => {
		let charClass;

		beforeEach(() => {
			charClass = new CharacterClass(validArgs);
		});

		it('id returns an auto-generated unique string', () => {
			expect(charClass.id).toBeDefined();
			expect(typeof charClass.id).toBe('string');

			const otherClass = new CharacterClass(validArgs);
			expect(charClass.id).not.toBe(otherClass.id);
		});

		it('name returns the name passed to the constructor', () => {
			expect(charClass.name).toBe(VALID_NAME);
		});

		it('description returns the description passed to the constructor', () => {
			expect(charClass.description).toBe(VALID_DESCRIPTION);
		});

		it('levelData returns the levelData passed to the constructor', () => {
			expect(charClass.levelData).toEqual(VALID_LEVEL_DATA);
		});

		it('restrictions returns the restrictions passed to the constructor', () => {
			expect(charClass.restrictions).toEqual(VALID_RESTRICTIONS);
		});

		it('all properties are read-only', () => {
			expect(() => { charClass.id = 'new-id'; }).toThrow();
			expect(() => { charClass.name = 'new-name'; }).toThrow();
			expect(() => { charClass.description = 'new-description'; }).toThrow();
			expect(() => { charClass.levelData = []; }).toThrow();
			expect(() => { charClass.restrictions = []; }).toThrow();
		});
	});


	// ─── validation ────────────────────────────────────────────────────────────

	describe('validation', () => {
		it('throws if levelData is not an array', () => {
			expect(() => new CharacterClass({ ...validArgs, levelData: {} })).toThrow();
		});

		it('throws if restrictions is not an array', () => {
			expect(() => new CharacterClass({ ...validArgs, restrictions: {} })).toThrow();
		});

		it('throws if restrictionType is missing in a restriction object', () => {
			const invalidRestrictions = [{ restrictionType: 'bad' }];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is MINIMUM_ABILITY and type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.Restriction.MINIMUM_ABILITY,
				type: 'bad',
				value: 1
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is MINIMUM_ABILITY and value is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.Restriction.MINIMUM_ABILITY,
				type: 'wisdom',
				value: 'bad'
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is WEAPON_SHARPNESS and the type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.Restriction.WEAPON_SHARPNESS,
				type: 'bad'
			}];
			// expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
			// TODO: No code for this now
			expect(true).toBe(true);
		});

		it('throws if restrictionType is RESTRICTION_ARMOR_TYPE and the type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.Restriction.ARMOR_TYPE,
				type: 'bad'
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is RESTRICTION_WEAPON_TYPE and the type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.Restriction.WEAPON_TYPE,
				type: 'bad'
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

	});
});
*/
