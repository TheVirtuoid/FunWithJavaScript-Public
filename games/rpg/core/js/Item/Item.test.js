import { describe, it, expect, beforeEach } from 'vitest';
import Item from './Item';

describe('Item', () => {
	let item;

	beforeEach(() => {
		item = new Item({
			name: 'Iron Sword',
			price: 50,
			priceUnit: 'gp',
			weight: 3
		});
	});

	describe('Constructor', () => {
		it('should create an item with provided properties', () => {
			expect(item.name).toBe('Iron Sword');
			expect(item.price).toBe(50);
			expect(item.priceUnit).toBe('gp');
			expect(item.weight).toBe(3);
		});

		it('should auto-generate a unique id', () => {
			expect(item.id).toBeDefined();
			expect(typeof item.id).toBe('string');
		});

		it('should generate different ids for different items', () => {
			const item2 = new Item({
				name: 'Steel Armor',
				price: 100,
				priceUnit: 'gp',
				weight: 20
			});
			expect(item.id).not.toBe(item2.id);
		});

		it('should default priceUnit to "gp" if not provided', () => {
			const itemWithoutUnit = new Item({
				name: 'Wood Staff',
				price: 5,
				weight: 4
			});
			expect(itemWithoutUnit.priceUnit).toBe('gp');
		});

		it('should default weight to 0 if not provided', () => {
			const itemWithoutWeight = new Item({
				name: 'Wood Staff',
				priceUnit: 'gp',
				price: 4
			});
			expect(itemWithoutWeight.weight).toBe(0);
		});

		it('should default price to 0 if not provided', () => {
			const itemWithoutPrice = new Item({
				name: 'Wood Staff',
				priceUnit: 'gp',
				weight: 4
			});
			expect(itemWithoutPrice.price).toBe(0);
		});

		it('should throw error if name is not a string', () => {
			expect(() => {
				new Item({
					name: 123,
					price: 50,
					priceUnit: 'gp',
					weight: 3
				});
			}).toThrow();
		});
		it('should throw error if price is not a number', () => {
			expect(() => {
				new Item({
					name: 'Iron Sword',
					price: '50',
					priceUnit: 'gp',
					weight: 3
				});
			}).toThrow();
		});
		it('should throw error if priceUnit is not a string', () => {
			expect(() => {
				new Item({
					name: 'Iron Sword',
					price: 50,
					priceUnit: 123,
					weight: 3
				});
			}).toThrow();
		});
		it('should throw error if weight is not a number', () => {
			expect(() => {
				new Item({
					name: 'Iron Sword',
					price: 50,
					priceUnit: 'gp',
					weight: '3'
				});
			}).toThrow();
		});
		it('should throw error if weight is less than 0', () => {
			expect(() => {
				new Item({
					name: 'Iron Sword',
					price: 50,
					priceUnit: 'gp',
					weight: -1
				});
			}).toThrow();
		});
	});

	describe('Properties (read-only)', () => {
		it('should be read-only for id', () => {
			expect(() => {
				item.id = 'new-id';
			}).toThrow();
		});

		it('should be read-only for name', () => {
			expect(() => {
				item.name = 'New Name';
			}).toThrow();
		});

		it('should be read-only for price', () => {
			expect(() => {
				item.price = 100;
			}).toThrow();
		});

		it('should be read-only for priceUnit', () => {
			expect(() => {
				item.priceUnit = 'sp';
			}).toThrow();
		});

		it('should be read-only for weight', () => {
			expect(() => {
				item.weight = 10;
			}).toThrow();
		});
	});

	describe('setPrice()', () => {
		it('should update the price', () => {
			item.setPrice(75);
			expect(item.price).toBe(75);
		});

		it('should accept numeric values', () => {
			item.setPrice(150.5);
			expect(item.price).toBe(150.5);
		});

		it('should throw error if price is not a number', () => {
			expect(() => {
				item.setPrice('100');
			}).toThrow();
		});
	});

	describe('setPriceUnit()', () => {
		it('should update the price unit', () => {
			item.setPriceUnit('sp');
			expect(item.priceUnit).toBe('sp');
		});

		it('should accept string values', () => {
			const newUnit = 'pp';
			item.setPriceUnit(newUnit);
			expect(item.priceUnit).toBe(newUnit);
		});
		it('should throw error if priceUnit is not a string', () => {
			expect(() => {
				item.setPriceUnit(123);
			}).toThrow();
		});
	});

	describe('toObject()', () => {
		it('should return an object representation of the item', () => {
			const itemObject = item.toObject();
			expect(typeof itemObject).toBe('object');
			expect(itemObject).not.toBeNull();
		});

		it('should include all properties in the returned object', () => {
			const itemObject = item.toObject();
			expect(itemObject).toHaveProperty('id');
			expect(itemObject).toHaveProperty('name');
			expect(itemObject).toHaveProperty('price');
			expect(itemObject).toHaveProperty('priceUnit');
			expect(itemObject).toHaveProperty('weight');
		});

		it('should return a copy, not a reference to the original', () => {
			const itemObject = item.toObject();
			itemObject.price = 100;
			expect(item.price).toBe(50);
		});

		it('should reflect current item state', () => {
			item.setPrice(100);
			const itemObject = item.toObject();
			expect(itemObject.price).toBe(100);
		});
	});
});