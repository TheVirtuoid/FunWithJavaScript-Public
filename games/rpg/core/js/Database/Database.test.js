import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { readdirSync, readFileSync, openSync, readSync, statSync } from "fs";

const validData = JSON.stringify([{"key":"id"},{"id":"bc8dbbdb-839a-446a-9713-459a3bfda5d2","start":0,"length":129,"filename":"abilities"}]);
const validResult = {"name":"Strength","abbreviation":"STR","description":"Physical power and endurance","id":"bc8dbbdb-839a-446a-9713-459a3bfda5d2"};

const invalidFilename = JSON.stringify([{"key":"id"},{"id":"bc8dbbdb-839a-446a-9713-459a3bfda5d2","start":0,"length":129,"filename":"baddie"}]);

vi.mock('fs', () => ({
	readdirSync: vi.fn().mockReturnValue([]),
	readFileSync: vi.fn().mockReturnValue('[]'),
	openSync: vi.fn(),
	readSync: vi.fn(),
	statSync: vi.fn().mockReturnValue({size: 129 }),
}));

const mockReaddirSync = vi.mocked(readdirSync);
const mockReadFileSync = vi.mocked(readFileSync);
const mockOpenSync = vi.mocked(openSync);
const mockReadSync = vi.mocked(readSync);
const mockStatSync = vi.mocked(statSync);

describe('Database', () => {
	const validPath = './databases/jsonl';
	let Database;

	beforeEach(async () => {
		vi.clearAllMocks();
		vi.resetModules();
		// Dynamically import the Database module to reset its singleton instance state per test
		const module = await import('./Database.js');
		Database = module.default;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	// ---------------------------------------------------------------------------
	// Constructor
	// ---------------------------------------------------------------------------
	describe('Constructor', () => {
		it('should create a singleton Database instance', () => {
			mockReaddirSync.mockReturnValue(['data.jsonl', 'id.idx']);
			mockReadFileSync.mockReturnValue(validData);
			mockStatSync.mockReturnValue({ size: 100 });
			const db1 = new Database(validPath);
			const db2 = new Database(validPath);

			expect(db1).toBeInstanceOf(Database);
			expect(db1).toBe(db2);
		});

		it('should throw an error if path is missing', () => {
			expect(() => new Database()).toThrow();
		});

		it('should throw an error if path is not a string', () => {
			expect(() => new Database(123)).toThrow();
		});

		it('should throw an error if the directory does not exist', () => {
			mockReaddirSync.mockImplementation(() => { throw new Error('ENOENT'); });
			expect(() => new Database('./missing')).toThrow();
		});

		it('should throw an error if *.jsonl files are missing', () => {
			mockReaddirSync.mockReturnValue(['id.idx']);
			expect(() => new Database(validPath)).toThrow();
		});

		it('should throw an error if *.idx files are missing', () => {
			mockReaddirSync.mockReturnValue(['data.jsonl']);
			expect(() => new Database(validPath)).toThrow();
		});
	});

	// ---------------------------------------------------------------------------
	// Method: get
	// ---------------------------------------------------------------------------
	describe('get', () => {
		it('retrieves a single entity from the database by ID', async () => {
			mockReaddirSync.mockReturnValue(['data.jsonl', 'id.idx']);
			mockReadFileSync.mockReturnValue(validData);
			mockStatSync.mockReturnValue({ size: 100 });
			mockOpenSync.mockReturnValue(42); // returns a mocked file descriptor
			mockReadSync.mockImplementation((fd, buffer, options) => {
				const dataStr = JSON.stringify(validResult);
				buffer.write(dataStr);
				return dataStr.length;
			});
			const db = new Database(validPath);
			const args = {
				key: 'id',
				value: 'bc8dbbdb-839a-446a-9713-459a3bfda5d2'
			};
			const result = db.get(args);
			expect(result).toBeDefined();
			expect(result.name).toBe('Strength');
		});

		it('returns undefined if not found', async () => {
			mockReaddirSync.mockReturnValue(['data.jsonl', 'id.idx']);
			mockReadFileSync.mockReturnValue(validData);
			mockStatSync.mockReturnValue({ size: 100 });
			mockOpenSync.mockReturnValue(42); // returns a mocked file descriptor
			mockReadSync.mockImplementation((fd, buffer, options) => {
				return undefined;
			});
			const db = new Database(validPath);
			const result = db.get({ key: 'id', value: 'non-existent' });
			expect(result).toBeUndefined();
		});

		it('throws if key is missing in args', async () => {
			mockReaddirSync.mockReturnValue(['data.jsonl', 'id.idx']);
			mockReadFileSync.mockReturnValue(validData);
			mockStatSync.mockReturnValue({ size: 100 });
			mockOpenSync.mockReturnValue(42); // returns a mocked file descriptor
			mockReadSync.mockImplementation((fd, buffer, options) => {
				const dataStr = JSON.stringify(validResult);
				buffer.write(dataStr);
				return dataStr.length;
			});
			const db = new Database(validPath);
			expect(() => db.get({ value: 'some-value' })).toThrow();
		});

		it('throws if value is missing in args', async () => {
			mockReaddirSync.mockReturnValue(['data.jsonl', 'id.idx']);
			mockReadFileSync.mockReturnValue(validData);
			mockStatSync.mockReturnValue({ size: 100 });
			mockOpenSync.mockReturnValue(42); // returns a mocked file descriptor
			mockReadSync.mockImplementation((fd, buffer, options) => {
				const dataStr = JSON.stringify(validResult);
				buffer.write(dataStr);
				return dataStr.length;
			});
			const db = new Database(validPath);
			expect(() => db.get({ key: 'id' })).toThrow();
		});
	});

	// ---------------------------------------------------------------------------
	// Method: getAll
	// ---------------------------------------------------------------------------
	describe('getAll', () => {
		it('retrieves all entities from the database', async () => {
			mockReaddirSync.mockReturnValue(['monsters.jsonl', 'id.idx']);
			mockStatSync.mockReturnValue({ size: 129 });
			mockReadFileSync.mockReturnValue(validData);
			const db = new Database(validPath);
			const result = db.getAll({ databaseName: 'monsters' });
			expect(Array.isArray(result)).toBe(true);
		});

		it('throws if the database name is missing in args', async () => {
			mockReaddirSync.mockReturnValue(['data.jsonl', 'id.idx']);
			mockStatSync.mockReturnValue({ size: 129 });
			mockReadFileSync.mockReturnValue(validData);
			const db = new Database(validPath);
			expect(() => db.getAll({})).toThrow();
		});

		it('throws if the database itself is not found', async () => {
			mockReaddirSync.mockReturnValue(['monsters.jsonl', 'id.idx']);
			mockStatSync.mockReturnValue({ size: 129 });
			mockReadFileSync.mockReturnValue(validData);
			const db = new Database(validPath);
			expect(() => db.getAll({ databaseName: 'non-existent' })).toThrow();
		});
	});
});