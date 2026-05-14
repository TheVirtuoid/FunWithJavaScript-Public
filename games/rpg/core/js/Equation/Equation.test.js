import { describe, it, expect, vi } from 'vitest';
import Equation from "./Equation.js";
import Dice from "../Dice/Dice.js";

describe('Equation', () => {

	// ---------------------------------------------------------------------------
	// Constructor
	// ---------------------------------------------------------------------------
	describe('Constructor', () => {
		it('throws error if attempting to instantiate', () => {
			expect(() => new Equation()).toThrow();
		});
	});

	// ---------------------------------------------------------------------------
	// Static Methods
	// ---------------------------------------------------------------------------
	describe('Static Methods', () => {
		describe('Solve', () => {
			it('should solve the simple equation', () => {
				const value = Equation.Solve('1.2+3.4');
				expect(value).toEqual(4.6);
			});
		});

		describe.skip('Valid simple equations', () => {
			it('should solve addition', () => {
				expect(Equation.Solve('1+1')).toEqual(2);
			});
			it('should solve subtraction', () => {
				expect(Equation.Solve('1-1')).toEqual(0);
			});
			it('should solve multiplication', () => {
				expect(Equation.Solve('2*2')).toEqual(4);
			});
			it('should solve division', () => {
				expect(Equation.Solve('4/2')).toEqual(2);
			});
			it('should solve exponentiation', () => {
				expect(Equation.Solve('2^4')).toEqual(16);
			});
			it('should solve for parenthesis', () => {
				expect(Equation.Solve('3*(1+2)')).toEqual(9);
			});
			it('should solve for parenthesis with implied multiplication', () => {
				expect(Equation.Solve('3(1+2)')).toEqual(9);
			});
		});

		describe.skip('Valid complex equations', () => {
			it('should solve for a more complicated example', () => {
				vi.spyOn(Dice, 'Roll').mockReturnValue(7);
				expect(Equation.Solve('3+(6*(4-3)*2d6/6)')).toEqual(10);
			});

			it('should solve with a leading plus', () => {
				expect(Equation.Solve('+3+1')).toEqual(4);
			});

			it('should solve with a leading minus', () => {
				expect(Equation.Solve('-3+1')).toEqual(-2);
			});

			it('should solve for a die roll', () => {
				vi.spyOn(Dice, 'Roll').mockReturnValue(7);
				expect(Equation.Solve('2d6+1')).toEqual(8);
			});

			it('should solve for a die roll with implied multiplication', () => {
				vi.spyOn(Dice, 'Roll').mockReturnValue(7);
				expect(Equation.Solve('3(2d6+1)')).toEqual(24);
			});

			it('should solve for a leading die roll with a plus', () => {
				vi.spyOn(Dice, 'Roll').mockReturnValue(7);
				expect(Equation.Solve('+2d6')).toEqual(7);
			});

			it('should solve with decimals', () => {
				expect(Equation.Solve('1.5 * 2')).toEqual(3);
			});

			it('should solve with spaces', () => {
				expect(Equation.Solve(' 1 + 2 ')).toEqual(3);
			});

			it('should solve with multiple die rolls', () => {
				const rollSpy = vi.spyOn(Dice, 'Roll');
				rollSpy.mockReturnValueOnce(7).mockReturnValueOnce(3);
				expect(Equation.Solve('2d6 + 1d4')).toEqual(10);
			});

			it('should solve with nested parentheses', () => {
				expect(Equation.Solve('((1+1)*2)')).toEqual(4);
			});

			it('should solve with multiple implied multiplications', () => {
				expect(Equation.Solve('(1+2)(3+4)')).toEqual(21);
			});

			it('should respect order of operations (PEMDAS)', () => {
				expect(Equation.Solve('1 + 2 * 3')).toEqual(7);
				expect(Equation.Solve('10 / (2 + 3)')).toEqual(2);
				expect(Equation.Solve('2 + 3 ^ 2')).toEqual(11);
			});
		});

		describe.skip('Invalid equations', () => {
			it('should throw if argument is not a string', () => {
				expect(() => Equation.Solve(123)).toThrow();
			});
			it('should throw if argument is an empty string', () => {
				expect(() => Equation.Solve('')).toThrow();
			});
			it('should throw on multiply up front', () => {
				expect(() => Equation.Solve('*4+1')).toThrow();
			});
			it('should throw on divide up front', () => {
				expect(() => Equation.Solve('/4+1')).toThrow();
			});
			it('should throw on exponentiation up front', () => {
				expect(() => Equation.Solve('^4+1')).toThrow();
			});
			it('should throw on too many starting parenthesis', () => {
				expect(() => Equation.Solve('4(3+1')).toThrow();
			});
			it('should throw on too many ending parenthesis', () => {
				expect(() => Equation.Solve('4+1)')).toThrow();
			});
			it('should throw if addition on the end', () => {
				expect(() => Equation.Solve('4+1+')).toThrow();
			});
			it('should throw if subtraction on the end', () => {
				expect(() => Equation.Solve('4+1-')).toThrow();
			});
			it('should throw if multiplication on the end', () => {
				expect(() => Equation.Solve('4+1*')).toThrow();
			});
			it('should throw if division on the end', () => {
				expect(() => Equation.Solve('4+1/')).toThrow();
			});
			it('should throw if exponentiation on the end', () => {
				expect(() => Equation.Solve('4+1^')).toThrow();
			});
			it('should throw if trying for a negative die roll', () => {
				expect(() => Equation.Solve('-2d6')).toThrow();
			});
			it('should throw if the die roll is missing arguments', () => {
				expect(() => Equation.Solve('2d+1')).toThrow();
			});
			it('should throw if the operand is not numeric', () => {
				expect(() => Equation.Solve('2+bad')).toThrow();
			});
			it('should throw on an invalid operator', () => {
				expect(() => Equation.Solve('2#3')).toThrow();
			});

			it('should throw on division by zero', () => {
				expect(() => Equation.Solve('10 / 0')).toThrow();
			});

			it('should throw on malformed decimals', () => {
				expect(() => Equation.Solve('1..2')).toThrow();
			});

			it('should throw on spaces inside a die roll descriptor', () => {
				expect(() => Equation.Solve('2 d 6')).toThrow();
			});

			it('should throw on empty parentheses', () => {
				expect(() => Equation.Solve('()')).toThrow();
				expect(() => Equation.Solve('( )')).toThrow();
			});

			it('should throw if it starts with multiple operators', () => {
				expect(() => Equation.Solve('++1')).toThrow();
				expect(() => Equation.Solve('--1')).toThrow();
			});
		});
	});
});
