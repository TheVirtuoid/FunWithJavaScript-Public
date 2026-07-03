import Database from "../../../core/js/Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };

import CommandPrompt from "../CommandPrompt.js";

import PlayerCharacter from "../../../core/js/PlayerCharacter/PlayerCharacter.js";
import PrintText from "../PrintText.js";
import Restriction from "../../../core/js/Restriction/Restriction.js";
import Attribute from "../../../core/js/Attribute/Attribute.js";
import RaceData from "../../../core/js/RaceData/RaceData.js";
import CharacterClassData from "../../../core/js/CharacterClassData/CharacterClassData.js";
import Race from "../../../core/js/Race/Race.js";
import CharacterClass from "../../../core/js/CharacterClass/CharacterClass.js";
import Armor from "../../../core/js/Armor/Armor.js";
import Dice from "../../../core/js/Dice/Dice.js";
import Ability from "../../../core/js/Ability/Ability.js";

const prompt = new CommandPrompt();


const databasePath = config.databasePath;
const database = new Database(databasePath);
const raceCollection = database.getAll({ databaseName: 'race' });
const characterClassCollection = database.getAll({ databaseName: 'characterClass' });
const attributeCollection = database.getAll({ databaseName: 'attributes' });

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

const width = 35;

// box printers
const single = {
	topLeft:     '\u250C', // ┌
	topRight:    '\u2510', // ┐
	bottomLeft:  '\u2514', // └
	bottomRight: '\u2518', // ┘
	horizontal:  '\u2500', // ─
	vertical:    '\u2502',  // │
	middleT: '\u253C',
	topT: '\u252C',
	bottomT: '\u2534',
	middleLeft: '\u251C',
	middleRight: '\u2524'
};


const printLine = (text, position = 'middle') => {
	if (text === '-') {
		console.log(`${single[position+'Left']}${single.horizontal.repeat(width * 2 + 1)}${single[position+'Right']}`);
	} else {
		console.log(`${single.vertical}${text}${' '.repeat(width - text.length + width + 1)}${single.vertical}`);
	}
}

const printDoubleLine = (text1, text2 = 'middle', position = 'middle') => {
	if (text1 === '-') {
		let middleAnchor;
		if (position === 'top') {
			middleAnchor = single.topT;
		} else if (position === 'middle') {
			middleAnchor = single.middleT;
		} else if (position === 'bottom') {
			middleAnchor = single.bottomT;
		}
		console.log(`${single[text2+'Left']}${single.horizontal.repeat(width)}${middleAnchor}${single.horizontal.repeat(width)}${single[text2+'Right']}`);
	} else {
		console.log(`${single.vertical}${text1}${' '.repeat(width - text1.length)}${single.vertical}${text2}${' '.repeat(width - text2.length)}${single.vertical}`);
	}

}

const generateCharacter = async (args) => {
	const nameArgs = args.find((arg) => arg[0] === '--name');
	if (!nameArgs) {
		return { exit: false, result: false, error: 'Missing required arguments. Need --name' };
	}
	const name = nameArgs[1];

	const abilities = await rollAbilities();

	const raceName = await selectRace(abilities);
	const raceData = Race.GetRaceData(Race.GetRaceId(raceName));
	const race = raceData.id;

	const characterClassName = await selectCharacterClass(abilities);
	const characterClassData = CharacterClass.GetCharacterClassData(CharacterClass.GetCharacterClassId(characterClassName));
	const characterClass = characterClassData.id;

	// set the attributes
	const attributes = [];
	attributeCollection.forEach((attribute) => {
		switch(attribute.type) {
			case 'level':
				attributes.push(new Attribute({ id: attribute.id, value: 1 }));
				break;
			case 'experience':
				attributes.push(new Attribute({ id: attribute.id, value: 0 }));
				break;
			case 'armor-class':
				const armor = Armor.GetArmorByType('none');
				attributes.push(new Attribute({ id: attribute.id, value: armor.armorClass }));
				break;
			case 'hit-points':
				const hitDie = Restriction.CheckAHitPointRestrictions({ race: raceData }) ?? characterClassData.levelData[0].hitPoints;
				let value = Dice.Roll(hitDie);
				const constitutionBonus = abilities.find((ability) => ability.type === 'constitution').bonus;
				attributes.push(new Attribute({ id: attribute.id, value: Math.max(1, value + constitutionBonus) }));
				break;
			case 'attack-bonus':
				attributes.push(new Attribute({ id: attribute.id, value: 0 }));
				break;
		}
	})

	// set experience points
	/*const experienceData = attributeCollection.find((attribute) => attribute.type === 'experience');
	const experience = new Attribute({ id: experienceData.id, value: 0 });

	// set armor class
	const armorClassData = attributeCollection.find((attribute) => attribute.type === 'armor-class');
	const armorClassType =
	const armorClass = new Attribute({ id: armorClassData.id, value: 0 });*/

	// set hit points

	console.log('\n\n\n');
	printLine('-', 'top');
	printLine(` Name: ${name}`);
	printLine(` Race: ${raceData.name}`);
	printLine(` Class: ${characterClassData.name}`);
	printDoubleLine('-', 'middle', 'top');
	printDoubleLine(' ABILITIES', ' ATTRIBUTES');
	for (let i = 0; i < Math.max(abilities.length, attributes.length); i++) {
		const ability = abilities[i];
		const attribute = attributes[i];
		const abilityData = ability ? database.get({ key: 'id', value: ability.id }) : null;
		const attributeData = attribute ? database.get({ key: 'id', value: attribute.id }) : null;
		const text1 = ability ? `   ${abilityData.abbreviation.toUpperCase()}: ${ability.value} ${ability.bonus !== 0 ? '('+ability.bonus+')' : ''}` : ' ';
		const text2 = attribute ? `   ${attributeData.name}: ${attribute.value}` : ' ';
		printDoubleLine(text1, text2);
	}
	/*abilities.forEach((ability) => {
		const abilityData = database.get({ key: 'id', value: ability.id });
		printLine(`   ${abilityData.abbreviation.toUpperCase()}: ${ability.value} ${ability.bonus !== 0 ? '('+ability.bonus+')' : ''}`);
	});*/
	printDoubleLine('-', 'bottom', 'bottom');

	return { exit: false, result: abilities };
}

export default generateCharacter;