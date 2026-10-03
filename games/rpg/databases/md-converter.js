import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const basePath = process.argv[2];

const directoryPath = `${basePath}/md`;

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
	['Price', 'price'],
]);

const processAttributes = (lines, entry) => {
	let line = lines.shift();
	while (!line.includes('---------- ----------')) {
		const [ description, value ] = line.split(':');
		// console.log(`processing attribute: ${description} - ${value}`)
		entry[attributes.get(description)] = value.trim();
		if (description === 'Armor Class') {
			// console.log(`Entry: ${entry.name} - AC: ${entry.armorClass}`);
		}
		line = lines.shift();
	}
	return entry;
}

const processEntry = (entryLines) => {
	let entry = {
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
		price: 0,
		text: [],
	}
	let line = entryLines.shift();
	while (entryLines.length) {
		if (line.startsWith('###')) {
			entry.name = line.replace('### ', '').trim();
			// console.log(`------------------------------------------------------- ${entry.name} --------------------------------------`);
		}	else if (line.includes('---------- ----------')) {
			// console.log(`        processing...`);
			entry = processAttributes(entryLines, entry);
		}
		line = entryLines.shift();
	}
	return entry;
}

readdirSync(directoryPath).forEach(file => {
	const fullPath = path.join(directoryPath, file);
	const entryData = readFileSync(fullPath, 'utf8');
	const entryLines = entryData.split('\r\n');
	const entry = processEntry(entryLines);
	console.log(entry);
});



