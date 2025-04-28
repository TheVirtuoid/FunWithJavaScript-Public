let database = [];
import LayoutData from './LayoutData.js';

export default class LayoutDb {
	constructor() {
		throw new Error('Layout is a static class and cannot be instantiated');
	}

	static setDatabase(jsonDatabase) {
		database = JSON.parse(jsonDatabase);
	}

	static getAllLayouts() {
		return database.map((layoutData) => new LayoutData(layoutData));
	}

	static getLayoutById(id) {
		const layoutData = database.find((layout) => layout.id === id);
		return layoutData ? new LayoutData(layoutData) : undefined;
	}

	static getLayoutByName(name) {
		const layoutData = database.find((layout) => layout.name === name);
		return layoutData ? new LayoutData(layoutData) : undefined;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	static getLayout(layoutData) {
		if (layoutData.layout === null) {
			layoutData.getLayout();
		}
	}
}