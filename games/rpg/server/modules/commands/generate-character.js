import Database from "../../../core/js/Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };

import CommandPrompt from "../CommandPrompt.js";

import PlayerCharacter from "../../../core/js/PlayerCharacter/PlayerCharacter.js";
import PrintText from "../PrintText.js";
import Restriction from "../../../core/js/Restriction/Restriction.js";

const prompt = new CommandPrompt();


const databasePath = config.databasePath;
const database = new Database(databasePath);
const raceCollection = database.getAll({ databaseName: 'race' });
const characterClassCollection = database.getAll({ databaseName: 'characterClass' });

const printText = new PrintText();

const rollAbilities = async () => {
	let abilities = null;
	let rollsRemaining = 3;

	while (!abilities) {
		const abilityRoll = PlayerCharacter.RollAbilities();

		printText.printLine('You rolled:');
		abilityRoll.forEach((roll) => {
			const ability = database.get({key: 'id', value: roll.id});
			printText.printLine(`  ${ability.abbreviation.toUpperCase()}: ${roll.value} ${roll.bonus !== 0 ? '(' + roll.bonus + ')' : ''}`);
		});
		rollsRemaining--;
		if (rollsRemaining === 0) {
			abilities = abilityRoll;
		} else {
			let answer = '';
			while (answer !== 'a' && answer !== 'r') {
				answer = await prompt.get(`(A)ccept this roll, or (R)oll again (rolls remaining: ${rollsRemaining}): `);
				answer = answer.toLowerCase();
				if (answer === 'a') {
					abilities = abilityRoll;
				}
			}
		}
	}
	return abilities;
}

const selectRace = async (abilities) => {
	const races = [];
	raceCollection.forEach((race) => {
		if (!Restriction.CheckAbilityRestrictions({ restrictions: race.restrictions, abilities })) {
			races.push(race.name.toLowerCase());
		}
	});
	let answer = '';
	while (!races.includes(answer)) {
		answer = await prompt.get(`Choose one of these races: ${races.join(', ')}: `);
		answer = answer.toLowerCase();
	}
	return answer;
}

const selectCharacterClass = async (abilities) => {
	const characterClasses = [];
	characterClassCollection.forEach((characterClass) => {
		if (!Restriction.CheckAbilityRestrictions({ restrictions: characterClass.restrictions, abilities })) {
			characterClasses.push(characterClass.name.toLowerCase());
		}
	});
	let answer = '';
	while (!characterClasses.includes(answer)) {
		answer = await prompt.get(`Choose one of these character classes: ${characterClasses.join(', ')}: `);
		answer = answer.toLowerCase();
	}
	return answer;
}

const width = 40;

const printLine = (text) => {
	if (text === '-') {
		console.log(`|${text}${'-'.repeat(width - text.length)}|`);
	} else {
		console.log(`|${text}${' '.repeat(width - text.length)}|`);
	}
}

const generateCharacter = async (args) => {
	const nameArgs = args.find((arg) => arg[0] === '--name');
	if (!nameArgs) {
		return { exit: false, result: false, error: 'Missing required arguments. Need --name' };
	}
	const name = nameArgs[1];

	const abilities = await rollAbilities();
	const race = await selectRace(abilities);
	const characterClass = await selectCharacterClass(abilities);

	printLine('-');
	printLine(` Name: ${name}`);
	printLine(` Race: ${race}`);
	printLine(` Class: ${characterClass}`);
	printLine('-');
	printLine(' ABILITIES');
	abilities.forEach((ability) => {
		const abilityData = database.get({ key: 'id', value: ability.id });
		printLine(`   ${abilityData.abbreviation.toUpperCase()}: ${ability.value} ${ability.bonus !== 0 ? '('+ability.bonus+')' : ''}`);
	});
	printLine('-');

	return { exit: false, result: abilities };
}

export default generateCharacter;