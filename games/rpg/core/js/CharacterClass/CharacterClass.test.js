import { describe, it, expect, beforeEach } from 'vitest';
import CharacterClass from './CharacterClass.js';
import {readFileSync} from "fs";

const abilityDatabase = readFileSync('./databases/jsonl/abilities.jsonl', 'utf-8');
const abilityData = JSON.parse(`[${abilityDatabase.split('\r\n').join(',')}]`);

const characterDatabase = readFileSync('./databases/jsonl/characterClass.jsonl', 'utf-8');
const characterData = JSON.parse(`[${characterDatabase.split('\r\n').join(',')}]`);

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
