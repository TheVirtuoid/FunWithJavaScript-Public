export default class Equation {

	static Solve(equation) {
		let characters = [...equation];
		let operands = [];
		let operators = [];
		let inError = false;
		let operandPushed = false;
		console.log(Equation.#tokenize(equation));
		while (!inError && characters.length) {
			({ inError, operands, operators, characters, operandPushed } = Equation.#next({ operands, operators, characters }));
			({ inError, operands, operators } = Equation.#collapseStacks({ operands, operators, operandPushed, endOfEquation: characters.length === 0 }));
		}
		return operands[0];
	}

	static #tokenize(equation) {
		const tokens = [];
		let characters = [...equation];
		while (characters.length) {
			const { newCharacters, token } = Equation.#tokenNext(characters);
			characters = [...newCharacters];
			if (token) {
				tokens.push(token);
			}
		}
		return tokens;
	}

	static #tokenNext(incomingCharacters) {
		const legalOperators = [...'+-*/^'];
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
		if (legalOperators.includes(data) || legalGroupings.includes(data)) {
			return { newCharacters: characters, token: data };
		}
		if (legalNumbers.includes(data)) {
			// parse until you get to an operator or legal grouping
			let number = data;
			data = characters.shift();
			while (legalNumbers.includes(data)) {
				number = `${number}${data}`;
				data = characters.shift();
			}
			const token = parseFloat(number);
			if (data) {
				characters.unshift(data);
			}
			return { newCharacters: characters, token };
		}
		return { newCharacters: characters, token: null };
	}


	static #next({ characters, operands, operators }) {
		const legalOperators = [...'+-*/^'];
		const legalNumbers = [..."0123456789."]
		const legalGroupings = [...'()'];
		let data = ' ';
		// removes whitespace
		while (data === ' ') {
			data = characters.shift();
		}
		if (!data) {
			return { inError: false, characters, operands, operators, operandPushed: false };
		}
		if (legalOperators.includes(data)) {
			operators.push(data);
			return { inError: false, operands, operators, characters, operandPushed: false };
		}
		if (legalGroupings.includes(data)) {

		}
		if (legalNumbers.includes(data)) {
			// parse until you get to an operator or legal grouping
			let number = data;
			data = characters.shift();
			while (legalNumbers.includes(data)) {
				number = `${number}${data}`;
				data = characters.shift();
			}
			operands.push(parseFloat(number));
			if (data) {
				characters.unshift(data);
			}
			return { inError: false, operands, operators, characters, operandPushed: true };
		}
		return { inError: true, characters, operands, operators, operandPushed: false };
	}

	static #collapseStacks({ operands, operators, operandPushed, endOfEquation }) {
		if (operandPushed) {
			if (!endOfEquation) {
				return { inError: false, operands, operators };
			}
			({ operands, operators } = Equation.#reduceStack({ operands, operators }));
			return { inError: false, operands, operators };
		} else {
			if (operands.length === 0 && operators.length === 1 && operators[0] !== '-') {
				throw new Error('Invalid operator at beginning of the equation. Expected a negative sign.');
			}
			if (operators.length === 1) {
				return { inError: false, operands, operators };
			}
			// at this point, we need to make a calculation. The number of operators is greater than 1
			if (operands.length < 2) {
				throw new Error('Not enough operands to perform the operation.');
			}
			({ operands, operators } = Equation.#reduceStack({ operands, operators }));
			return { inError: false, operands, operators };
		}
		return { inError: false, operands, operators };
	}

	static #reduceStack({ operands, operators }) {
		const operator = operators.pop();
		const operand2 = operands.pop();
		const operand1 = operands.pop();
		if (operator === '+') {
			operands.push(operand1 + operand2);
		} else if (operator === '-') {
			operands.push(operand1 - operand2);
		} else if (operator === '*') {
			operands.push(operand1 * operand2);
		} else if (operator === '/') {
			operands.push(operand1 / operand2);
		} else if (operator === '^') {
			operands.push(Math.pow(operand1, operand2));
		}
		return { operands, operators };
	}

	constructor() {
		throw new Error('Cannot instantiate an Equation object. Only the static method "Solve()" is available.');
	}
}
