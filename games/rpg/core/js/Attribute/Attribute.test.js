import { describe, it, expect } from 'vitest';
import Attribute from './Attribute.js';

// A known-valid attribute type for use across tests
const VALID_TYPE = Attribute.LEVEL;
const VALID_VALUE = 10;

describe('Attribute', () => {

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with a valid type and value', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(attr).toBeInstanceOf(Attribute);
			});
		});

		describe('type argument', () => {
			it('throws when type is missing', () => {
				expect(() => new Attribute({ value: VALID_VALUE })).toThrow();
			});

			it('throws when type is not a valid attribute symbol', () => {
				expect(() => new Attribute({ type: Symbol('unknown'), value: VALID_VALUE })).toThrow();
			});

			it('throws when type is a string', () => {
				expect(() => new Attribute({ type: 'level', value: VALID_VALUE })).toThrow();
			});

			it('throws when type is null', () => {
				expect(() => new Attribute({ type: null, value: VALID_VALUE })).toThrow();
			});

			it('throws when type is undefined', () => {
				expect(() => new Attribute({ value: VALID_VALUE })).toThrow();
			});
		});

		describe('value argument', () => {
			it('throws when value is missing', () => {
				expect(() => new Attribute({ type: VALID_TYPE })).toThrow();
			});

			it('throws when value is a float', () => {
				expect(() => new Attribute({ type: VALID_TYPE, value: 1.5 })).toThrow();
			});

			it('throws when value is a string', () => {
				expect(() => new Attribute({ type: VALID_TYPE, value: '10' })).toThrow();
			});

			it('throws when value is null', () => {
				expect(() => new Attribute({ type: VALID_TYPE, value: null })).toThrow();
			});

			it('throws when value is undefined', () => {
				expect(() => new Attribute({ type: VALID_TYPE })).toThrow();
			});
		});
	});

	// ─── Properties ────────────────────────────────────────────────────────────

	describe('properties', () => {
		it('type returns the symbol passed to the constructor', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			expect(attr.type).toBe(VALID_TYPE);
		});

		it('value returns the integer passed to the constructor', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			expect(attr.value).toBe(VALID_VALUE);
		});

		describe('read-only', () => {
			it('type cannot be reassigned', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(() => { attr.type = Attribute.EXPERIENCE; }).toThrow();
			});

			it('value cannot be reassigned', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(() => { attr.value = 99; }).toThrow();
			});
		});
	});

	// ─── setValue() ────────────────────────────────────────────────────────────

	describe('setValue()', () => {
		it('updates the value property', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			attr.setValue(20);
			expect(attr.value).toBe(20);
		});

		it('accepts negative integers', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			attr.setValue(-5);
			expect(attr.value).toBe(-5);
		});

		it('accepts zero', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			attr.setValue(0);
			expect(attr.value).toBe(0);
		});

		it('throws when given a float', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			expect(() => attr.setValue(1.5)).toThrow();
		});

		it('throws when given a string', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			expect(() => attr.setValue('10')).toThrow();
		});

		it('throws when given null', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			expect(() => attr.setValue(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			expect(() => attr.setValue()).toThrow();
		});

		it('does not affect type', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			attr.setValue(20);
			expect(attr.type).toBe(VALID_TYPE);
		});
	});

	// ─── IsAttribute() ─────────────────────────────────────────────────────────

	describe('IsAttribute()', () => {
		it('returns true for each character attribute type', () => {
			expect(Attribute.IsAttribute(Attribute.LEVEL)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.EXPERIENCE)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.ARMOR_CLASS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.HIT_POINTS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.ATTACK_BONUS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.MONEY)).toBe(true);
		});

		it('returns true for each saving throw attribute type', () => {
			expect(Attribute.IsAttribute(Attribute.DEATH_POISON)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.WANDS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.PARALYZE_STONE)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.DRAGON_BREATH)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.SPELLS)).toBe(true);
		});

		it('returns false for category symbols (CHARACTER, SAVING_THROW)', () => {
			expect(Attribute.IsAttribute(Attribute.CHARACTER)).toBe(false);
			expect(Attribute.IsAttribute(Attribute.SAVING_THROW)).toBe(false);
		});

		it('returns false for an unknown symbol', () => {
			expect(Attribute.IsAttribute(Symbol('unknown'))).toBe(false);
		});

		it('returns false for a string', () => {
			expect(Attribute.IsAttribute('level')).toBe(false);
		});

		it('returns false for null', () => {
			expect(Attribute.IsAttribute(null)).toBe(false);
		});

		it('returns false for undefined', () => {
			expect(Attribute.IsAttribute()).toBe(false);
		});
	});

	// ─── GetAttribute() ────────────────────────────────────────────────────────

	describe('GetAttribute()', () => {
		it('returns the correct data for Attribute.LEVEL', () => {
			const data = Attribute.GetAttribute(Attribute.LEVEL);
			expect(data.name).toBe('Level');
			expect(data.abbreviation).toBe('lvl');
			expect(data.attributeType).toBe(Attribute.CHARACTER);
		});

		it('returns the correct data for Attribute.EXPERIENCE', () => {
			const data = Attribute.GetAttribute(Attribute.EXPERIENCE);
			expect(data.name).toBe('Experience');
			expect(data.abbreviation).toBe('xp');
			expect(data.attributeType).toBe(Attribute.CHARACTER);
		});

		it('returns the correct data for Attribute.ARMOR_CLASS', () => {
			const data = Attribute.GetAttribute(Attribute.ARMOR_CLASS);
			expect(data.name).toBe('Armor class');
			expect(data.abbreviation).toBe('ac');
			expect(data.attributeType).toBe(Attribute.CHARACTER);
		});

		it('returns the correct data for Attribute.HIT_POINTS', () => {
			const data = Attribute.GetAttribute(Attribute.HIT_POINTS);
			expect(data.name).toBe('Hit points');
			expect(data.abbreviation).toBe('hp');
			expect(data.attributeType).toBe(Attribute.CHARACTER);
		});

		it('returns the correct data for Attribute.ATTACK_BONUS', () => {
			const data = Attribute.GetAttribute(Attribute.ATTACK_BONUS);
			expect(data.name).toBe('Attack bonus');
			expect(data.abbreviation).toBe('atk');
			expect(data.attributeType).toBe(Attribute.CHARACTER);
		});

		it('returns the correct data for Attribute.MONEY', () => {
			const data = Attribute.GetAttribute(Attribute.MONEY);
			expect(data.name).toBe('Money');
			expect(data.abbreviation).toBe('gp');
			expect(data.attributeType).toBe(Attribute.CHARACTER);
		});

		it('returns the correct data for Attribute.DEATH_POISON', () => {
			const data = Attribute.GetAttribute(Attribute.DEATH_POISON);
			expect(data.name).toBe('Death poison');
			expect(data.attributeType).toBe(Attribute.SAVING_THROW);
		});

		it('returns the correct data for Attribute.WANDS', () => {
			const data = Attribute.GetAttribute(Attribute.WANDS);
			expect(data.name).toBe('Wands');
			expect(data.attributeType).toBe(Attribute.SAVING_THROW);
		});

		it('returns the correct data for Attribute.PARALYZE_STONE', () => {
			const data = Attribute.GetAttribute(Attribute.PARALYZE_STONE);
			expect(data.name).toBe('Paralyze stone');
			expect(data.attributeType).toBe(Attribute.SAVING_THROW);
		});

		it('returns the correct data for Attribute.DRAGON_BREATH', () => {
			const data = Attribute.GetAttribute(Attribute.DRAGON_BREATH);
			expect(data.name).toBe('Dragon breath');
			expect(data.attributeType).toBe(Attribute.SAVING_THROW);
		});

		it('returns the correct data for Attribute.SPELLS', () => {
			const data = Attribute.GetAttribute(Attribute.SPELLS);
			expect(data.name).toBe('Spells');
			expect(data.attributeType).toBe(Attribute.SAVING_THROW);
		});

		it('returns undefined for an unknown symbol', () => {
			expect(Attribute.GetAttribute(Symbol('unknown'))).toBeUndefined();
		});

		it('returns undefined for null', () => {
			expect(Attribute.GetAttribute(null)).toBeUndefined();
		});

		it('returns undefined for undefined', () => {
			expect(Attribute.GetAttribute()).toBeUndefined();
		});

		it('returns undefined for a string', () => {
			expect(Attribute.GetAttribute('level')).toBeUndefined();
		});
	});

	// ─── IsAttributeOfType() ───────────────────────────────────────────────────

	describe('IsAttributeOfType()', () => {
		it('returns true when a CHARACTER attribute is checked against CHARACTER', () => {
			expect(Attribute.IsAttributeOfType(Attribute.LEVEL, Attribute.CHARACTER)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.EXPERIENCE, Attribute.CHARACTER)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.ARMOR_CLASS, Attribute.CHARACTER)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.HIT_POINTS, Attribute.CHARACTER)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.ATTACK_BONUS, Attribute.CHARACTER)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.MONEY, Attribute.CHARACTER)).toBe(true);
		});

		it('returns true when a SAVING_THROW attribute is checked against SAVING_THROW', () => {
			expect(Attribute.IsAttributeOfType(Attribute.DEATH_POISON, Attribute.SAVING_THROW)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.WANDS, Attribute.SAVING_THROW)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.PARALYZE_STONE, Attribute.SAVING_THROW)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.DRAGON_BREATH, Attribute.SAVING_THROW)).toBe(true);
			expect(Attribute.IsAttributeOfType(Attribute.SPELLS, Attribute.SAVING_THROW)).toBe(true);
		});

		it('returns false when a CHARACTER attribute is checked against SAVING_THROW', () => {
			expect(Attribute.IsAttributeOfType(Attribute.LEVEL, Attribute.SAVING_THROW)).toBe(false);
		});

		it('returns false when a SAVING_THROW attribute is checked against CHARACTER', () => {
			expect(Attribute.IsAttributeOfType(Attribute.DEATH_POISON, Attribute.CHARACTER)).toBe(false);
		});

		it('returns false for an unknown type symbol', () => {
			expect(Attribute.IsAttributeOfType(Symbol('unknown'), Attribute.CHARACTER)).toBe(false);
		});

		it('returns false when type is null', () => {
			expect(Attribute.IsAttributeOfType(null, Attribute.CHARACTER)).toBe(false);
		});

		it('returns false when type is undefined', () => {
			expect(Attribute.IsAttributeOfType(undefined, Attribute.CHARACTER)).toBe(false);
		});

		it('returns false when attributeType is null', () => {
			expect(Attribute.IsAttributeOfType(Attribute.LEVEL, null)).toBe(false);
		});

		it('returns false when attributeType is undefined', () => {
			expect(Attribute.IsAttributeOfType(Attribute.LEVEL, undefined)).toBe(false);
		});

		it('returns false when attributeType is an unknown symbol', () => {
			expect(Attribute.IsAttributeOfType(Attribute.LEVEL, Symbol('unknown'))).toBe(false);
		});
	});
});
