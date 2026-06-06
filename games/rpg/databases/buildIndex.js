import { writeFileSync, readFileSync } from 'fs';
import { open } from 'fs/promises'
import crypto from 'crypto';

const files = [
	'abilities',
	'armor',
	'attributes',
	'characterClass',
	'equipment',
	'race'
];
const indexById = new Map();
const indexByName = new Map();

const buildIndex = (filename, indexById, indexByName) => {
	const database = readFileSync(`./${filename}.json`, 'utf-8');
	const itemData = JSON.parse(database);
	let jsonl = [];
	let start = 0;
	itemData.forEach((item) => {
		item.id = crypto.randomUUID();
		const lineData = JSON.stringify(item);
		const length = lineData.length;
		indexById.set(item.id, { start, length, filename });
		indexByName.set(item.name, { start, length, filename });
		start += length + 2;
		jsonl.push(JSON.stringify(item));
	});
	const finalJsonl = jsonl.join('\r\n');
	const outputFilename = `./jsonl/${filename}.jsonl`;
	writeFileSync(outputFilename, finalJsonl);
	console.log(`Wrote ${outputFilename}`);
}

files.forEach((filename) => buildIndex(filename, indexById, indexByName));
const idIndex = [...indexById.entries()].map(([key, value]) => {
	return { id: key, ...value };
});
idIndex.unshift({ key: 'id' });
const nameIndex = [...indexByName.entries()].map(([key, value]) => {
	return { name: key, ...value };
});
nameIndex.unshift({ key: 'name' });

writeFileSync('./jsonl/id.idx', JSON.stringify(idIndex));
writeFileSync('./jsonl/name.idx', JSON.stringify(nameIndex));
//console.log(indexById);
//console.log(indexByName);
console.log(idIndex);

const strength = indexByName.get('Sack, Small');
const fileHandle = await open('./jsonl/equipment.jsonl');
const length = strength.length;
const buffer = Buffer.alloc(length);
const { bytesRead } = await fileHandle.read(buffer, 0, length, strength.start);
const ability = buffer.subarray(0, bytesRead);
console.log(ability.toString());
await fileHandle.close();
