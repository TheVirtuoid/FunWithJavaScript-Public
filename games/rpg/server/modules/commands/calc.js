import Equation from "../../../core/js/Equation/Equation.js";

const calc = (args) => {
	let result;
	let error;
	try {
		result = Equation.Solve(args[0]);
	} catch (err) {
		error = `Error: ${err.message}`;
	}
	return { exit: false, result, error };
}

export default calc;