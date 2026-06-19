import Character from "../Character/Character.js";

import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
import Dice from "../Dice/Dice.js";

const databasePath = config.databasePath;
const database = new Database(databasePath);
const abilitiesCollection = database.getAll({ databaseName: 'abilities' });
const abilities = new Map(abilitiesCollection.map((ability) => [ability.id, ability]));
const abilitiesByAbbreviation = new Map(abilitiesCollection.map((ability) => [ability.abbreviation, ability]));

const abilityList = [
	'STR', 'DEX', 'INT', 'WIS', 'CON', 'CHA'
];

export default class PlayerCharacter extends Character {

	static RollAbilities() {
		return abilityList.map((ability) => {
			return { id: abilitiesByAbbreviation.get(ability).id, value: Dice.Roll('3d6') };
		});
	}

	constructor(args) {
		super(args);
		console.log(PlayerCharacter.RollAbilities());
	}
}