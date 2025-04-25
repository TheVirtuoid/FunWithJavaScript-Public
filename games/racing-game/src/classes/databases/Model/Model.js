let database = [];
import ModelData from './ModelData.js';

export default class Model {
	constructor() {
		throw new Error('Model is a static class and cannot be instantiated');
	}

	static setDatabase(jsonDatabase) {
		database = JSON.parse(jsonDatabase);
	}

	static getAllModels() {
		return database.map((modelData) => new ModelData(modelData));
	}

	static getModelById(id) {
		const modelData = database.find((model) => model.id === id);
		return modelData ? new ModelData(modelData) : undefined;
	}

	static getModelByName(name) {
		const modelData = database.find((model) => model.name === name);
		return modelData ? new ModelData(modelData) : undefined;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	static getModel(modelData) {
		if (modelData.model === null) {
			modelData.getModel();
		}
	}
}