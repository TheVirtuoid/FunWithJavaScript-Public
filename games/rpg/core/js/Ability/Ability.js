import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
const databasePath = config.databasePath;
const database = new Database(databasePath);
const abilitiesCollection = database.getAll({ databaseName: 'abilities' });
const abilities = new Map(abilitiesCollection.map((ability) => [ability.id, ability]));
const abilitiesByType = new Map(abilitiesCollection.map((ability) => [ability.type, ability]));
const idList = [...abilities.keys()];

export default class Ability {

	static IsAbility(abilityId) {
		return idList.includes(abilityId);
	}

	static GetAbility(abilityId) {
		return abilities.get(abilityId);
	}

	static GetAbilityByType(type) {
		return abilitiesByType.get(type);
	}

	#id;
	#value;
	#bonus;
	#data;

	constructor(args = {}) {
		const { id, value, bonus = 0 } = args;
		if (!Ability.IsAbility(id)) {
			throw new Error('Invalid ability id');
		}
		this.#id = id;
		this.#data = Ability.GetAbility(id);
		this.setBonus(bonus);
		this.setValue(value);
	}

	get bonus() {
		return this.#bonus;
	}

	get id() {
		return this.#id;
	}

	get value() {
		return this.#value;
	}

	get type() {
		return this.#data.type;
	}

	get name() {
		return this.#data.name;
	}

	get abbreviation() {
		return this.#data.abbreviation;
	}

	get description() {
		return this.#data.description;
	}

	setBonus(bonus) {
		if (Number.isInteger(bonus)) {
			this.#bonus = bonus;
		} else {
			throw new Error('Bonus must be an integer');
		}
	}

	setValue(value) {
		if (Number.isInteger(value)) {
			this.#value = value;
		} else {
			throw new Error('Value must be an integer');
		}
	}

	toObject() {
		return {
			id: this.id,
			value: this.value,
			bonus: this.bonus,
			type: this.type,
			name: this.name,
			abbreviation: this.abbreviation,
			description: this.description,
		}
	}

	toString() {
		return JSON.stringify(this.toObject());
	}
}