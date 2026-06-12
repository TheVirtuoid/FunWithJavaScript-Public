const findName = (args) => {
	return name = args.find((arg) => arg[0] === '--name');
}

const findRace = (args) => {}

const findClass = (args) => {}

const generateCharacter = (args) => {
	console.log(args);
	const name = args.find((arg) => arg[0] === '--name');
	const race = args.find((arg) => arg[0] === '--race');
	const characterClass = args.find((arg) => arg[0] === '--class');
	return { exit: false, result: true };
}

export default generateCharacter;