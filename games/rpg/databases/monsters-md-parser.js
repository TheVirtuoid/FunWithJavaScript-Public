import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const directoryPath = './monsters';

const attributes = new Map([
	['Armor Class', 'armorClass'],
	['Hit Dice', 'hitDice'],
	['No. of Attacks', 'numberOfAttacks'],
	['Damage', 'damage'],
	['Movement', 'movement'],
	['No. Appearing', 'numberAppearing'],
	['Save As', 'saveAs'],
	['Morale', 'morale'],
	['Treasure Type', 'treasureType'],
	['XP', 'experience'],
]);

const processAttributes = (lines, monster) => {
	let line = lines.shift();
	while (!line.includes('---------- ----------')) {
		const [ description, value ] = line.split(':');
		console.log(`processing attribute: ${description} - ${value}`)
		monster[attributes.get(description)] = value.trim();
		if (description === 'Armor Class') {
			console.log(`Monster: ${monster.name} - AC: ${monster.armorClass}`);
		}
		line = lines.shift();
	}
	return monster;
}

const processMonster = (monsterLines) => {
	let monster = {
		name: '',
		armorClass: '',
		hitDice: '',
		numberOfAttacks: '',
		damage: '',
		movement: '',
		numberAppearing: '',
		saveAs: '',
		morale: '',
		treasureType: '',
		experience: '',
		text: [],
	}
	let line = monsterLines.shift();
	while (monsterLines.length) {
		if (line.startsWith('###')) {
			monster.name = line.replace('### ', '').trim();
			console.log(`------------------------------------------------------- ${monster.name} --------------------------------------`);
		}	else if (line.includes('---------- ----------')) {
			console.log(`        processing...`);
			monster = processAttributes(monsterLines, monster);
		}
		line = monsterLines.shift();
	}
	return monster;
}

readdirSync(directoryPath).forEach(file => {
	const fullPath = path.join(directoryPath, file);
	const monsterData = readFileSync(fullPath, 'utf8');
	const monsterLines = monsterData.split('\r\n');
	processMonster(monsterLines);
});



