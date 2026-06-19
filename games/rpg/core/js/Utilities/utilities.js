import {readFileSync} from "fs";

const validateUUID = (data) => {
	return typeof data === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data);
}

const readSchemaProperties = (schemaPath) => {
	const schemaData = JSON.parse(readFileSync(schemaPath, 'utf-8'));
	return Object.keys(schemaData.properties).map((key) => {
		return { key, type: schemaData.properties[key].type }
	});
}

export { validateUUID, readSchemaProperties };