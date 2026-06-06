import { readdirSync, readFileSync, open } from 'fs';

let instance;

export default class Database {

	#databases;
	#indexes;
	#path;
	#fileHandles;

	constructor(path) {
		if (instance) {
			return instance;
		}
		if (typeof path !== 'string') {
			throw new TypeError('Database path must be a string');
		}
		this.#path = path;
		try {
			const files = readdirSync(path);
			this.#processDirectoryFiles(files);
			this.#fileHandles = new Map();
			instance = this;
		} catch (error) {
			throw new Error(`Failed to read database directory at ${path}: ${error.message}`);
		}
	}

	get(args = {}) {
		const { key, value } = args;
		if (!this.#indexes.has(key)) {
			throw new Error(`Index ${key} not found in database`);
		}
		const indexDatabase = this.#indexes.get(key);
		const indexValue = indexDatabase.get(value);
		if (!indexValue) {
			return undefined;
		}
		let fileHandle = this.#fileHandles.get(indexValue.filename);
		if (!fileHandle) {
			open(`${this.#path}/${indexValue.filename}`, 'utf8', this.#retrieveFile.bind(this));
		}
		/*const database = JSON.parse(fileHandle);
		return database[indexValue.index];*/
	}

	#retrieveFile(err, data) {
		console.log('retrieved file:');
	}

	#processDirectoryFiles(files) {
		this.#databases = new Map();
		this.#indexes = new Map();
		for (const filename of files) {
			if (filename.endsWith('.jsonl')) {
				const databaseName = filename.replace('.jsonl', '');
				this.#databases.set(databaseName, null);
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
		if (this.#databases.size === 0) {
			throw new Error('No JSONL files found in the database directory');
		}
		if (this.#indexes.size === 0) {
			throw new Error('No IDX files found in the database directory');
		}
	}
}