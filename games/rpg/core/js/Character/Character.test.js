import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Character from './Character.js';
import Ability from '../Ability/Ability.js';
import Attribute from '../Attribute/Attribute.js';
import Race from '../Race/Race.js';
import CharacterClass from '../CharacterClass/CharacterClass.js';

const VALID_ID = '123e4567-e89b-12d3-a456-426614174000';
const VALID_NAME = 'Cronkinkle The Chaotic';
const VALID_RACE = new Race({
	name: 'Human',
	description: 'A versatile and adaptable race',
	weight: 180,
	height: 70,
	age: 100,
	classes: [],
	restrictions: [],
	specialAbilities: [],
	savingThrows: []
});
const VALID_CLASS = new CharacterClass({
	name: 'Fighter',
	description: 'A brave warrior',
	levelData: [],
	restrictions: []
});

const makeCharacter = (overrides = {}) => new Character({
	name: VALID_NAME,
	race: VALID_RACE,
	characterClass: VALID_CLASS,
	...overrides,
});

const makeAbility = (type = Ability.STRENGTH) =>
	new Ability({ type, value: 10 });

const makeAttribute = (type = Attribute.LEVEL) =>
	new Attribute({ type, value: 1 });

describe('Character', () => {

	beforeEach(() => {
		globalThis.window = globalThis;
		vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(VALID_ID);
	});

	afterEach(() => {
		delete globalThis.window;
		vi.restoreAllMocks();
	});

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with all required arguments', () => {
				expect(makeCharacter()).toBeInstanceOf(Character);
			});
		});

		describe('name argument', () => {
			it('throws when name is missing', () => {
				expect(() => makeCharacter({ name: undefined })).toThrow();
			});

			it('throws when name is an empty string', () => {
				expect(() => makeCharacter({ name: '' })).toThrow();
			});

			it('throws when name is not a string', () => {
				expect(() => makeCharacter({ name: 42 })).toThrow();
			});

			it('throws when name is null', () => {
				expect(() => makeCharacter({ name: null })).toThrow();
			});
		});

		describe('race argument', () => {
			it('throws when race is missing', () => {
				expect(() => makeCharacter({ race: undefined })).toThrow();
			});

			it('throws when race is not a Race instance', () => {
				expect(() => makeCharacter({ race: { name: 'Fake' } })).toThrow();
			});

			it('throws when race is a string', () => {
				expect(() => makeCharacter({ race: 'human' })).toThrow();
			});

			it('throws when race is null', () => {
				expect(() => makeCharacter({ race: null })).toThrow();
			});
		});

		describe('characterClass argument', () => {
			it('throws when characterClass is missing', () => {
				expect(() => makeCharacter({ characterClass: undefined })).toThrow();
			});

			it('throws when characterClass is not a CharacterClass instance', () => {
				expect(() => makeCharacter({ characterClass: { name: 'Fake' } })).toThrow();
			});

			it('throws when characterClass is a string', () => {
				expect(() => makeCharacter({ characterClass: 'fighter' })).toThrow();
			});

			it('throws when characterClass is null', () => {
				expect(() => makeCharacter({ characterClass: null })).toThrow();
			});
		});
	});

	// ─── Properties ────────────────────────────────────────────────────────────

	describe('properties', () => {
		it('id returns the auto-generated uuid', () => {
			expect(makeCharacter().id).toBe(VALID_ID);
		});

		it('name returns the name passed to the constructor', () => {
			expect(makeCharacter().name).toBe(VALID_NAME);
		});

		it('race returns the Race instance passed to the constructor', () => {
			expect(makeCharacter().race).toBe(VALID_RACE);
		});

		it('characterClass returns the CharacterClass instance passed to the constructor', () => {
			expect(makeCharacter().characterClass).toBe(VALID_CLASS);
		});

		describe('read-only', () => {
			it('id cannot be reassigned', () => {
				const char = makeCharacter();
				expect(() => { char.id = 'other-uuid'; }).toThrow();
			});

			it('name cannot be reassigned', () => {
				const char = makeCharacter();
				expect(() => { char.name = 'Gandalf'; }).toThrow();
			});

			it('race cannot be reassigned', () => {
				const char = makeCharacter();
				expect(() => { char.race = VALID_RACE; }).toThrow();
			});

			it('characterClass cannot be reassigned', () => {
				const char = makeCharacter();
				expect(() => { char.characterClass = VALID_CLASS; }).toThrow();
			});

		});
	});

	// ─── setName() ─────────────────────────────────────────────────────────────

	describe('setName()', () => {
		it('updates the name property', () => {
			const char = makeCharacter();
			char.setName('Legolas');
			expect(char.name).toBe('Legolas');
		});

		it('throws when given an empty string', () => {
			const char = makeCharacter();
			expect(() => char.setName('')).toThrow();
		});

		it('throws when given a non-string', () => {
			const char = makeCharacter();
			expect(() => char.setName(42)).toThrow();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.setName(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.setName()).toThrow();
		});

		it('does not affect id, race, or characterClass', () => {
			const char = makeCharacter();
			char.setName('Legolas');
			expect(char.id).toBe(VALID_ID);
			expect(char.race).toBe(VALID_RACE);
			expect(char.characterClass).toBe(VALID_CLASS);
		});
	});

	// ─── setRace() ─────────────────────────────────────────────────────────────

	describe('setRace()', () => {
		it('updates the race property', () => {
			const char = makeCharacter();
			const newRace = new Race({
				name: 'Elf',
				description: 'A long-lived and graceful race',
				weight: 130,
				height: 72,
				age: 500,
				classes: [],
				restrictions: [],
				specialAbilities: [],
				savingThrows: []
			});
			char.setRace(newRace);
			expect(char.race).toBe(newRace);
		});

		it('throws when given something that is not a Race instance', () => {
			const char = makeCharacter();
			expect(() => char.setRace(Symbol('unknown'))).toThrow();
		});

		it('throws when given a string', () => {
			const char = makeCharacter();
			expect(() => char.setRace('human')).toThrow();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.setRace(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.setRace()).toThrow();
		});
	});

	// ─── setCharacterClass() ───────────────────────────────────────────────────

	describe('setCharacterClass()', () => {
		it('updates the characterClass property', () => {
			const char = makeCharacter();
			const newClass = new CharacterClass({
				name: 'Magic-User',
				description: 'A scholar of the arcane',
				levelData: [],
				restrictions: []
			});
			char.setCharacterClass(newClass);
			expect(char.characterClass).toBe(newClass);
		});

		it('throws when given something that is not a CharacterClass instance', () => {
			const char = makeCharacter();
			expect(() => char.setCharacterClass(Symbol('unknown'))).toThrow();
		});

		it('throws when given a string', () => {
			const char = makeCharacter();
			expect(() => char.setCharacterClass('fighter')).toThrow();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.setCharacterClass(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.setCharacterClass()).toThrow();
		});
	});

	// ─── addAbility() ──────────────────────────────────────────────────────────

	describe('addAbility()', () => {

		it('stores the ability keyed by its type', () => {
			const char = makeCharacter();
			const ability = makeAbility(Ability.STRENGTH);
			char.addAbility(ability);
			expect(char.getAbility(Ability.STRENGTH)).toBeDefined();
		});

		it('throws when given something that is not an Ability', () => {
			const char = makeCharacter();
			expect(() => char.addAbility({ type: Ability.STRENGTH, value: 10 })).toThrow();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.addAbility(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.addAbility()).toThrow();
		});
	});

	// ─── removeAbility() ───────────────────────────────────────────────────────

	describe('removeAbility()', () => {
		it('removes an ability from the abilities map', () => {
			const char = makeCharacter();
			char.addAbility(makeAbility(Ability.STRENGTH));
			char.removeAbility(Ability.STRENGTH);
			expect(char.getAbility(Ability.STRENGTH)).toBeUndefined();
		});

		it('does not affect other abilities', () => {
			const char = makeCharacter();
			const dex = makeAbility(Ability.DEXTERITY);
			char.addAbility(makeAbility(Ability.STRENGTH));
			char.addAbility(dex);
			char.removeAbility(Ability.STRENGTH);
			expect(char.getAbility(Ability.DEXTERITY)).toBeDefined();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.removeAbility(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.removeAbility()).toThrow();
		});
	});

	// ─── getAbility() ──────────────────────────────────────────────────────────

	describe('getAbility()', () => {
		it('returns the Ability for the given type', () => {
			const char = makeCharacter();
			const ability = makeAbility(Ability.STRENGTH);
			char.addAbility(ability);
			expect(char.getAbility(Ability.STRENGTH)).toBe(ability);
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.getAbility(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.getAbility()).toThrow();
		});
	});

	// ─── addAttribute() ────────────────────────────────────────────────────────

	describe('addAttribute()', () => {
		it('stores the attribute keyed by its type', () => {
			const char = makeCharacter();
			const attr = makeAttribute(Attribute.LEVEL);
			char.addAttribute(attr);
			expect(char.getAttribute(Attribute.LEVEL)).toBeDefined();
		});


		it('throws when given something that is not an Attribute', () => {
			const char = makeCharacter();
			expect(() => char.addAttribute({ type: Attribute.LEVEL, value: 1 })).toThrow();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.addAttribute(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.addAttribute()).toThrow();
		});
	});

	// ─── removeAttribute() ─────────────────────────────────────────────────────

	describe('removeAttribute()', () => {
		it('removes an attribute from the attributes map', () => {
			const char = makeCharacter();
			char.addAttribute(makeAttribute(Attribute.LEVEL));
			char.removeAttribute(Attribute.LEVEL);
			expect(char.getAttribute(Attribute.LEVEL)).toBeUndefined();
		});

		it('does not affect other attributes', () => {
			const char = makeCharacter();
			const hp = makeAttribute(Attribute.HIT_POINTS);
			char.addAttribute(makeAttribute(Attribute.LEVEL));
			char.addAttribute(hp);
			char.removeAttribute(Attribute.LEVEL);
			expect(char.getAttribute(Attribute.HIT_POINTS)).toBeDefined();
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.removeAttribute(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.removeAttribute()).toThrow();
		});
	});

	// ─── getAttribute() ────────────────────────────────────────────────────────

	describe('getAttribute()', () => {
		it('returns the Attribute for the given type', () => {
			const char = makeCharacter();
			const attr = makeAttribute(Attribute.LEVEL);
			char.addAttribute(attr);
			expect(char.getAttribute(Attribute.LEVEL)).toBe(attr);
		});

		it('throws when given null', () => {
			const char = makeCharacter();
			expect(() => char.getAttribute(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const char = makeCharacter();
			expect(() => char.getAttribute()).toThrow();
		});
	});
});
