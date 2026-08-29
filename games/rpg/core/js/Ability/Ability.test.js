import { describe, it, expect } from 'vitest';
import Ability from './Ability.js';
import {readFileSync} from "fs";
import config from './../../../config.json' with { type: 'json' };

const abilityDatabase = readFileSync('./databases/jsonl/abilities.jsonl', 'utf-8');
const abilityData = JSON.parse(`[${abilityDatabase.split(config.database.delimiter).join(',')}]`);

const VALID_ID = abilityData[0]['id'];
const VALID_TYPE = abilityData[0]['type'];
const VALID_VALUE = 10;

describe('Ability', () => {

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with type, value, and bonus', () => {
				const ability = new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: 2 });
				expect(ability).toBeInstanceOf(Ability);
			});

			it('constructs with type and value only (bonus defaults to 0)', () => {
				const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
				expect(ability).toBeInstanceOf(Ability);
			});
		});

		describe('type argument', () => {
			it('throws when id is missing', () => {
				expect(() => new Ability({ value: VALID_VALUE })).toThrow();
			});

			it('throws when id is not a valid id', () => {
				expect(() => new Ability({ id: 'bad', value: VALID_VALUE })).toThrow();
			});

			it('throws when id is not a string', () => {
				expect(() => new Ability({ id: 1234, value: VALID_VALUE })).toThrow();
			});

		});

		describe('value argument', () => {
			it('throws when value is missing', () => {
				expect(() => new Ability({ id: VALID_ID })).toThrow();
			});

			it('throws when value is a float', () => {
				expect(() => new Ability({ id: VALID_ID, value: 1.5 })).toThrow();
			});

			it('throws when value is a string', () => {
				expect(() => new Ability({ id: VALID_ID, value: '10' })).toThrow();
			});

			it('throws when value is null', () => {
				expect(() => new Ability({ id: VALID_ID, value: null })).toThrow();
			});
		});

		describe('bonus argument', () => {
			it('throws when bonus is a float', () => {
				expect(() => new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: 1.5 })).toThrow();
			});

			it('throws when bonus is a string', () => {
				expect(() => new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: '2' })).toThrow();
			});

			it('throws when bonus is null', () => {
				expect(() => new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: null })).toThrow();
			});
		});
	});

	// ─── Properties ────────────────────────────────────────────────────────────

	describe('properties', () => {
		it('id returns the string passed to the constructor', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(ability.id).toBe(VALID_ID);
		});

		it('value returns the integer passed to the constructor', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(ability.value).toBe(VALID_VALUE);
		});

		it('bonus returns the integer passed to the constructor', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: 3 });
			expect(ability.bonus).toBe(3);
		});

		it('bonus defaults to 0 when not provided', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(ability.bonus).toBe(0);
		});

		describe('read-only', () => {
			it('id cannot be reassigned', () => {
				const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { ability.id = 'another string'; }).toThrow();
			});

			it('value cannot be reassigned', () => {
				const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
				expect(() => { ability.value = 99; }).toThrow();
			});

			it('bonus cannot be reassigned', () => {
				const ability = new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: 2 });
				expect(() => { ability.bonus = 99; }).toThrow();
			});
		});
	});

	// ─── setValue() ────────────────────────────────────────────────────────────

	describe('setValue()', () => {
		it('updates the value property', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			ability.setValue(20);
			expect(ability.value).toBe(20);
		});

		it('accepts negative integers', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			ability.setValue(-5);
			expect(ability.value).toBe(-5);
		});

		it('accepts zero', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			ability.setValue(0);
			expect(ability.value).toBe(0);
		});

		it('throws when given a float', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setValue(1.5)).toThrow();
		});

		it('throws when given a string', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setValue('10')).toThrow();
		});

		it('throws when given null', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setValue(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setValue(undefined)).toThrow();
		});

		it('does not affect id or bonus', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: 3 });
			ability.setValue(20);
			expect(ability.id).toBe(VALID_ID);
			expect(ability.bonus).toBe(3);
		});
	});

	// ─── setBonus() ────────────────────────────────────────────────────────────

	describe('setBonus()', () => {
		it('updates the bonus property', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			ability.setBonus(5);
			expect(ability.bonus).toBe(5);
		});

		it('accepts negative integers', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			ability.setBonus(-3);
			expect(ability.bonus).toBe(-3);
		});

		it('accepts zero', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			ability.setBonus(0);
			expect(ability.bonus).toBe(0);
		});

		it('throws when given a float', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setBonus(1.5)).toThrow();
		});

		it('throws when given a string', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setBonus('2')).toThrow();
		});

		it('throws when given null', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setBonus(null)).toThrow();
		});

		it('throws when given undefined', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE });
			expect(() => ability.setBonus(undefined)).toThrow();
		});

		it('does not affect id or value', () => {
			const ability = new Ability({ id: VALID_ID, value: VALID_VALUE, bonus: 1 });
			ability.setBonus(5);
			expect(ability.id).toBe(VALID_ID);
			expect(ability.value).toBe(VALID_VALUE);
		});
	});

	// ─── Static Public Methods ─────────────────────────────────────────────────

	describe('IsAbility()', () => {
		it('returns true for a valid id', () => {
			expect(Ability.IsAbility(VALID_ID)).toBe(true);
		});

		it('returns false for invalid ability objects', () => {
			expect(Ability.IsAbility(Symbol('bad'))).toBe(false);
			expect(Ability.IsAbility(null)).toBe(false);
			expect(Ability.IsAbility(undefined)).toBe(false);
			expect(Ability.IsAbility('ability')).toBe(false);
		});
	});

	describe('GetAbility', () => {
		it('should return the correct data', () => {
			const ability = Ability.GetAbility(VALID_ID);
			expect(ability.id).toEqual(VALID_ID);
		});

		it('should return undefined for an invalid ability', () => {
			expect(Ability.GetAbility(Symbol('bad'))).toBeUndefined();
			expect(Ability.GetAbility(null)).toBeUndefined();
			expect(Ability.GetAbility(undefined)).toBeUndefined();
			expect(Ability.GetAbility('ability')).toBeUndefined();
		});
	});

	describe('GetAbilityByName', () => {
		it('should return the correct data', () => {
			const ability = Ability.GetAbilityByType(VALID_TYPE);
			expect(ability.type).toEqual(VALID_TYPE);
		});

		it('should return undefined for an invalid ability', () => {
			expect(Ability.GetAbilityByType(Symbol('bad'))).toBeUndefined();
			expect(Ability.GetAbilityByType(null)).toBeUndefined();
			expect(Ability.GetAbilityByType(undefined)).toBeUndefined();
			expect(Ability.GetAbilityByType('ability')).toBeUndefined();
		});

	});
});
