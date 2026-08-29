import { writeFileSync, readFileSync } from 'fs';
import crypto from 'crypto';

import config from '../config.json' with { type: 'json' };

const baseFiles = [
	'abilities',
	'ability-bonus-adjustment',
	'attributes',
	'money',
	'restrictions',
	'languages'
];

const secondRunFiles = [
	'armor',
];

const thirdRunFiles = [
	'characterClass',
	'equipment',
	'weapon',
];

const fourthRunFiles = [
	'race',
];

const indexById = new Map();
const indexByName = new Map();

const delimiter = config.database.delimiter;

const buildIndex = (filename, indexById, indexByName) => {
	const database = readFileSync(`./${filename}.json`, 'utf-8');
	const itemData = JSON.parse(database);
	let jsonl = [];
	let start = 0;
	itemData.forEach((item, index) => {
		if (typeof item !== 'object') {
			item = { id: '', data: item, name: '' };
			if (filename === 'ability-bonus-adjustment') {
				item.id = `aba${index}`;
				item.name = `aba${index}`;
			}
		} else {
			item.id = crypto.randomUUID();
		}
		item['restrictions']?.forEach((restriction) => {
			if (restriction.type === 'ability') {
				restriction.value = abilityByAbbreviations.get(restriction.value)?.id || restriction.value;
			}
			if (restriction.type === 'armor-type') {
				restriction.value = restriction.value.map((armorType) => armorByType.get(armorType)?.id || armorType);
			}
			if (restriction.type === 'weapon-type') {
				restriction.value = restriction.value.map((weaponType) => weaponByType.get(weaponType)?.id || weaponType);
			}
			if (restriction.type === 'weapon-size') {
				restriction.value = restriction.value.map((weaponSize) => weaponBySize.get(weaponSize)?.id || weaponSize);
			}
			restriction.type = restrictionsByType.get(restriction.type)?.id || restriction.type;
		});
		if (item.classes) {
			item.classes = item.classes.map((characterClass) => characterClassByType.get(characterClass)?.id || characterClass);
		}
		if (item.price) {
			item.priceUnit = moneyByAbbreviation.get(item.priceUnit || 'gp')?.id || item.priceUnit;
		}
		const lineData = JSON.stringify(item);
		const length = lineData.length;
		indexById.set(item.id, { start, length, filename });
		indexByName.set(item.name, { start, length, filename });
		start += length + delimiter.length;
		jsonl.push(JSON.stringify(item));
	});
	const finalJsonl = jsonl.join(delimiter);
	const outputFilename = `./jsonl/${filename}.jsonl`;
	writeFileSync(outputFilename, finalJsonl);
	console.log(`Wrote ${outputFilename}`);
}

baseFiles.forEach((filename) => buildIndex(filename, indexById, indexByName));

const abilityDatabase = readFileSync('./jsonl/abilities.jsonl', 'utf-8');
const abilityData = JSON.parse(`[${abilityDatabase.split(delimiter).join(',')}]`);
const abilityByAbbreviations = new Map(abilityData.map((ability) => [ability.abbreviation, ability]));

const abilityBonusAdjustmentDatabase = readFileSync('./jsonl/ability-bonus-adjustment.jsonl', 'utf-8');
const abilityBonusAdjustmentData = JSON.parse(`[${abilityBonusAdjustmentDatabase.split(delimiter).join(',')}]`);

const attributesDatabase = readFileSync('./jsonl/attributes.jsonl', 'utf-8');
const attributesData = JSON.parse(`[${attributesDatabase.split(delimiter).join(',')}]`);

const moneyDatabase = readFileSync('./jsonl/money.jsonl', 'utf-8');
const moneyData = JSON.parse(`[${moneyDatabase.split(delimiter).join(',')}]`);
const moneyByAbbreviation = new Map(moneyData.map((money) => [money.abbreviation, money]));

const restrictionsDatabase = readFileSync('./jsonl/restrictions.jsonl', 'utf-8');
const restrictionsData = JSON.parse(`[${restrictionsDatabase.split(delimiter).join(',')}]`);
const restrictionsByType = new Map(restrictionsData.map((restriction) => [restriction.type, restriction]));

const weaponDatabase = readFileSync('./jsonl/weapon.jsonl', 'utf-8');
const weaponData = JSON.parse(`[${weaponDatabase.split(delimiter).join(',')}]`);
const weaponByType = new Map(weaponData.map((weapon) => [weapon.type, weapon]));
const weaponBySize = new Map(weaponData.map((weapon) => [weapon.size, weapon]));


secondRunFiles.forEach((filename) => buildIndex(filename, indexById, indexByName));

const armorDatabase = readFileSync('./jsonl/armor.jsonl', 'utf-8');
const armorData = JSON.parse(`[${armorDatabase.split(delimiter).join(',')}]`);
const armorByType = new Map(armorData.map((armor) => [armor.type, armor]));

thirdRunFiles.forEach((filename) => buildIndex(filename, indexById, indexByName));

const characterClassDatabase = readFileSync('./jsonl/characterClass.jsonl', 'utf-8');
const characterClassData = JSON.parse(`[${characterClassDatabase.split(delimiter).join(',')}]`);
const characterClassByType = new Map(characterClassData.map((characterClass) => [characterClass.type, characterClass]));

fourthRunFiles.forEach((filename) => buildIndex(filename, indexById, indexByName));


const idIndex = [...indexById.entries()].map(([key, value]) => {
	return { id: key, ...value };
});
idIndex.unshift({ key: 'id' });
const nameIndex = [...indexByName.entries()].map(([key, value]) => {
	return { name: key, ...value };
});
nameIndex.unshift({ key: 'name' });

writeFileSync('./jsonl/id.idx', JSON.stringify(idIndex));
console.log(`Wrote id.idx`);
writeFileSync('./jsonl/name.idx', JSON.stringify(nameIndex));
console.log(`Wrote name.idx`);
//console.log(indexById);
//console.log(indexByName);
// console.log(idIndex);
console.log('\n\nDone.\n\n');

/*const strength = indexByName.get('Sack, Small');
const fileHandle = await open('./jsonl/equipment.jsonl');
const length = strength.length;
const buffer = Buffer.alloc(length);
const { bytesRead } = await fileHandle.read(buffer, 0, length, strength.start);
const ability = buffer.subarray(0, bytesRead);
console.log(ability.toString());
await fileHandle.close();*/
