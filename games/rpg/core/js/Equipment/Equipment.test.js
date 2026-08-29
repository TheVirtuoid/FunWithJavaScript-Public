import { describe, it, expect, beforeEach } from 'vitest';
import Equipment from './Equipment';
import Item from "../Item/Item.js";
import {readFileSync} from "fs";
import config from './../../../config.json' with { type: 'json' };


const database = readFileSync('./databases/jsonl/equipment.jsonl', 'utf-8');
const data = JSON.parse(`[${database.split(config.database.delimiter).join(',')}]`);

const VALID_EQUIPMENT_ID = data[0]['id'];

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
