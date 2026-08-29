import { describe, it, expect } from 'vitest';
import Language from './Language.js';
import {readFileSync} from "fs";
import config from './../../../config.json' with { type: 'json' };

const languageDatabase = readFileSync(`${config.database.path}/languages.jsonl`, 'utf-8');
const languageData = JSON.parse(`[${languageDatabase.split(config.database.delimiter).join(',')}]`);

const VALID_ID = languageData[0]['id'];
const VALID_NAME = languageData[0]['name'];
const VALID_FULL_NAME = languageData[0]['fullName'];

describe('Language', () => {

	// ─── constructor ───────────────────────────────────────────────────────────

	describe('constructor', () => {

		describe('valid construction', () => {
			it('constructs with id', () => {
				const language = new Language({ id: VALID_ID });
				expect(language).toBeInstanceOf(Language);
			});

			it('throws error if id is not specified', () => {
				expect(() => new Language()).toThrow();
			})
		});
	});

	// ─── Properties ────────────────────────────────────────────────────────────

	describe('properties', () => {
		it('id returns the string passed to the constructor', () => {
			const language = new Language({ id: VALID_ID });
			expect(language.id).toBe(VALID_ID);
		});

		it('name returns the string passed to the constructor', () => {
			const language = new Language({ id: VALID_ID });
			expect(language.name).toBe(VALID_NAME);
		});

		it('fullname returns the string passed to the constructor', () => {
			const language = new Language({ id: VALID_ID });
			expect(language.fullName).toBe(VALID_FULL_NAME);
		});

		describe('read-only', () => {
			it('id cannot be reassigned', () => {
				const language = new Language({ id: VALID_ID });
				expect(() => { language.id = 'another string'; }).toThrow();
			});

			it('name cannot be reassigned', () => {
				const language = new Language({ id: VALID_ID });
				expect(() => { language.name = 'bad one'; }).toThrow();
			});

			it('fullName cannot be reassigned', () => {
				const language = new Language({ id: VALID_ID });
				expect(() => { language.fullName = 'bad one'; }).toThrow();
			});
		});
	});


	// ─── Static Public Methods ─────────────────────────────────────────────────

	describe('IsLanguage()', () => {
		it('returns true for a valid id', () => {
			expect(Language.IsLanguage(VALID_ID)).toBe(true);
		});

		it('returns false for invalid language objects', () => {
			expect(Language.IsLanguage(Symbol('bad'))).toBe(false);
			expect(Language.IsLanguage(null)).toBe(false);
			expect(Language.IsLanguage(undefined)).toBe(false);
			expect(Language.IsLanguage('language')).toBe(false);
		});
	});

	describe('GetLanguage', () => {
		it('should return the correct data', () => {
			const language = Language.GetLanguage(VALID_ID);
			expect(language.id).toEqual(VALID_ID);
		});

		it('should return undefined for an invalid language', () => {
			expect(Language.GetLanguage(Symbol('bad'))).toBeUndefined();
			expect(Language.GetLanguage(null)).toBeUndefined();
			expect(Language.GetLanguage(undefined)).toBeUndefined();
			expect(Language.GetLanguage('language')).toBeUndefined();
		});
	});

	describe('GetLanguageByName', () => {
		it('should return the correct data', () => {
			const language = Language.GetLanguageByName(VALID_NAME);
			expect(language.name).toEqual(VALID_NAME);
		});

		it('should return undefined for an invalid language', () => {
			expect(Language.GetLanguageByName(Symbol('bad'))).toBeUndefined();
			expect(Language.GetLanguageByName(null)).toBeUndefined();
			expect(Language.GetLanguageByName(undefined)).toBeUndefined();
			expect(Language.GetLanguageByName('language')).toBeUndefined();
		});

	});
});
