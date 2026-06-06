import Dice from './../../../core/js/Dice/Dice.js';

const roll = (args) => {
	let result;
	let error;
	try {
		let count;
		let dieExpression;
		let add = false;
		let sum = 0;
		if (args.length < 1 || args.length > 2) {
			throw new Error('Roll: Invalid number of arguments.');
		}
		if (args.length === 1) {
			count = 1;
			dieExpression = args[0];
		} else if (args.length === 2) {
			const command = args[0].substring(0, 1);
			const number = parseInt(args[0].substring(1));
			if (isNaN(number) || (command !== '+' && command !== '*')) {
				throw new Error('Roll: Invalid format. Use "*n xdy" or "+n xdy" where "n" is a positive integer.');
			}
			add = command === '+';
			count = number;
			dieExpression = args[1];
		}
		const allDice = [];
		for(let i = 0; i < count; i++) {
			const roll = Dice.Roll(dieExpression);
			sum += roll;
			allDice.push(roll);
		}
		const dieList = allDice.join(', ');
		result = add ? `${sum} ( ${dieList} )` : dieList;
	} catch(err) {
		error = `Error: ${err.message}`;
	}
	return { exit: false, result, error };
}

export default roll;