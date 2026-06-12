import { describe, it, expect, beforeEach } from 'vitest';
import Equipment from './Equipment';
import Item from "../Item/Item.js";

const VALID_EQUIPMENT_ID = '6bcb5ff2-7eec-4367-84ff-4474ed9a0cfa';

describe('Equipment', () => {
	describe('constructor', () => {
		it('should create an Equipment instance with correct properties (test inheritance)', () => {
			const equipment = new Equipment({ name: 'Test Equipment'  });
			expect(equipment.name).toBe('Test Equipment');
			expect(equipment instanceof Equipment).toBe(true);
			expect(equipment instanceof Item).toBe(true);
		});
	});

	describe('static methods', () => {
		describe('IsEquipment()', () => {
			it('should return true if the item is armor', () => {
				expect(Equipment.IsEquipment(VALID_EQUIPMENT_ID)).toBe(true);
			});

			it('should return false if the item is armor', () => {
				expect(Equipment.IsEquipment('bad')).toBe(false);
			});

			it('should throw if id is not a string', () => {
				expect(() => Equipment.IsEquipment(123)).toThrow();
			});
		});

		describe('getEquipment()', () => {
			it('should return data if the item is armor', () => {
				expect(Equipment.GetEquipment(VALID_EQUIPMENT_ID)).toBeDefined();
			});

			it('should return undefined if the item is armor', () => {
				expect(Equipment.GetEquipment('bad')).toBeUndefined();
			});

			it('should throw if id is not a string', () => {
				expect(() => Equipment.GetEquipment(123)).toThrow();
			});
		});
	});
})
