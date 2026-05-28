import { describe, it, expect, beforeEach } from 'vitest';
import Money from './Money'; // Adjust the import path as needed

describe('Money', () => {
	describe('constructor', () => {
		it('should throw an error when instantiated', () => {
			expect(() => new Money()).toThrow();
		});
	});

	describe('Public Static Properties', () => {
		it('should have PLATINUM symbol', () => {
			expect(Money.PLATINUM).toBeDefined();
		});

		it('should have GOLD symbol', () => {
			expect(Money.GOLD).toBeDefined();
		});

		it('should have ELECTRUM symbol', () => {
			expect(Money.ELECTRUM).toBeDefined();
		});

		it('should have SILVER symbol', () => {
			expect(Money.SILVER).toBeDefined();
		});

		it('should have COPPER symbol', () => {
			expect(Money.COPPER).toBeDefined();
		});

		it('should have SYMBOLS array containing all symbols', () => {
			expect(Money.SYMBOLS).toContain(Money.PLATINUM);
			expect(Money.SYMBOLS).toContain(Money.GOLD);
			expect(Money.SYMBOLS).toContain(Money.ELECTRUM);
			expect(Money.SYMBOLS).toContain(Money.SILVER);
			expect(Money.SYMBOLS).toContain(Money.COPPER);
			expect(Money.SYMBOLS).toHaveLength(5);
		});
	});

	describe('GetMoney()', () => {
		it('should return money data for valid abbreviation', () => {
			const money = Money.GetMoney('pp');
			expect(money).toBeDefined();
			expect(money.name).toBeDefined();
			expect(money.abbr).toBeDefined();
			expect(money.exchangeRate).toBeDefined();
		});

		it('should return money data for valid symbol', () => {
			const money = Money.GetMoney(Money.PLATINUM);
			expect(money).toBeDefined();
			expect(money.name).toBeDefined();
			expect(money.abbr).toBeDefined();
			expect(money.exchangeRate).toBeDefined();
		});

		it('should return undefined for invalid abbreviation', () => {
			const money = Money.GetMoney('invalid');
			expect(money).toBeUndefined();
		});

		it('should return undefined for invalid symbol', () => {
			const money = Money.GetMoney(Symbol('invalid'));
			expect(money).toBeUndefined();
		});

		it('should return a copy of the data, not the original', () => {
			const money1 = Money.GetMoney('pp');
			const money2 = Money.GetMoney('pp');
			expect(money1).toEqual(money2);
			expect(money1).not.toBe(money2);
		});
	});

	describe('IsMoney()', () => {
		it('should return true for valid abbreviation', () => {
			expect(Money.IsMoney('pp')).toBe(true);
		});

		it('should return true for valid symbol', () => {
			expect(Money.IsMoney(Money.PLATINUM)).toBe(true);
		});

		it('should return false for invalid abbreviation', () => {
			expect(Money.IsMoney('invalid')).toBe(false);
		});

		it('should return false for invalid symbol', () => {
			expect(Money.IsMoney(Symbol('invalid'))).toBe(false);
		});

		it('should return true for all defined symbols', () => {
			expect(Money.IsMoney(Money.PLATINUM)).toBe(true);
			expect(Money.IsMoney(Money.GOLD)).toBe(true);
			expect(Money.IsMoney(Money.ELECTRUM)).toBe(true);
			expect(Money.IsMoney(Money.SILVER)).toBe(true);
			expect(Money.IsMoney(Money.COPPER)).toBe(true);
		});
	});

	describe('GetExchangeRate()', () => {
		it('should return a number for valid exchange rate', () => {
			const rate = Money.GetExchangeRate(1, 'pp', 'gp');
			expect(typeof rate).toBe('number');
		});

		it('should convert from one currency to another using abbreviations', () => {
			const rate = Money.GetExchangeRate(1, 'pp', 'gp');
			expect(rate).toBeGreaterThan(0);
		});

		it('should convert from one currency to another using symbols', () => {
			const rate = Money.GetExchangeRate(1, Money.PLATINUM, Money.GOLD);
			expect(rate).toBeGreaterThan(0);
		});

		it('should handle mixed abbreviation and symbol parameters', () => {
			const rate1 = Money.GetExchangeRate(1, 'pp', Money.GOLD);
			const rate2 = Money.GetExchangeRate(1, Money.PLATINUM, 'gp');
			expect(rate1).toBeGreaterThan(0);
			expect(rate2).toBeGreaterThan(0);
		});

		it('should scale the exchange rate by the amount parameter', () => {
			const rate1 = Money.GetExchangeRate(1, 'pp', 'gp');
			const rate10 = Money.GetExchangeRate(10, 'pp', 'gp');
			expect(rate10).toBe(rate1 * 10);
		});

		it('should handle conversion from lower value to higher value currency', () => {
			const rate = Money.GetExchangeRate(1, 'cp', 'pp');
			expect(rate).toBeGreaterThan(0);
		});

		it('should handle conversion from higher value to lower value currency', () => {
			const rate = Money.GetExchangeRate(1, 'pp', 'cp');
			expect(rate).toBeGreaterThan(0);
		});

		it('should return the same amount when converting to the same currency', () => {
			const rate = Money.GetExchangeRate(5, 'pp', 'pp');
			expect(rate).toBe(5);
		});

		it('should return undefined for invalid source currency', () => {
			const rate = Money.GetExchangeRate(1, 'invalid', 'gp');
			expect(rate).toBeUndefined();
		});

		it('should return undefined for invalid target currency', () => {
			const rate = Money.GetExchangeRate(1, 'pp', 'invalid');
			expect(rate).toBeUndefined();
		});

		it('should return undefined for both invalid source and target currencies', () => {
			const rate = Money.GetExchangeRate(1, 'invalid1', 'invalid2');
			expect(rate).toBeUndefined();
		});
	});
});