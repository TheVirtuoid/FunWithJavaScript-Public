import Database from "../core/js/Database/Database.js";
import config from "./../config.json" with { type: 'json' };

const databasePath = config.database.path;
const database = new Database(databasePath);

const databaseList = [
	'abilities',
	'ability-bonus-adjustment',
	'armor',
	'attributes',
	'characterClass',
	'equipment',
	'money',
	'race',
	'restrictions',
	'weapon'
];

databaseList.forEach((databaseName) => {
	const collection = database.getAll({ databaseName });
	collection.forEach((item) => {
		const idData = database.get({ key: 'id', value: item.id });
		const nameData = database.get({ key: 'name', value: item.name });
	});
	console.log(`${databaseName} verified.`);
});

