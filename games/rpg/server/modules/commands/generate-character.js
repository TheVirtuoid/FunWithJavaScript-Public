import Database from "../../../core/js/Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
const databasePath = config.databasePath;
const database = new Database(databasePath);
const racesCollection = database.getAll({ databaseName: 'race' });
const characterClassesCollection = database.getAll({ databaseName: 'characterClass' });


import Race from "../../../core/js/Race/Race.js";
import CharacterClass from "../../../core/js/CharacterClass/CharacterClass.js";
import PlayerCharacter from "../../../core/js/PlayerCharacter/PlayerCharacter.js";

const generateCharacter = (args) => {
	const nameArgs = args.find((arg) => arg[0] === '--name');
	const raceArgs = args.find((arg) => arg[0] === '--race');
	const characterClassArgs = args.find((arg) => arg[0] === '--class');
	if (!nameArgs || !raceArgs || !characterClassArgs) {
		return { exit: false, result: false, error: 'Missing required arguments. Need --name, --race, and --class' };
	}
	const name = nameArgs[1];
	const raceName = raceArgs[1];
	const characterClassName = characterClassArgs[1];

	const raceId = Race.GetRaceId(raceName);
	if (!raceId) {
		return { exit: false, result: false, error: `"--race" value is not a valid Race.` };
	}

 const characterClassId = CharacterClass.GetCharacterClassId(characterClassName);
	if (!characterClassId) {
		return { exit: false, result: false, error: `"--class" value is not a valid CharacterClass.` };
	}

	const playerCharacter = new PlayerCharacter({ name, race: raceId, characterClass: characterClassId } );
	console.log(JSON.stringify(playerCharacter.abilities));

	return { exit: false, result: playerCharacter };
}

export default generateCharacter;