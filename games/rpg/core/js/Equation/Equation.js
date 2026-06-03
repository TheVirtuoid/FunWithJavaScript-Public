import Dice from "../Dice/Dice.js";

export default class Equation {

	static Solve(equation) {
		if (typeof equation !== 'string') {
			throw new Error('Invalid equation. Expected a string.');
		}
		const tokens = Equation.#tokenize(equation);
		if (equation === '2d+1') {
			console.log(tokens);
		}
		return Equation.#parseTokens(tokens);
	}

	static #OPERATOR = Symbol('operator');
	static #NUMBER = Symbol('number');
	static #GROUPING = Symbol('grouping');
	static #DICE = Symbol('dice');

	/*static #tokenize(equation) {
		const tokens = [];
		let characters = [...equation.trim()];
		while (characters.length) {
			const { newCharacters, token } = Equation.#tokenNext(characters);
			characters = [...newCharacters];
			if (token) {
				tokens.push(token);
			}
		}
		return tokens;
	}*/

	static #parseTokens(tokens) {
		let operators = [];
		let operands = [];
		// console.log(tokens);
		tokens.forEach((token) => {
			const { type, value } = token;
			if (type === Equation.#OPERATOR) {
				const { operator, precedence } = value;
				if (operands.length === 0) {
					if (operator !== '-' && operator !== '+' && operator !== '(') {
						throw new Error('Invalid operator at beginning of the equation. Expected a negative or positive sign.');
					}
					if (operator === '-') {
						operands.push(-1);
						operators.push({ operator: '*', precedence: 2 });
					} else if (operator === '+') {
						// why are we doing this? To catch equations like "++1" or "-+1". I consider those invalid
						operands.push(1);
						operators.push({ operator: '*', precedence: 2 });
					} else if (operator === '(') {
						operators.push(value);
					}
				} else {
					if (operator !== '(') {
						({ operands, operators } = Equation.#reduceTokenStack({ operands, operators }, precedence));
					}
					if (operator !== ')') {
						operators.push(value);
					}
				}
			} else if (type === Equation.#NUMBER) {
				operands.push(value);
			} else if (type === Equation.#DICE) {
				const diceValue = Dice.Roll(value);
				operands.push(diceValue);
			}
		});
		({ operands, operators } = Equation.#reduceTokenStack({ operands, operators }));
		if (operators.length > 1) {
			throw new Error('Invalid equation. Extra operators found.');
		}
		if (operands.length !== 1) {
			throw new Error('Invalid equation. Extraneous operands.');
		}
		return operands[0];
	}

	static #reduceTokenStack({ operands: stackOperands, operators: stackOperators }, precedence = 0) {
		const operands = structuredClone(stackOperands);
		const operators = structuredClone(stackOperators);
		while (operators.length && operators[operators.length - 1].precedence >= precedence) {
			if (precedence === -1 && operators[operators.length - 1].precedence === 0) {
				operators.pop();
				precedence = Number.POSITIVE_INFINITY;
			} else {
				if (operands.length < 2) {
					throw new Error('Not enough operands to perform the operation.');
				}
				const { operator: stackOperator } = operators.pop();
				const operand2 = operands.pop();
				const operand1 = operands.pop();
				if (stackOperator === '+') {
					operands.push(operand1 + operand2);
				} else if (stackOperator === '-') {
					operands.push(operand1 - operand2);
				} else if (stackOperator === '*') {
					operands.push(operand1 * operand2);
				} else if (stackOperator === '/') {
					if (operand2 === 0) {
						throw new Error('Division by zero.');
					}
					operands.push(operand1 / operand2);
				} else if (stackOperator === '^') {
					operands.push(Math.pow(operand1, operand2));
				}
			}
		}
		if (precedence === -1 && operands.length <= 1) {
			throw new Error('Invalid equation. Extraneous closing parenthesis found.');
		}
		return { operands, operators };
	}

	/*static #tokenNext(incomingCharacters) {
		const legalOperators = [
			{ operator: '(', precedence: 0 },
			{ operator: ')', precedence: -1 },
			{ operator: '+', precedence: 1 },
			{ operator: '-', precedence: 1 },
			{ operator: '*', precedence: 2 },
			{ operator: '/', precedence: 2 },
			{ operator: '^', precedence: 3 },
		];
		const legalNumbers = [..."0123456789."]
		const legalGroupings = [...'()'];
		const characters = [...incomingCharacters];
		let data = ' ';
		// removes whitespace
		while (data === ' ') {
			data = characters.shift();
		}
		if (!data) {
			return { newCharacters: [], token: null };
		}
		const operatorIndex = legalOperators.findIndex(operatorData => operatorData.operator === data);
		if (operatorIndex !== -1) {
			return { newCharacters: characters, token: { type: Equation.#OPERATOR, value: legalOperators[operatorIndex] } };
		}
		if (legalGroupings.includes(data)) {
			return { newCharacters: characters, token: { type: Equation.#GROUPING, value: data } };
		}
		if (legalNumbers.includes(data)) {
			// parse until you get to an operator or legal grouping
			let number = data;
			data = characters.shift();
			while (legalNumbers.includes(data)) {
				number = `${number}${data}`;
				data = characters.shift();
			}
			if (number.split('.').length > 2) {
				throw new Error('Invalid number. Extraneous decimals found.');
			}
			const token = parseFloat(number);
			if (data) {
				characters.unshift(data);
			}
			return { newCharacters: characters, token: { type: Equation.#NUMBER, value: token } };
		}
		return { newCharacters: characters, token: null };
	}*/

	constructor() {
		throw new Error('Cannot instantiate an Equation object. Only the static method "Solve()" is available.');
	}

	static #tokenize(equation) {
		const tokens = [];
		const tokenPattern = /(\d+d\d+|d\d+|\d+\.\d+|\d+|[-+*/^()])/gi;
		let match;
		let lastIndex = 0;

		while ((match = tokenPattern.exec(equation)) !== null) {
			// Check if there are unmatched characters (like a lone 'd')
			if (match.index > lastIndex) {
				const unmatched = equation.substring(lastIndex, match.index).trim();
				if (unmatched) {
					throw new Error(`Invalid token: "${unmatched}". Did you mean a dice expression like "2d6" or "d6"?`);
				}
			}

			const token = match[1];
			tokens.push(Equation.#classifyToken(token));
			lastIndex = tokenPattern.lastIndex;
		}

		// Check for unmatched characters at the end
		if (lastIndex < equation.trim().length) {
			const unmatched = equation.substring(lastIndex).trim();
			if (unmatched) {
				throw new Error(`Invalid token: "${unmatched}". Did you mean a dice expression like "2d6" or "d6"?`);
			}
		}

		return tokens;
	}

	static #classifyToken(token) {
		if (/^\d+d\d+$|^d\d+$/i.test(token)) {
			const [count, sides] = token.toLowerCase().split('d');
			return {
				type: Equation.#DICE,
				value: { count: count ? parseInt(count) : 1, sides: parseInt(sides) }
			};
		} else if (/^[-+*/^()]$/.test(token)) {
			const operators = {
				'(': { operator: '(', precedence: 0 },
				')': { operator: ')', precedence: -1 },
				'+': { operator: '+', precedence: 1 },
				'-': { operator: '-', precedence: 1 },
				'*': { operator: '*', precedence: 2 },
				'/': { operator: '/', precedence: 2 },
				'^': { operator: '^', precedence: 3 },
			};
			return { type: Equation.#OPERATOR, value: operators[token] };
		} else {
			return { type: Equation.#NUMBER, value: parseFloat(token) };
		}
	}
}
