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
		it('returns true for each valid attribute type', () => {
			expect(Attribute.IsAttribute(Attribute.LEVEL)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.EXPERIENCE)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.ARMOR_CLASS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.HIT_POINTS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.ATTACK_BONUS)).toBe(true);
			expect(Attribute.IsAttribute(Attribute.MONEY)).toBe(true);
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
		});

		it('returns the correct data for Attribute.EXPERIENCE', () => {
			const data = Attribute.GetAttribute(Attribute.EXPERIENCE);
			expect(data.name).toBe('Experience');
			expect(data.abbreviation).toBe('xp');
		});

		it('returns the correct data for Attribute.ARMOR_CLASS', () => {
			const data = Attribute.GetAttribute(Attribute.ARMOR_CLASS);
			expect(data.name).toBe('Armor class');
			expect(data.abbreviation).toBe('ac');
		});

		it('returns the correct data for Attribute.HIT_POINTS', () => {
			const data = Attribute.GetAttribute(Attribute.HIT_POINTS);
			expect(data.name).toBe('Hit points');
			expect(data.abbreviation).toBe('hp');
		});

		it('returns the correct data for Attribute.ATTACK_BONUS', () => {
			const data = Attribute.GetAttribute(Attribute.ATTACK_BONUS);
			expect(data.name).toBe('Attack bonus');
			expect(data.abbreviation).toBe('atk');
		});

		it('returns the correct data for Attribute.MONEY', () => {
			const data = Attribute.GetAttribute(Attribute.MONEY);
			expect(data.name).toBe('Money');
			expect(data.abbreviation).toBe('gp');
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
});
