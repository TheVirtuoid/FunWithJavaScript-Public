import { describe, it, expect } from 'vitest';
import Restriction from './Restriction.js';
import {readFileSync} from "fs";
import config from './../../../config.json' with { type: 'json' };

const restrictionDatabase = readFileSync('./databases/jsonl/restrictions.jsonl', 'utf-8');
const restrictionData = JSON.parse(`[${restrictionDatabase.split(config.database.delimiter).join(',')}]`);

const abilityDatabase = readFileSync('./databases/jsonl/abilities.jsonl', 'utf-8');
const abilityData = JSON.parse(`[${abilityDatabase.split(config.database.delimiter).join(',')}]`);

const armorDatabase = readFileSync('./databases/jsonl/armor.jsonl', 'utf-8');
const armorData = JSON.parse(`[${armorDatabase.split(config.database.delimiter).join(',')}]`);

const weaponDatabase = readFileSync('./databases/jsonl/weapon.jsonl', 'utf-8');
const weaponData = JSON.parse(`[${weaponDatabase.split(config.database.delimiter).join(',')}]`);

const RESTRICTION_ABILITY_ID = restrictionData.find(restriction => restriction.type === 'ability').id;
const RESTRICTION_ARMOR_TYPE_ID = restrictionData.find(restriction => restriction.type === 'armor-type').id;
const RESTRICTION_WEAPON_TYPE_ID = restrictionData.find(restriction => restriction.type === 'weapon-type').id;
const RESTRICTION_WEAPON_SHARP_ID = restrictionData.find(restriction => restriction.type === 'weapon-sharp').id;
const RESTRICTION_WEAPON_SIZE_ID = restrictionData.find(restriction => restriction.type === 'weapon-size').id;
const RESTRICTION_HIT_POINTS_ID = restrictionData.find(restriction => restriction.type === 'hit-points').id;


const ARMOR_TYPE_NONE_ID = armorData.find(armor => armor.type === 'none').id;
const ARMOR_TYPE_LEATHER_ID = armorData.find(armor => armor.type === 'leather').id;
const ARMOR_TYPE_CHAIN_MAIL_ID = armorData.find(armor => armor.type === 'chain-mail').id;

const WEAPON_TYPE_HAND_AXE_ID = weaponData.find(weapon => weapon.type === 'hand-axe').id;
const WEAPON_TYPE_BATTLE_AXE_ID = weaponData.find(weapon => weapon.type === 'battle-axe').id;

const WEAPON_SHARP_WARHAMMER_ID = weaponData.find(weapon => weapon.type === 'warhammer').id;
const WEAPON_SHARP_BATTLE_AXE_ID = weaponData.find(weapon => weapon.type === 'battle-axe').id;

const WEAPON_SIZE_HAND_AXE_ID = weaponData.find(weapon => weapon.type === 'hand-axe').id;
const WEAPON_SIZE_BATTLE_AXE_ID = weaponData.find(weapon => weapon.type === 'battle-axe').id;
const WEAPON_SIZE_SHORTBOW_ARROW_ID = weaponData.find(weapon => weapon.type === 'shortbow-arrow').id;

const HIT_POINTS_DICE_EXPRESSION_ONE = '1d6';
const HIT_POINTS_DICE_EXPRESSION_TWO = '1d8';

