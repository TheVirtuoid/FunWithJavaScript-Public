import { describe, it, expect } from 'vitest';
import Size from './Size'; // Adjust the import path as needed

describe('Size', () => {
	describe('constructor', () => {
		it('should throw an error when instantiated', () => {
			expect(() => new Size()).toThrow();
		});
	});

	describe('Public Static Properties', () => {
		it('should have SMALL symbol', () => {
			expect(Size.SMALL).toBe(Size.SMALL);
			expect(typeof Size.SMALL).toBe('symbol');
		});

		it('should have MEDIUM symbol', () => {
			expect(Size.MEDIUM).toBe(Size.MEDIUM);
			expect(typeof Size.MEDIUM).toBe('symbol');
		});

		it('should have LARGE symbol', () => {
			expect(Size.LARGE).toBe(Size.LARGE);
			expect(typeof Size.LARGE).toBe('symbol');
		});

		it('should have SYMBOLS array containing all symbols', () => {
			expect(Size.SYMBOLS).toContain(Size.SMALL);
			expect(Size.SYMBOLS).toContain(Size.MEDIUM);
			expect(Size.SYMBOLS).toContain(Size.LARGE);
			expect(Size.SYMBOLS).toHaveLength(3);
		});
	});

	describe('GetSize()', () => {
		it('should return size data for valid abbreviation', () => {
			const size = Size.GetSize('sm');
			expect(size).toBeDefined();
			expect(size.name).toBeDefined();
			expect(size.abbr).toBeDefined();
		});

		it('should return size data for valid symbol', () => {
			const size = Size.GetSize(Size.SMALL);
			expect(size).toBeDefined();
			expect(size.name).toBeDefined();
			expect(size.abbr).toBeDefined();
		});

		it('should return undefined for invalid abbreviation', () => {
			const size = Size.GetSize('invalid');
			expect(size).toBeUndefined();
		});

		it('should return undefined for invalid symbol', () => {
			const size = Size.GetSize(Symbol('invalid'));
			expect(size).toBeUndefined();
		});

		it('should return a copy of the data, not the original', () => {
			const size1 = Size.GetSize('sm');
			const size2 = Size.GetSize('sm');
			expect(size1).toEqual(size2);
			expect(size1).not.toBe(size2);
		});

		it('should return correct data for all valid sizes', () => {
			const smallBySymbol = Size.GetSize(Size.SMALL);
			const mediumBySymbol = Size.GetSize(Size.MEDIUM);
			const largeBySymbol = Size.GetSize(Size.LARGE);

			expect(smallBySymbol).toBeDefined();
			expect(mediumBySymbol).toBeDefined();
			expect(largeBySymbol).toBeDefined();
		});
	});

	describe('IsSize()', () => {
		it('should return true for valid abbreviation', () => {
			expect(Size.IsSize('sm')).toBe(true);
		});

		it('should return true for valid symbol', () => {
			expect(Size.IsSize(Size.SMALL)).toBe(true);
		});

		it('should return false for invalid abbreviation', () => {
			expect(Size.IsSize('invalid')).toBe(false);
		});

		it('should return false for invalid symbol', () => {
			expect(Size.IsSize(Symbol('invalid'))).toBe(false);
		});

		it('should return true for all defined symbols', () => {
			expect(Size.IsSize(Size.SMALL)).toBe(true);
			expect(Size.IsSize(Size.MEDIUM)).toBe(true);
			expect(Size.IsSize(Size.LARGE)).toBe(true);
		});
	});

	describe('GetSymbol()', () => {
		it('should return valid for valid abbreviation', () => {
			expect(Size.GetSymbol('sm')).toBe(Size.SMALL);
		});

		it('should return the valid symbol for a valid symbol', () => {
			expect(Size.GetSymbol(Size.SMALL)).toBe(Size.SMALL);
		});

		it('should return undefined for invalid abbreviation', () => {
			expect(Size.GetSymbol('invalid')).toBeUndefined();
		});

		it('should return undefined', () => {
			expect(Size.GetSymbol(Symbol('invalid'))).toBeUndefined();
		});
	});


});