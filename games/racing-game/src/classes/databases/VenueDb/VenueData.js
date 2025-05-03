import venueData from "./VenueDb.js";

export default class VenueData {
	#id;
	#name;
	#description;
	#url;
	#blueprint;

	constructor(args = {}) {
		const { id = '', name = '', description = '', url = '' } = args;
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#url = url;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get url() {
		return this.#url;
	}

	get models() {
		return this.#blueprint?.models;
	}

	get layout() {
		return this.#blueprint?.layout;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	loadVenue() {
		this.#blueprint = {
			models: null,
			layout: null
		}
	}
}