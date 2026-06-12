import { describe, it, expect } from 'vitest';
import Attribute from './Attribute.js';
import {readFileSync} from "fs";

const database = readFileSync('./databases/jsonl/attributes.jsonl', 'utf-8');
const data = JSON.parse(`[${database.split('\r\n').join(',')}]`);

// A known-valid attribute type for use across tests
const VALID_ID = data[0]['id'];
const VALID_VALUE = 10;
const VALID_NAME = data[0]['name'];
const VALID_TYPE = data[0]['type'];
const VALID_ABBREVIATION = data[0]['abbreviation'];
const VALID_CATEGORY = data[0]['category'];

describe('Attribute', () => {

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with a valid type and value', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(attr).toBeInstanceOf(Attribute);
			});
		});

		describe('id argument', () => {
			it('throws when id is missing', () => {
				expect(() => new Attribute({ value: VALID_VALUE })).toThrow();
			});

			it('throws when id is not a string', () => {
				expect(() => new Attribute({ id: Symbol('unknown'), value: VALID_VALUE })).toThrow();
			});
		});

		describe('value argument', () => {
			it('throws when value is missing', () => {
				expect(() => new Attribute({ id: VALID_ID })).toThrow();
			});

			it('throws when value is a float', () => {
				expect(() => new Attribute({ id: VALID_ID, value: 1.5 })).toThrow();
			});

			it('throws when value is a string', () => {
				expect(() => new Attribute({ id: VALID_ID, value: '10' })).toThrow();
			});

			it('throws when value is null', () => {
				expect(() => new Attribute({ id: VALID_ID, value: null })).toThrow();
			});
		});
	});

	// ─── Properties ────────────────────────────────────────────────────────────

	describe('properties', () => {
		it('id returns the symbol passed to the constructor', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(attr.id).toBe(VALID_ID);
		});

		it('value returns the integer passed to the constructor', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(attr.value).toBe(VALID_VALUE);
		});

		it('category is derived from the attribute data', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(attr.category).toBe(VALID_CATEGORY);
		});

		it('name is derived from the attribute data', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(attr.name).toBe(VALID_NAME);
		});

		it('description is derived from the attribute data', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(typeof attr.description).toBe('string');
		});

		it('abbreviation is derived from the attribute data', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(attr.abbreviation).toBe(VALID_ABBREVIATION);
		});


		describe('read-only', () => {
			it('id cannot be reassigned', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { attr.id = 'bad'; }).toThrow();
			});

			it('value cannot be reassigned', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { attr.value = 99; }).toThrow();
			});

			it('category cannot be reassigned', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { attr.category = 'anything here'; }).toThrow();
			});

			it('name cannot be reassigned', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { attr.name = 'Changed'; }).toThrow();
			});

			it('description cannot be reassigned', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { attr.description = 'Changed'; }).toThrow();
			});

			it('abbreviation cannot be reassigned', () => {
				const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { attr.abbreviation = 'new'; }).toThrow();
			});
		});
	});

	// ─── setValue() ────────────────────────────────────────────────────────────

	describe('setValue()', () => {
		it('updates the value property', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			attr.setValue(20);
			expect(attr.value).toBe(20);
		});

		it('accepts negative integers', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			attr.setValue(-5);
			expect(attr.value).toBe(-5);
		});

		it('accepts zero', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			attr.setValue(0);
			expect(attr.value).toBe(0);
		});

		it('throws when given a float', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(() => attr.setValue(1.5)).toThrow();
		});

		it('throws when given a string', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(() => attr.setValue('10')).toThrow();
		});

		it('throws when given null', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(() => attr.setValue(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			expect(() => attr.setValue()).toThrow();
		});

		it('does not affect type or derived data', () => {
			const attr = new Attribute({ id: VALID_ID, value: VALID_VALUE });
			attr.setValue(20);

			expect(attr.type).toBe(VALID_TYPE);
			expect(attr.category).toBe(VALID_CATEGORY);
			expect(attr.name).toBe(VALID_NAME);
			expect(attr.abbreviation).toBe(VALID_ABBREVIATION);
		});
	});

	// ─── IsAttribute() ─────────────────────────────────────────────────────────

	describe('IsAttribute()', () => {
		it('throws if id is not a string', () => {
			expect(() => Attribute.IsAttribute(null)).toThrow();
		});

		it('should return true for valid id', () => {
			expect(Attribute.IsAttribute(VALID_ID)).toBe(true);
		});

		it('should return false for invalid id', () => {
			expect(Attribute.IsAttribute('bad')).toBe(false);
		});
	});

	// ─── GetAttribute() ────────────────────────────────────────────────────────

	describe('GetAttribute()', () => {
		it('throws if id is not a string', () => {
			expect(() => Attribute.GetAttribute(null)).toThrow();
		});

		it('should return data for valid id', () => {
			expect(Attribute.GetAttribute(VALID_ID)).toBeDefined();
		});

		it('should return undefined for invalid id', () => {
			expect(Attribute.GetAttribute('bad')).toBeUndefined();
		});
	});

	describe('GetCategoryData()', () => {
		it('throws if categoryName is not a string', () => {
			expect(() => Attribute.GetCategoryData(null)).toThrow();
		});

		it('should return data for valid category', () => {
			const category = Attribute.GetCategoryData(VALID_CATEGORY);
			expect(Array.isArray(category)).toBe(true);
			expect(category.length).toBeGreaterThan(0);
		});

		it('should return empty array for invalid category', () => {
			const badCategory = Attribute.GetCategoryData('bad');
			expect(Array.isArray(badCategory)).toBe(true);
			expect(badCategory.length).toEqual(0);
		});

	});

});
