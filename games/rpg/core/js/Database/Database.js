import { readdirSync, readFileSync, openSync, readSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let instance;

export default class Database {

	#legalDatabases;
	#databaseLength;
	#indexes;
	#path;
	#databaseHandles;

	constructor(path) {
		if (instance) {
			return instance;
		}
		if (typeof path !== 'string') {
			throw new TypeError('Database path must be a string');
		}
		const resolvedPath = resolve(__dirname, './../../..', path); // this is so we can use relative paths
		this.#path = resolvedPath;
		try {
			const files = readdirSync(this.#path);
			this.#processDirectoryFiles(files);
			this.#databaseHandles = new Map();
			instance = this;
		} catch (error) {
			throw new Error(`Failed to read database directory at ${this.#path}: ${error.message}`);
		}
	}

	get(args = {}) {
		const { key, value } = args;
		if (!this.#indexes.has(key)) {
			throw new Error(`Index ${key} not found in database`);
		}
		if (!value) {
			throw new Error('Value must be provided in args');
		}
		const indexDatabase = this.#indexes.get(key);
		const indexValue = indexDatabase.get(value);
		if (!indexValue) {
			return undefined;
		}
		const { id, start, length, filename } = indexValue;
		return JSON.parse(this.#openAndRead({ filename, start, length }));
	}

	getAll(args = {}) {
		const { databaseName } = args;
		if (typeof databaseName !== 'string') {
			throw new Error('Database name must be provided in args and be a string');
		}
		if (!this.#legalDatabases.includes(databaseName)) {
			throw new Error(`Database ${databaseName} does not exist`);
		}
		const length = this.#databaseLength.get(databaseName);
		const allData = this.#openAndRead({ filename: databaseName, start: 0, length });
		return JSON.parse(`[${allData.split('\r\n').join(',')}]`);
	}

	#openAndRead(args) {
		const { filename, start, length } = args;
		let fileHandle = this.#databaseHandles.get(filename);
		try {
			if (!fileHandle) {
				this.#databaseHandles.set(filename, openSync(`${this.#path}/${filename}.jsonl`));
				fileHandle = this.#databaseHandles.get(filename);
			}
		} catch (err) {
			throw new Error(`Failed to open file ${filename}: ${err.message}`);
		}
		const buffer = Buffer.alloc(length);
		const bytesRead = readSync(fileHandle, buffer, { offset: 0, length, position: start });
		if (bytesRead !== length) {
			throw new Error(`Failed to read file ${filename}: expected ${length} bytes, got ${bytesRead}`);
		}
		return buffer.toString();

	}

	#processDirectoryFiles(files) {
		this.#databaseLength = new Map();
		this.#legalDatabases = [];
		this.#indexes = new Map();
		for (const filename of files) {
			if (filename.endsWith('.jsonl')) {
				const databaseName = filename.replace('.jsonl', '');
				this.#legalDatabases.push(databaseName);
				const stats = statSync(`${this.#path}/${filename}`);
				this.#databaseLength.set(databaseName, stats.size);
			} else if (filename.endsWith('.idx')) {
				const indexName = filename.replace('.idx', '');
				const indexText = readFileSync(`${this.#path}/${filename}`, 'utf8');
				const indexData = JSON.parse(indexText);
				const indexKey = indexData.shift().key;
				const indexMap = new Map();
				indexData.forEach(entry => {
					indexMap.set(entry[indexKey], entry);
				})
				this.#indexes.set(indexName, indexMap);
			}
		}
		if (this.#legalDatabases.length === 0) {
			throw new Error('No JSONL files found in the database directory');
		}
		if (this.#indexes.size === 0) {
			throw new Error('No IDX files found in the database directory');
		}
	}
}