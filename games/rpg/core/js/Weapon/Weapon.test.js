import { describe, it, expect, beforeEach } from 'vitest';
import Weapon from './Weapon';
import Item from './../Item/Item';
import Size from "../../static/Size/Size.js";

describe('Weapon', () => {
	let weapon;

	const VALID_WEAPON_ID = '9379cfbc-3145-4eef-a424-08282ade13af';

	beforeEach(() => {
		weapon = new Weapon({
			name: 'Longsword',
			price: 15,
			priceUnit: 'gp',
			weight: 3,
			size: Size.MEDIUM,
			damage: '1d8',
			category: ['Melee', 'Blade']
		});
	});

	describe('Inheritance', () => {
		it('should be an instance of Item', () => {
			expect(weapon).toBeInstanceOf(Item);
		});
	});

	describe('Constructor', () => {
		it('should create a weapon with provided properties', () => {
			expect(weapon.name).toBe('Longsword');
			expect(weapon.price).toBe(15);
			expect(weapon.priceUnit).toBe('gp');
			expect(weapon.weight).toBe(3);
			expect(weapon.size).toBe(Size.MEDIUM);
			expect(weapon.damage).toBe('1d8');
			expect(weapon.range).toBeUndefined();
			expect(weapon.sharp).toBe(true);
			expect(weapon.category).toEqual(['Melee', 'Blade']);
		});

		it('should create a weapon with range', () => {
			const rangedWeapon = new Weapon({
				name: 'Longbow',
				price: 50,
				priceUnit: 'gp',
				weight: 2,
				size: 'lg',
				damage: '1d8',
				range: [[150, 0], [600, -2]],
				category: ['Melee', 'Blade']
			});
			expect(rangedWeapon.range).toEqual([[150, 0], [600, -2]]);
		});

		it('should create a weapon with sharp', () => {
			const rangedWeapon = new Weapon({
				name: 'Longbow',
				price: 50,
				priceUnit: 'gp',
				weight: 2,
				size: 'lg',
				damage: '1d8',
				sharp: false,
				range: [[150, 0], [600, -2]],
				category: ['Melee', 'Blade']
			});
			expect(rangedWeapon.sharp).toEqual(false);
		});


		it('should default range to undefined if not provided', () => {
			const meleeWeapon = new Weapon({
				name: 'Dagger',
				price: 2,
				priceUnit: 'gp',
				weight: 1,
				size: 'sm',
				damage: '1d4',
				category: ['Melee', 'Blade']
			});
			expect(meleeWeapon.range).toBeUndefined();
		});

		it('should throw error if category is not an array', () => {
			expect(() => {
				new Weapon({
					name: 'Sword',
					price: 15,
					priceUnit: 'gp',
					weight: 3,
					size: 'md',
					damage: '1d8',
					category: 'Melee'
				});
			}).toThrow();
		});

		it('should throw error if category array contains non-string elements', () => {
			expect(() => {
				new Weapon({
					name: 'Sword',
					price: 15,
					priceUnit: 'gp',
					weight: 3,
					size: 'md',
					damage: '1d8',
					category: ['Melee', 123]
				});
			}).toThrow();
		});

		if('should throw error id sharp is not a boolean', () => {
			expect(() => {
				new Weapon({
					name: 'Sword',
					price: 15,
					priceUnit: 'gp',
					weight: 3,
					size: 'md',
					damage: '1d8',
					sharp: 'bad',
					category: ['Melee', 'Blade']
				});
			}).toThrow();
		})

		it('should throw error if size is not a string', () => {
			expect(() => {
				new Weapon({
					name: 'Sword',
					price: 15,
					priceUnit: 'gp',
					weight: 3,
					size: 123,
					damage: '1d8',
					category: ['Melee', 'Blade']
				});
			}).toThrow();
		});

		it('should throw error if damage is not a string', () => {
			expect(() => {
				new Weapon({
					name: 'Sword',
					price: 15,
					priceUnit: 'gp',
					weight: 3,
					size: 'md',
					damage: 123,
					category: ['Melee', 'Blade']
				});
			}).toThrow();
		});

		it('should throw error if range is not an array', () => {
			expect(() => {
				new Weapon({
					name: 'Bow',
					price: 50,
					priceUnit: 'gp',
					weight: 2,
					size: 'lg',
					damage: '1d8',
					range: '150',
					category: ['Melee', 'Blade']
				});
			}).toThrow();
		});
	});

	describe('Properties (read-only)', () => {
		it('should be read-only for size', () => {
			expect(() => {
				weapon.size = 'lg';
			}).toThrow();
		});

		it('should be read-only for damage', () => {
			expect(() => {
				weapon.damage = '1d10';
			}).toThrow();
		});

		it('should be read-only for range', () => {
			expect(() => {
				weapon.range = [[150, 0]];
			}).toThrow();
		});

		it('should be read-only for category', () => {
			expect(() => {
				weapon.category = ['Ranged'];
			}).toThrow();
		});

		it('should be read-only for sharp', () => {
			expect(() => {
				weapon.sharp = false;
			}).toThrow();
		});
	});

	describe('toObject()', () => {
		it('should return an object representation of the weapon', () => {
			const weaponObject = weapon.toObject();
			expect(typeof weaponObject).toBe('object');
			expect(weaponObject).not.toBeNull();
		});

		it('should include all Item properties in the returned object', () => {
			const weaponObject = weapon.toObject();
			expect(weaponObject).toHaveProperty('id');
			expect(weaponObject).toHaveProperty('name');
			expect(weaponObject).toHaveProperty('price');
			expect(weaponObject).toHaveProperty('priceUnit');
			expect(weaponObject).toHaveProperty('weight');
		});

		it('should include all Weapon properties in the returned object', () => {
			const weaponObject = weapon.toObject();
			expect(weaponObject).toHaveProperty('size');
			expect(weaponObject).toHaveProperty('damage');
			expect(weaponObject).toHaveProperty('range');
			expect(weaponObject).toHaveProperty('sharp');
			expect(weaponObject).toHaveProperty('category');
		});

		it('should return correct values for all properties', () => {
			const weaponObject = weapon.toObject();
			expect(weaponObject.name).toBe('Longsword');
			expect(weaponObject.price).toBe(15);
			expect(weaponObject.priceUnit).toBe('gp');
			expect(weaponObject.weight).toBe(3);
			expect(weaponObject.size).toBe(Size.GetSize(Size.MEDIUM).abbr);
			expect(weaponObject.damage).toBe('1d8');
			expect(weaponObject.range).toBeUndefined();
			expect(weaponObject.sharp).toBe(true);
			expect(weaponObject.category).toEqual(['Melee', 'Blade']);
		});

		it('should include range data when present', () => {
			const rangedWeapon = new Weapon({
				name: 'Longbow',
				price: 50,
				priceUnit: 'gp',
				weight: 2,
				size: 'lg',
				damage: '1d8',
				range: [[150, 0], [600, -2]],
				category: ['Melee', 'Blade']
			});
			const weaponObject = rangedWeapon.toObject();
			expect(weaponObject.range).toEqual([[150, 0], [600, -2]]);
		});

		it('should return a copy, not a reference to the original', () => {
			const weaponObject = weapon.toObject();
			weaponObject.size = Size.LARGE;
			weaponObject.damage = '2d6';
			expect(weapon.size).toBe(Size.MEDIUM);
			expect(weapon.damage).toBe('1d8');
		});

		it('should reflect current weapon state', () => {
			weapon.setPrice(100);
			const weaponObject = weapon.toObject();
			expect(weaponObject.price).toBe(100);
		});
	});

	describe('static methods', () => {
		describe('IsWeapon()', () => {
			it('should return true if the item is armor', () => {
				expect(Weapon.IsWeapon(VALID_WEAPON_ID)).toBe(true);
			});

			it('should return false if the item is armor', () => {
				expect(Weapon.IsWeapon('bad')).toBe(false);
			});

			it('should throw if id is not a string', () => {
				expect(() => Weapon.IsWeapon(123)).toThrow();
			});
		});

		describe('GetWeapon()', () => {
			it('should return data if the item is armor', () => {
				expect(Weapon.GetWeapon(VALID_WEAPON_ID)).toBeDefined();
			});

			it('should return undefined if the item is armor', () => {
				expect(Weapon.GetWeapon('bad')).toBeUndefined();
			});

			it('should throw if id is not a string', () => {
				expect(() => Weapon.GetWeapon(123)).toThrow();
			});
		});
	});


});