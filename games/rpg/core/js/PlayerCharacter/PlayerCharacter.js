import Character from "../Character/Character.js";

import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
import Dice from "../Dice/Dice.js";
import Ability from "../Ability/Ability.js";

const databasePath = config.databasePath;
const database = new Database(databasePath);
const abilitiesCollection = database.getAll({ databaseName: 'abilities' });
const abilities = new Map(abilitiesCollection.map((ability) => [ability.id, ability]));
const abilitiesByAbbreviation = new Map(abilitiesCollection.map((ability) => [ability.abbreviation, ability]));

const abaData = database.getAll({ databaseName: 'ability-bonus-adjustment' });
const abas = new Map(abaData.map((aba) => [aba.id, aba]));

const abilityList = [
	'STR', 'DEX', 'INT', 'WIS', 'CON', 'CHA'
];

export default class PlayerCharacter extends Character {

	static RollAbilities() {
		return abilityList.map((ability) => {
			const roll = Dice.Roll('3d6');
			const bonus = abas.get(`aba${roll}`).data;
			return new Ability({ id: abilitiesByAbbreviation.get(ability).id, value: roll, bonus });
		});
	}

	constructor(args) {
		super(args);
		PlayerCharacter.RollAbilities().forEach((ability) => this.addAbility(ability));
	}
}