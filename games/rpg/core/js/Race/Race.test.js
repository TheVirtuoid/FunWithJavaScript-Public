import { describe, it, expect, beforeEach } from 'vitest';
import Race from './Race';
import Ability from "../Ability/Ability.js";
import Size from "../../static/Size/Size.js";
import Attribute from "../Attribute/Attribute.js";

describe('Race', () => {
	let raceData;
	const baseClasses = [Symbol('fighter'), Symbol('magic-user'), Symbol('thief')];
	const baseRestrictions = [
		{
			restrictionType: Race.Restrictions.ABILITY,
			id: 'dd67458c-d4fe-483c-b518-d57cc3f14ddc',
			min: 3,
			max: 18
		},
		{
			restrictionType: Race.Restrictions.WEAPON_SIZE,
			type: [Size.MEDIUM, Size.LARGE]
		},
		{
			restrictionType: Race.Restrictions.HIT_POINTS,
			type: '1d6'
		}
	];
	const baseSpecialAbilities = [];
	const baseSavingThrows = [
		{
			attribute: '94b98920-6b9e-47a6-b59d-f83fa9ac3d0b',
			bonus: -1
		}
	];

	beforeEach(() => {
		raceData = {
			name: 'Human',
			description: 'A versatile and adaptable race',
			weight: 180,
			height: 70,
			age: 100,
			classes: baseClasses,
			restrictions: [...baseRestrictions],
			specialAbilities: [...baseSpecialAbilities],
			savingThrows: [...baseSavingThrows]
		};
	});



	describe('Constructor', () => {
		it('should require all constructor arguments', () => {
			expect(() => new Race({})).toThrow();
			expect(() => new Race({ name: 'Human' })).toThrow();
		});

		it('should create a Race with all required arguments', () => {
			const race = new Race(raceData);
			expect(race).toBeDefined();
		});

		it('should auto-generate a unique id', () => {
			const race1 = new Race(raceData);
			const race2 = new Race(raceData);

			expect(race1.id).toBeDefined();
			expect(race2.id).toBeDefined();
			expect(race1.id).not.toBe(race2.id);
		});
	});

	describe('Constructor - Type validation', () => {
		it('should throw when name is not a string', () => {
			expect(() => new Race({ ...raceData, name: 123 })).toThrow();
			expect(() => new Race({ ...raceData, name: null })).toThrow();
			expect(() => new Race({ ...raceData, name: undefined })).toThrow();
		});

		it('should throw when description is not a string', () => {
			expect(() => new Race({ ...raceData, description: 123 })).toThrow();
			expect(() => new Race({ ...raceData, description: null })).toThrow();
			expect(() => new Race({ ...raceData, description: undefined })).toThrow();
		});

		it('should throw when weight is not a number', () => {
			expect(() => new Race({ ...raceData, weight: 'heavy' })).toThrow();
			expect(() => new Race({ ...raceData, weight: null })).toThrow();
			expect(() => new Race({ ...raceData, weight: undefined })).toThrow();
		});

		it('should throw when height is not a number', () => {
			expect(() => new Race({ ...raceData, height: 'tall' })).toThrow();
			expect(() => new Race({ ...raceData, height: null })).toThrow();
			expect(() => new Race({ ...raceData, height: undefined })).toThrow();
		});

		it('should throw when age is not a number', () => {
			expect(() => new Race({ ...raceData, age: 'old' })).toThrow();
			expect(() => new Race({ ...raceData, age: null })).toThrow();
			expect(() => new Race({ ...raceData, age: undefined })).toThrow();
		});

		it('should throw when classes is not an array', () => {
			expect(() => new Race({ ...raceData, classes: 'Warrior' })).toThrow();
			expect(() => new Race({ ...raceData, classes: null })).toThrow();
			expect(() => new Race({ ...raceData, classes: undefined })).toThrow();
		});

		it('should throw when restrictions is not an array', () => {
			expect(() => new Race({ ...raceData, restrictions: { type: 'ability' } })).toThrow();
			expect(() => new Race({ ...raceData, restrictions: null })).toThrow();
			expect(() => new Race({ ...raceData, restrictions: undefined })).toThrow();
		});

		it('should throw when specialAbilities is not an array', () => {
			expect(() => new Race({ ...raceData, specialAbilities: { name: 'Darkvision' } })).toThrow();
			expect(() => new Race({ ...raceData, specialAbilities: null })).toThrow();
			expect(() => new Race({ ...raceData, specialAbilities: undefined })).toThrow();
		});

		it('should throw when savingThrows is not an array', () => {
			expect(() => new Race({ ...raceData, savingThrows: { attribute: 'wisdom', bonus: 2 } })).toThrow();
			expect(() => new Race({ ...raceData, savingThrows: null })).toThrow();
			expect(() => new Race({ ...raceData, savingThrows: undefined })).toThrow();
		});
	});

	describe('Properties - Read-only', () => {
		let race;

		beforeEach(() => {
			race = new Race(raceData);
		});

		it('should return id property', () => {
			expect(race.id).toBeDefined();
		});

		it('should return name property', () => {
			expect(race.name).toBe('Human');
		});

		it('should return description property', () => {
			expect(race.description).toBe('A versatile and adaptable race');
		});

		it('should return weight property', () => {
			expect(race.weight).toBe(180);
		});

		it('should return height property', () => {
			expect(race.height).toBe(70);
		});

		it('should return age property', () => {
			expect(race.age).toBe(100);
		});

		it('should return classes property', () => {
			expect(race.classes).toEqual(baseClasses);
		});

		it('should return restrictions property', () => {
			expect(race.restrictions).toEqual(baseRestrictions);
		});

		it('should return specialAbilities property', () => {
			expect(race.specialAbilities).toEqual(baseSpecialAbilities);
		});

		it('should return savingThrows property', () => {
			expect(race.savingThrows).toEqual(baseSavingThrows);
		});
	});

	describe('Properties - Prevent modification', () => {
		let race;

		beforeEach(() => {
			race = new Race(raceData);
		});

		it('should throw when trying to change id', () => {
			expect(() => {
				race.id = 'new-id';
			}).toThrow();
		});

		it('should throw when trying to change name', () => {
			expect(() => {
				race.name = 'Elf';
			}).toThrow();
		});

		it('should throw when trying to change description', () => {
			expect(() => {
				race.description = 'A new description';
			}).toThrow();
		});

		it('should throw when trying to change weight', () => {
			expect(() => {
				race.weight = 200;
			}).toThrow();
		});

		it('should throw when trying to change height', () => {
			expect(() => {
				race.height = 72;
			}).toThrow();
		});

		it('should throw when trying to change age', () => {
			expect(() => {
				race.age = 150;
			}).toThrow();
		});

		it('should throw when trying to change classes', () => {
			expect(() => {
				race.classes = ['Paladin'];
			}).toThrow();
		});

		it('should throw when trying to change restrictions', () => {
			expect(() => {
				race.restrictions = [{ restrictionType: Symbol.for('ability') }];
			}).toThrow();
		});

		it('should throw when trying to change specialAbilities', () => {
			expect(() => {
				race.specialAbilities = [{ name: 'Darkvision' }];
			}).toThrow();
		});

		it('should throw when trying to change savingThrows', () => {
			expect(() => {
				race.savingThrows = [{ attribute: Symbol.for('wisdom'), bonus: 2 }];
			}).toThrow();
		});
	});

	describe('Methods', () => {
		let race;

		beforeEach(() => {
			race = new Race(raceData);
		});

		it('should have a toObject method', () => {
			expect(typeof race.toObject).toBe('function');
		});

		it('toObject should return an object representation', () => {
			const obj = race.toObject();

			expect(obj).toBeDefined();
			expect(typeof obj).toBe('object');
		});

		it('toObject should include all properties', () => {
			const obj = race.toObject();
			const classes = baseClasses.map((entry) => entry.description);
			const restrictions = baseRestrictions.map((entry) => {
				return {
					restrictionType: entry.restrictionType,
					type: entry.type,
					min: entry.min,
					max: entry.max
				}
			});
			const specialAbilities = baseSpecialAbilities.map((entry) => entry.description);
			const savingThrows = baseSavingThrows.map((entry) => {
				return {
					attribute: entry.attribute.description,
					bonus: entry.bonus
				}
			});

			expect(obj.id).toBeDefined();
			expect(obj.name).toBe('Human');
			expect(obj.description).toBe('A versatile and adaptable race');
			expect(obj.weight).toBe(180);
			expect(obj.height).toBe(70);
			expect(obj.age).toBe(100);
			expect(obj.classes).toEqual(classes);
			expect(obj.restrictions).toEqual(restrictions);
			expect(obj.specialAbilities).toEqual(specialAbilities);
			expect(obj.savingThrows).toEqual(savingThrows);
		});
	});
});