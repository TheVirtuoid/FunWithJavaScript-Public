import { describe, it, expect, vi, afterEach } from 'vitest';
import Dice from './Dice.js';

describe('Dice', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------------------
  describe('Constructor', () => {
    it('creates an instance with no descriptor', () => {
      const dice = new Dice();
      expect(dice).toBeInstanceOf(Dice);
      expect(dice.descriptor).toBeNull();
    });

    it('creates an instance with a valid descriptor', () => {
      const dice = new Dice('3d6');
      expect(dice.descriptor).toBe('3d6');
    });

    it('throws on an invalid descriptor', () => {
      expect(() => new Dice('invalid')).toThrow();
    });

    it('throws when sides are omitted (1d)', () => {
      expect(() => new Dice('1d')).toThrow();
    });

    it('throws when sides equal 1 (1d1)', () => {
      expect(() => new Dice('1d1')).toThrow();
    });

    it('throws when sides are negative (1d-1)', () => {
      expect(() => new Dice('1d-1')).toThrow();
    });

    it('throws when sides are a decimal (1d1.5)', () => {
      expect(() => new Dice('1d1.5')).toThrow();
    });

    it('throws when count is a decimal (1.5d6)', () => {
      expect(() => new Dice('1.5d6')).toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------------
  describe('Public Properties', () => {
    it('descriptor returns null when no descriptor was provided to the constructor', () => {
      const dice = new Dice();
      expect(dice.descriptor).toBeNull();
    });

    it('descriptor returns the value passed to the constructor', () => {
      const dice = new Dice('2d8');
      expect(dice.descriptor).toBe('2d8');
    });

    it('descriptor is read-only', () => {
      const dice = new Dice('2d8');
      expect(() => { dice.descriptor = '1d6'; }).toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // Static Method: Roll
  // ---------------------------------------------------------------------------
  describe('Dice.Roll (static)', () => {
    it('returns an integer', () => {
      const result = Dice.Roll('1d6');
      expect(Number.isInteger(result)).toBe(true);
    });

    it('rolls a single die when count is 1 (1d6) — result in [1, 6]', () => {
      const result = Dice.Roll('1d6');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });

    it('rolls with implicit count of 1 (d6) — result in [1, 6]', () => {
      const result = Dice.Roll('d6');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });

    it('sums multiple dice (3d6) — result in [3, 18]', () => {
      const result = Dice.Roll('3d6');
      expect(result).toBeGreaterThanOrEqual(3);
      expect(result).toBeLessThanOrEqual(18);
    });

    it('handles large-sided dice (2d100) — result in [2, 200]', () => {
      const result = Dice.Roll('2d100');
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(200);
    });

    it('accepts an uppercase D (1D6)', () => {
      expect(() => Dice.Roll('1D6')).not.toThrow();
      const result = Dice.Roll('1D6');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });

    it('accepts an uppercase D with no count (D6)', () => {
      expect(() => Dice.Roll('D6')).not.toThrow();
      const result = Dice.Roll('D6');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });

    it('returns the minimum possible value when Math.random returns 0', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0);
      expect(Dice.Roll('3d6')).toBe(3);
    });

    it('returns the value of 4 when Math.random is .54', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.54);
      expect(Dice.Roll('3d6')).toBe(12);
    });

    it('returns the maximum possible value when Math.random approaches 1', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.9999999);
      expect(Dice.Roll('3d6')).toBe(18);
    });

    it('throws on an invalid descriptor', () => {
      expect(() => Dice.Roll('invalid')).toThrow();
    });

    it('throws when sides are omitted (1d)', () => {
      expect(() => Dice.Roll('1d')).toThrow();
    });

    it('throws when sides equal 1 (1d1)', () => {
      expect(() => Dice.Roll('1d1')).toThrow();
    });

    it('throws when sides are negative (1d-1)', () => {
      expect(() => Dice.Roll('1d-1')).toThrow();
    });

    it('throws when sides are a decimal (1d1.5)', () => {
      expect(() => Dice.Roll('1d1.5')).toThrow();
    });

    it('throws when count is a decimal (1.5d6)', () => {
      expect(() => Dice.Roll('1.5d6')).toThrow();
    });

    it('throws when descriptor is an empty string', () => {
      expect(() => Dice.Roll('')).toThrow();
    });

    it('throws when descriptor is null', () => {
      expect(() => Dice.Roll(null)).toThrow();
    });

  });

  // ---------------------------------------------------------------------------
  // Instance Method: roll
  // ---------------------------------------------------------------------------
  describe('roll (instance method)', () => {
    it('uses the instance descriptor when no argument is given', () => {
      const dice = new Dice('1d6');
      const result = dice.roll();
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });

    it('uses a provided descriptor, overriding the instance descriptor', () => {
      const dice = new Dice('1d6');
      const result = dice.roll('2d10');
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(20);
    });

    it('uses a provided descriptor when the instance has no descriptor', () => {
      const dice = new Dice();
      const result = dice.roll('1d10');
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('throws when neither an instance descriptor nor an argument descriptor is available', () => {
      const dice = new Dice();
      expect(() => dice.roll()).toThrow();
    });

    it('throws when the provided descriptor is invalid', () => {
      const dice = new Dice('1d6');
      expect(() => dice.roll('invalid')).toThrow();
    });

    it('returns the minimum possible value when Math.random returns 0', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0);
      const dice = new Dice('3d6');
      expect(dice.roll()).toBe(3);
    });

    it('returns the maximum possible value when Math.random approaches 1', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.9999999);
      const dice = new Dice('3d6');
      expect(dice.roll()).toBe(18);
    });

    it('is identical to Dice.Roll when given a descriptor', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const dice = new Dice();
      expect(dice.roll('3d6')).toBe(Dice.Roll('3d6'));
    });
  });

  // ---------------------------------------------------------------------------
  // Descriptor Format — comprehensive valid/invalid table
  // ---------------------------------------------------------------------------
  describe('Descriptor format', () => {
    describe('valid descriptors', () => {
      it.each([
        ['1d6'],
        ['2d8'],
        ['3d100'],
        ['d6'],
        ['1D6'],
        ['D6'],
        ['1d2'],                               // minimum valid sides
        [`1d${Number.MAX_SAFE_INTEGER}`],      // maximum valid sides
      ])('%s does not throw', (descriptor) => {
        expect(() => Dice.Roll(descriptor)).not.toThrow();
      });
    });

    describe('invalid descriptors', () => {
      it.each([
        ['1d'],         // missing sides
        ['-1d6'],       // negative number of sides
        ['1d1'],        // sides < 2
        ['1d-1'],       // negative sides
        ['1d1.5'],      // decimal sides
        ['1.5d6'],      // decimal count
        [''],           // empty string
        ['abc'],        // no d-separator
        ['d'],          // only separator
        ['0d6'],        // zero sides
      ])('%s throws', (descriptor) => {
        expect(() => Dice.Roll(descriptor)).toThrow();
      });
    });
  });
});
