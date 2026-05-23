import { describe, it, expect } from 'vitest';
import Attribute from './Attribute.js';
import attributeData from './attributes.json' with { type: 'json' };

// A known-valid attribute type for use across tests
const VALID_TYPE = Attribute.LEVEL;
const VALID_VALUE = 10;

const CHARACTER_CATEGORY = Attribute.ATTRIBUTE_CATEGORY_CHARACTER;
const SAVING_THROW_CATEGORY = Attribute.ATTRIBUTE_CATEGORY_SAVING_THROW;
const MONEY_CATEGORY = Attribute.ATTRIBUTE_CATEGORY_MONEY;

const ATTRIBUTE_TYPES = attributeData.map(({ type, category, name, abbreviation, description }) => ({
	type: Attribute.SYMBOLS.get(type),
	category: Attribute.SYMBOLS.get(category),
	name: name,
	abbreviation: abbreviation,
	description: description
}))


const CHARACTER_ATTRIBUTES = ATTRIBUTE_TYPES.filter(
	({ category }) => category === CHARACTER_CATEGORY,
);

const SAVING_THROW_ATTRIBUTES = ATTRIBUTE_TYPES.filter(
	({ category }) => category === SAVING_THROW_CATEGORY,
);

const MONEY_ATTRIBUTES = ATTRIBUTE_TYPES.filter(
	({ category }) => category === MONEY_CATEGORY,
);

describe('Attribute', () => {

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with a valid type and value', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(attr).toBeInstanceOf(Attribute);
			});

			it.each(ATTRIBUTE_TYPES)('constructs with the $name attribute type', ({ type }) => {
				const attr = new Attribute({ type, value: VALID_VALUE });
				expect(attr).toBeInstanceOf(Attribute);
				expect(attr.type).toBe(type);
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

		it('category is derived from the attribute data', () => {
			const attr = new Attribute({ type: Attribute.LEVEL, value: VALID_VALUE });
			expect(attr.category).toBe(CHARACTER_CATEGORY);
		});

		it('name is derived from the attribute data', () => {
			const attr = new Attribute({ type: Attribute.LEVEL, value: VALID_VALUE });
			expect(attr.name).toBe('Level');
		});

		it('description is derived from the attribute data', () => {
			const attr = new Attribute({ type: Attribute.LEVEL, value: VALID_VALUE });
			expect(typeof attr.description).toBe('string');
		});

		it('abbreviation is derived from the attribute data', () => {
			const attr = new Attribute({ type: Attribute.LEVEL, value: VALID_VALUE });
			expect(attr.abbreviation).toBe('lvl');
		});

		it.each(ATTRIBUTE_TYPES)('returns derived data for $name', ({ type, category, name, abbreviation }) => {
			const attr = new Attribute({ type, value: VALID_VALUE });

			expect(attr.category).toBe(category);
			expect(attr.name).toBe(name);
			expect(typeof attr.description).toBe('string');

			if (abbreviation !== undefined) {
				expect(attr.abbreviation).toBe(abbreviation);
			} else {
				expect(typeof attr.abbreviation).toBe('string');
			}
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

			it('category cannot be reassigned', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(() => { attr.category = SAVING_THROW_CATEGORY; }).toThrow();
			});

			it('name cannot be reassigned', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(() => { attr.name = 'Changed'; }).toThrow();
			});

			it('description cannot be reassigned', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(() => { attr.description = 'Changed'; }).toThrow();
			});

			it('abbreviation cannot be reassigned', () => {
				const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
				expect(() => { attr.abbreviation = 'new'; }).toThrow();
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

		it('does not affect type or derived data', () => {
			const attr = new Attribute({ type: VALID_TYPE, value: VALID_VALUE });
			attr.setValue(20);

			expect(attr.type).toBe(VALID_TYPE);
			expect(attr.category).toBe(CHARACTER_CATEGORY);
			expect(attr.name).toBe('Level');
			expect(attr.abbreviation).toBe('lvl');
		});
	});

	// ─── Static Public Properties ──────────────────────────────────────────────

	describe('static attribute type properties', () => {
		it.each(ATTRIBUTE_TYPES)('$name type is a Symbol', ({ type }) => {
			expect(typeof type).toBe('symbol');
		});

		it('defines unique symbols for each attribute type', () => {
			const uniqueTypes = new Set(ATTRIBUTE_TYPES.map(({ type }) => type));
			expect(uniqueTypes.size).toBe(ATTRIBUTE_TYPES.length);
		});
	});

	describe('static attribute category properties', () => {
		it('defines ATTRIBUTE_CATEGORY_CHARACTER as a Symbol', () => {
			expect(typeof CHARACTER_CATEGORY).toBe('symbol');
		});

		it('defines ATTRIBUTE_CATEGORY_SAVING_THROW as a Symbol', () => {
			expect(typeof SAVING_THROW_CATEGORY).toBe('symbol');
		});

		it('defines ATTRIBUTE_CATEGORY_MONEY as a Symbol', () => {
			expect(typeof MONEY_CATEGORY).toBe('symbol');
		});

		it('defines unique symbols for each attribute category', () => {
			const uniqueCategories = new Set([
				CHARACTER_CATEGORY,
				SAVING_THROW_CATEGORY,
				MONEY_CATEGORY,
			]);

			expect(uniqueCategories.size).toBe(3);
		});
	});

	// ─── IsAttribute() ─────────────────────────────────────────────────────────

	describe('IsAttribute()', () => {
		it.each(ATTRIBUTE_TYPES)('returns true for $name', ({ type }) => {
			expect(Attribute.IsAttribute(type)).toBe(true);
		});

		it('returns false for category symbols', () => {
			expect(Attribute.IsAttribute(CHARACTER_CATEGORY)).toBe(false);
			expect(Attribute.IsAttribute(SAVING_THROW_CATEGORY)).toBe(false);
			expect(Attribute.IsAttribute(MONEY_CATEGORY)).toBe(false);
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
			expect(Attribute.IsAttribute(undefined)).toBe(false);
		});
	});

	// ─── GetAttribute() ────────────────────────────────────────────────────────

	describe('GetAttribute()', () => {
		it.each(ATTRIBUTE_TYPES)('returns the correct data for $name', ({ type, category, name, abbreviation }) => {
			const data = Attribute.GetAttribute(type);

			expect(data.category).toBe(category);
			expect(data.name).toBe(name);
			expect(typeof data.description).toBe('string');

			if (abbreviation !== undefined) {
				expect(data.abbreviation).toBe(abbreviation);
			} else {
				expect(typeof data.abbreviation).toBe('string');
			}
		});

		it('returns undefined for an unknown symbol', () => {
			expect(Attribute.GetAttribute(Symbol('unknown'))).toBeUndefined();
		});

		it('returns undefined for null', () => {
			expect(Attribute.GetAttribute(null)).toBeUndefined();
		});

		it('returns undefined for undefined', () => {
			expect(Attribute.GetAttribute(undefined)).toBeUndefined();
		});

		it('returns undefined for a string', () => {
			expect(Attribute.GetAttribute('level')).toBeUndefined();
		});
	});

});
