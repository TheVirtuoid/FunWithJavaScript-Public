import generateCharacter from "./generate-character.js";

const generate = (args) => {
	if (args[0] === 'character') {
		args.shift();
		return generateCharacter(args);
	} else {
		return { exit: false, error: '1st argument to "generate" must be the word "character".' };
	}
	if (args[0] !== 'character') {
	}
	console.log(args);
	return { exit: false, result: true };
}

export default generate;