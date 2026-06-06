import Database from "../../../core/js/Database/Database.js";

const dbGet = (args) => {
	const db = new Database('./../databases/jsonl');
	const result = db.get({ key: 'id', value: args[0] });
	return { exit: false, result, error: null };
}

export default dbGet;