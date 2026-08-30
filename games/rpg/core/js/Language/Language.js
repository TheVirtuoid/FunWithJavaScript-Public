import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
const databasePath = config.database.path;
const database = new Database(databasePath);
const languagesCollection = database.getAll({ databaseName: 'languages' });
const languages = new Map(languagesCollection.map((language) => [language.id, language]));
const languagesByName = new Map(languagesCollection.map((language) => [language.name, language]));
const idList = [...languages.keys()];

export default class Language {

	static IsLanguage(languageId) {
		return idList.includes(languageId);
	}

	static GetLanguage(languageId) {
		return languages.get(languageId);
	}

	static GetLanguageByName(name) {
		return languagesByName.get(name);
	}

	#id;
	#data;

	constructor(args = {}) {
		const { id } = args;
		if (!Language.IsLanguage(id)) {
			throw new Error('Invalid language id');
		}
		this.#id = id;
		this.#data = Language.GetLanguage(id);
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#data.name;
	}

	get fullName() {
		return this.#data.fullName;
	}

	toObject() {
		return {
			id: this.id,
			name: this.name,
			fullName: this.fullName
		}
	}

	toString() {
		return JSON.stringify(this.toObject());
	}
}