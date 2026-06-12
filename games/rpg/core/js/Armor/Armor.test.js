import { readFileSync } from "fs";
import { describe, it, expect, beforeEach } from 'vitest';
import Armor from './Armor';
import Item from './../Item/Item';

const armorDatabase = readFileSync('./databases/jsonl/armor.jsonl', 'utf-8');
const armorData = JSON.parse(`[${armorDatabase.split('\r\n').join(',')}]`);

const VALID_ARMOR_ID = armorData[0]['id'];
const VALID_ARMOR_CATEGORY = armorData[0]['category'][0];

describe('Armor', () => {
	let armor;

	beforeEach(() => {
		armor = new Armor({
			name: 'Leather Armor',
			price: 10,
			priceUnit: 'gp',
			weight: 10,
			armorClass: 11,
			category: ['Light', 'Leather']
		});
	});

	describe('Inheritance', () => {
		it('should be an instance of Item', () => {
			expect(armor).toBeInstanceOf(Item);
		});

		it('should have all Item properties', () => {
			expect(armor).toHaveProperty('id');
			expect(armor).toHaveProperty('name');
			expect(armor).toHaveProperty('price');
			expect(armor).toHaveProperty('priceUnit');
			expect(armor).toHaveProperty('weight');
		});
	});

	describe('Constructor', () => {
		it('should create armor with provided properties', () => {
			expect(armor.name).toBe('Leather Armor');
			expect(armor.price).toBe(10);
			expect(armor.priceUnit).toBe('gp');
			expect(armor.weight).toBe(10);
			expect(armor.armorClass).toBe(11);
			expect(armor.category).toEqual(['Light', 'Leather']);
		});

		it('should default category to ["armor"] if not provided', () => {
			const defaultArmor = new Armor({
				name: 'Chain Mail',
				price: 75,
				priceUnit: 'gp',
				weight: 55,
				armorClass: 16
			});
			expect(defaultArmor.category).toEqual(['armor']);
		});

		it('should throw error if armorClass is not a number', () => {
			expect(() => {
				new Armor({
					name: 'Plate Armor',
					price: 1500,
					priceUnit: 'gp',
					weight: 65,
					armorClass: '18',
					category: ['Heavy', 'Plate']
				});
			}).toThrow();
		});

		it('should throw error if category is not an array', () => {
			expect(() => {
				new Armor({
					name: 'Plate Armor',
					price: 1500,
					priceUnit: 'gp',
					weight: 65,
					armorClass: 18,
					category: 'Heavy'
				});
			}).toThrow();
		});

		it('should throw error if category array contains non-string elements', () => {
			expect(() => {
				new Armor({
					name: 'Plate Armor',
					price: 1500,
					priceUnit: 'gp',
					weight: 65,
					armorClass: 18,
					category: ['Heavy', 123]
				});
			}).toThrow();
		});
	});

	describe('Properties (read-only)', () => {
		it('should be read-only for armorClass', () => {
			expect(() => {
				armor.armorClass = 15;
			}).toThrow();
		});

		it('should be read-only for category', () => {
			expect(() => {
				armor.category = ['Heavy'];
			}).toThrow();
		});
	});

	describe('toObject()', () => {
		it('should return an object representation of the armor', () => {
			const armorObject = armor.toObject();
			expect(typeof armorObject).toBe('object');
			expect(armorObject).not.toBeNull();
		});

		it('should include all Item properties in the returned object', () => {
			const armorObject = armor.toObject();
			expect(armorObject).toHaveProperty('id');
			expect(armorObject).toHaveProperty('name');
			expect(armorObject).toHaveProperty('price');
			expect(armorObject).toHaveProperty('priceUnit');
			expect(armorObject).toHaveProperty('weight');
		});

		it('should include all Armor properties in the returned object', () => {
			const armorObject = armor.toObject();
			expect(armorObject).toHaveProperty('armorClass');
			expect(armorObject).toHaveProperty('category');
		});

		it('should return correct values for all properties', () => {
			const armorObject = armor.toObject();
			expect(armorObject.name).toBe('Leather Armor');
			expect(armorObject.price).toBe(10);
			expect(armorObject.priceUnit).toBe('gp');
			expect(armorObject.weight).toBe(10);
			expect(armorObject.armorClass).toBe(11);
			expect(armorObject.category).toEqual(['Light', 'Leather']);
		});

		it('should include default category when not provided', () => {
			const defaultArmor = new Armor({
				name: 'Chain Mail',
				price: 75,
				priceUnit: 'gp',
				weight: 55,
				armorClass: 16
			});
			const armorObject = defaultArmor.toObject();
			expect(armorObject.category).toEqual(['armor']);
		});

		it('should return a copy, not a reference to the original', () => {
			const armorObject = armor.toObject();
			armorObject.armorClass = 20;
			armorObject.category = ['Heavy'];
			expect(armor.armorClass).toBe(11);
			expect(armor.category).toEqual(['Light', 'Leather']);
		});

		it('should reflect current armor state', () => {
			armor.setPrice(50);
			const armorObject = armor.toObject();
			expect(armorObject.price).toBe(50);
		});
	});

	describe('static methods', () => {
		describe('isArmor()', () => {
			it('should return true if the item is armor', () => {
				expect(Armor.IsArmor(VALID_ARMOR_ID)).toBe(true);
			});

			it('should return false if the item is armor', () => {
				expect(Armor.IsArmor('bad')).toBe(false);
			});

			it('should throw if id is not a string', () => {
				expect(() => Armor.IsArmor(123)).toThrow();
			});
		});

		describe('getArmor()', () => {
			it('should return data if the item is armor', () => {
				expect(Armor.GetArmor(VALID_ARMOR_ID)).toBeDefined();
			});

			it('should return undefined if the item is armor', () => {
				expect(Armor.GetArmor('bad')).toBeUndefined();
			});

			it('should throw if id is not a string', () => {
				expect(() => Armor.GetArmor(123)).toThrow();
			});
		});

		describe('isArmorCategory()', () => {
			it('should return true if the category is armor', () => {
				expect(Armor.IsArmorCategory(VALID_ARMOR_CATEGORY)).toBe(true);
			});

			it('should return false if the item is armor', () => {
				expect(Armor.IsArmorCategory('bad')).toBe(false);
			});

			it('should throw if id is not a string', () => {
				expect(() => Armor.IsArmorCategory(123)).toThrow();
			});
		});
	});
});