describe('Restriction', () => {
	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {
		it('should throw an error when attempting to instantiate (static class)', () => {
			expect(() => new Restriction()).toThrow();
		});
	});

	// ─── static methods ────────────────────────────────────────────────────────

	describe('isRestricted()', () => {
		it('should be a static method', () => {
			expect(typeof Restriction.IsRestricted).toBe('function');
		});

		it('should throw if restrictionType is invalid', () => {
			expect(() => Restriction.IsRestricted({
				type: 'INVALID_TYPE',
			})).toThrow();
		});

		describe('restriction types', () => {


			describe('hit-points', () => {
				it('should throw if value is not a string', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_HIT_POINTS_ID,
						diceExpression: HIT_POINTS_DICE_EXPRESSION_ONE
					})).toThrow();
				});

				it('should throw if value is not a valid diceExpression', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_HIT_POINTS_ID,
						value: 'bad',
						diceExpression: HIT_POINTS_DICE_EXPRESSION_TWO
					})).toThrow();
				});

				it('should throw is diceExpression is not a string', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_HIT_POINTS_ID,
						value: HIT_POINTS_DICE_EXPRESSION_ONE
					})).toThrow();
				});

				it('should return true if the diceExpressions do not match', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_HIT_POINTS_ID,
						value: HIT_POINTS_DICE_EXPRESSION_ONE,
						diceExpression: HIT_POINTS_DICE_EXPRESSION_TWO
					})).toBe(true);
				});

				it('should return false if the diceExpressions match', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_HIT_POINTS_ID,
						value: HIT_POINTS_DICE_EXPRESSION_ONE,
						diceExpression: HIT_POINTS_DICE_EXPRESSION_ONE
					})).toBe(false);
				});
			});

			describe('weapon-size', () => {
				it('should throw if value is not an array', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SIZE_ID,
						weaponType: WEAPON_SIZE_BATTLE_AXE_ID
					})).toThrow();
				});

				it('should throw if any part of value is not a valid weapon type', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SIZE_ID,
						value: ['bad'],
						weaponType: WEAPON_SIZE_BATTLE_AXE_ID
					})).toThrow();
				});

				it('should throw is weaponType is undefined', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SIZE_ID,
						value: [WEAPON_SIZE_HAND_AXE_ID]
					})).toThrow();
				});

				it('should return false if weaponType is part of value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SIZE_ID,
						value: [WEAPON_SIZE_HAND_AXE_ID],
						weaponType: WEAPON_SIZE_HAND_AXE_ID
					})).toBe(false);
				});

				it('should return true if weaponType is not part of value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SIZE_ID,
						value: [WEAPON_SIZE_HAND_AXE_ID],
						weaponType: WEAPON_SIZE_BATTLE_AXE_ID
					})).toBe(true);
				});

				it('should return false if weaponType does not have size defined', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SIZE_ID,
						value: [WEAPON_SIZE_HAND_AXE_ID],
						weaponType: WEAPON_SIZE_SHORTBOW_ARROW_ID
					})).toBe(false);
				});
			});

			describe('weapon-sharp', () => {
				it('should throw if value is not a boolean', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SHARP_ID,
						value: 'bad',
						weaponType: WEAPON_SHARP_WARHAMMER_ID
					})).toThrow();
				});

				it('should throw is weaponType is undefined', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SHARP_ID,
						value: false
					})).toThrow();
				});

				it('should throw is weaponType cannot be found', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SHARP_ID,
						weaponType: 'bad',
						value: false
					})).toThrow();
				});
				it('should return false if value is false and the weaponType is not sharp', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SHARP_ID,
						value: false,
						weaponType: WEAPON_SHARP_WARHAMMER_ID
					})).toBe(false);
				});

				it('should return true if value is false and the weaponType is sharp', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SHARP_ID,
						value: false,
						weaponType: WEAPON_SHARP_BATTLE_AXE_ID
					})).toBe(true);
				});


				it('should return false if value is true (all weapons are legal)', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_SHARP_ID,
						value: true,
						weaponType: WEAPON_SHARP_BATTLE_AXE_ID
					})).toBe(false);
				});
			});


			describe('weapon-type', () => {
				it('should throw if value is not an array', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_TYPE_ID,
						weaponType: WEAPON_TYPE_BATTLE_AXE_ID
					})).toThrow();
				});

				it('should throw if any part of value is not a valid weapon type', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_TYPE_ID,
						value: ['bad'],
						weaponType: WEAPON_TYPE_BATTLE_AXE_ID
					})).toThrow();
				});

				it('should throw is weaponType is undefined', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_TYPE_ID,
						value: [WEAPON_TYPE_HAND_AXE_ID]
					})).toThrow();
				});

				it('should return false if weaponType is part of value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_TYPE_ID,
						value: [WEAPON_TYPE_HAND_AXE_ID],
						weaponType: WEAPON_TYPE_HAND_AXE_ID
					})).toBe(false);
				});

				it('should return true if weaponType is not part of value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_WEAPON_TYPE_ID,
						value: [WEAPON_TYPE_HAND_AXE_ID],
						weaponType: WEAPON_TYPE_BATTLE_AXE_ID
					})).toBe(true);
				});
			});

			describe('armor-type', () => {
				it('should throw if value is not an array', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_ARMOR_TYPE_ID,
						armorType: ARMOR_TYPE_CHAIN_MAIL_ID
					})).toThrow();
				});

				it('should throw if any part of value is not a valid armor type', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_ARMOR_TYPE_ID,
						value: ['bad'],
						armorType: ARMOR_TYPE_CHAIN_MAIL_ID
					})).toThrow();
				});

				it('should throw is armorType is undefined', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_ARMOR_TYPE_ID,
						value: [ARMOR_TYPE_LEATHER_ID]
					})).toThrow();
				});

				it('should return false if armorType is part of value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ARMOR_TYPE_ID,
						value: [ARMOR_TYPE_LEATHER_ID],
						armorType: ARMOR_TYPE_LEATHER_ID
					})).toBe(false);
				});

				it('should return true if armorType is not part of value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ARMOR_TYPE_ID,
						value: [ARMOR_TYPE_LEATHER_ID],
						armorType: ARMOR_TYPE_CHAIN_MAIL_ID
					})).toBe(true);
				});

				it('should return false if armorType is "none" no matter what is in value', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ARMOR_TYPE_ID,
						value: [ARMOR_TYPE_LEATHER_ID],
						armorType: ARMOR_TYPE_NONE_ID
					})).toBe(false);
				});
			});

			describe('ability', () => {
				it('should throw if value property is missing', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						min: 0
					})).toThrow();
				});

				it('should throw if value is not a number', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 'INVALID_ABILITY_ID',
						min: 0
					})).toThrow();
				});

				it('should throw if min AND max properties are missing', () => {
					expect(() => Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 8
					})).toThrow();
				});

				it('should return true if value is lower than min', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 8,
						min: 9
					})).toBe(true);
				});

				it('should return false if value is higher than min (and no max specified)', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 10,
						min: 9
					})).toBe(false);
				});

				it('should return true if value is higher than max', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 10,
						max: 9
					})).toBe(true);
				});

				it('should return false if value is lower than max (and no min specified)', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 8,
						max: 9
					})).toBe(false);
				});

				it('should return false if value is between min and max (if both specified)', () => {
					expect(Restriction.IsRestricted({
						type: RESTRICTION_ABILITY_ID,
						value: 9,
						min: 8,
						max: 10
					})).toBe(false);
				});
			});
		});
	});
});

/*
[
  { "type": "ability", "name": "ability" },
  { "type": "armor-type", "name": "armor-type" },
  { "type": "weapon-type", "name": "weapon-type" },
  { "type": "weapon-sharp", "name": "weapon-sharp" },
  { "type": "weapon-size", "name": "weapon-size" },
  { "type": "hit-points", "name": "hit-points" }
]
 */