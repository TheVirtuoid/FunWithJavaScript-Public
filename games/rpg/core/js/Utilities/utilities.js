import {readFileSync} from "fs";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const validateUUID = (data) => {
	return typeof data === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data);
}

const readSchemaProperties = (schemaPath) => {
	const resolvedPath = resolve(__dirname, './../../..', schemaPath); // this is so we can use relative paths
	const schemaData = JSON.parse(readFileSync(resolvedPath, 'utf-8'));
	return Object.keys(schemaData.properties).map((key) => {
		return { key, type: schemaData.properties[key].type }
	});
}

export { validateUUID, readSchemaProperties };