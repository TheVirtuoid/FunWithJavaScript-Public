import { describe, it, expect, beforeEach } from 'vitest';
import CharacterClass from './CharacterClass.js';
import Ability from "../Ability/Ability.js";

describe('CharacterClass', () => {
	const VALID_NAME = 'Fighter';
	const VALID_DESCRIPTION = 'A brave warrior';
	const VALID_LEVEL_DATA = [];
	const VALID_RESTRICTIONS = [
		{
			restrictionType: CharacterClass.Restriction.MINIMUM_ABILITY,
			id: 'dd67458c-d4fe-483c-b518-d57cc3f14ddc',
			value: 9
		}
	];

	let validArgs;

	beforeEach(() => {
		validArgs = {
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

	// ─── restrictions ──────────────────────────────────────────────────────────

	describe('restrictions', () => {
		it('RESTRICTION_MINIMUM_ABILITY is a static symbol with correct description', () => {
			expect(CharacterClass.RESTRICTION_MINIMUM_ABILITY).toBeDefined();
			expect(typeof CharacterClass.RESTRICTION_MINIMUM_ABILITY).toBe('symbol');
			expect(CharacterClass.RESTRICTION_MINIMUM_ABILITY.description).toBe('restriction-minimum-ability');
		});

		it('RESTRICTION_WEAPON_SHARPNESS is a static symbol with correct description', () => {
			expect(CharacterClass.RESTRICTION_WEAPON_SHARPNESS).toBeDefined();
			expect(typeof CharacterClass.RESTRICTION_WEAPON_SHARPNESS).toBe('symbol');
			expect(CharacterClass.RESTRICTION_WEAPON_SHARPNESS.description).toBe('restriction-weapon-sharpness');
		});

		it('RESTRICTION_ARMOR_TYPE is a static symbol with correct description', () => {
			expect(CharacterClass.RESTRICTION_ARMOR_TYPE).toBeDefined();
			expect(typeof CharacterClass.RESTRICTION_ARMOR_TYPE).toBe('symbol');
			expect(CharacterClass.RESTRICTION_ARMOR_TYPE.description).toBe('restriction-armor-type');
		});

		it('RESTRICTION_WEAPON_TYPE is a static symbol with correct description', () => {
			expect(CharacterClass.RESTRICTION_WEAPON_TYPE).toBeDefined();
			expect(typeof CharacterClass.RESTRICTION_WEAPON_TYPE).toBe('symbol');
			expect(CharacterClass.RESTRICTION_WEAPON_TYPE.description).toBe('restriction-weapon-type');
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

		it('throws if restrictionType is RESTRICTION_MINIMUM_ABILITY and type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.RESTRICTION_MINIMUM_ABILITY,
				id: 'bad',
				value: 1
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is RESTRICTION_MINIMUM_ABILITY and value is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.RESTRICTION_MINIMUM_ABILITY,
				id: 'dd67458c-d4fe-483c-b518-d57cc3f14ddc',
				value: 'bad'
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is RESTRICTION_ARMOR_TYPE and the type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.RESTRICTION_ARMOR_TYPE,
				id: 'bad'
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

		it('throws if restrictionType is RESTRICTION_WEAPON_TYPE and the type is invalid', () => {
			const invalidRestrictions = [{
				restrictionType: CharacterClass.RESTRICTION_WEAPON_TYPE,
				id: 'bad'
			}];
			expect(() => new CharacterClass({ ...validArgs, restrictions: invalidRestrictions })).toThrow();
		});

	});
});
