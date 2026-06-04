import { writeFileSync, readFileSync, createReadStream } from 'fs';
import crypto from 'crypto';

const database = readFileSync('./armor.json', 'utf-8');
const itemData = JSON.parse(database);
let jsonl = [];
const indexById = new Map();
let index = 0;
itemData.forEach((item) => {
	item.id = crypto.randomUUID();
	const lineData = JSON.stringify(item);
	indexById.set(item.id, index);
	index += lineData.length + 2;
	jsonl.push(JSON.stringify(item));
});
const finalJsonl = jsonl.join('\r\n');
writeFileSync('./armor.jsonl', finalJsonl);
console.log(indexById);

const values = [...indexById.values()];

const idToRead = values[2];
const bytesToRead = values[3] - values[2];

const stream = createReadStream('./armor.jsonl', {
	start: idToRead,
	end: idToRead + bytesToRead - 3,
	encoding: 'utf8'
});

stream.on('data', (chunk) => {
	console.log(`Received ${chunk.length} bytes of data:`);
	console.log(JSON.parse(chunk.toString('utf8')));
});

stream.on('end', () => {
	console.log('Finished reading the specified bytes.');
});

stream.on('error', (err) => {
	console.error('An error occurred:', err);
});