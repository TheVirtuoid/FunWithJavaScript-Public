import { describe, it, expect, beforeEach } from 'vitest';
import Equipment from './Equipment';
import Item from "../Item/Item.js";

describe('Equipment', () => {
	describe('constructor', () => {
		it('should create an Equipment instance with correct properties (test inheritance)', () => {
			const equipment = new Equipment({ name: 'Test Equipment'  });
			expect(equipment.name).toBe('Test Equipment');
			expect(equipment instanceof Equipment).toBe(true);
			expect(equipment instanceof Item).toBe(true);
		});
	});
})
