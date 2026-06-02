import Dice from './../../../core/js/Dice/Dice.js';

const roll = (args) => {
	let result;
	let error;
	try {
		result = Dice.Roll(args[0]);
	} catch(err) {
		error = `Error: ${err.message}`;
	}
	return { exit: false, result, error };
}

export default roll;