let database = [];
import VenueData from './VenueData.js';

export default class VenueDb {
	constructor() {
		throw new Error('VenueDb is a static class and cannot be instantiated');
	}

	static setDatabase(jsonDatabase) {
		database = JSON.parse(jsonDatabase);
	}

	static getAllVenues() {
		return database.map((venueData) => new VenueData(venueData));
	}

	static getVenueById(id) {
		const venueData = database.find((venue) => venue.id === id);
		return venueData ? new VenueData(venueData) : undefined;
	}

	static getVenueByName(name) {
		const venueData = database.find((venue) => venue.name === name);
		return venueData ? new VenueData(venueData) : undefined;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	static loadVenue(venueData) {
		if (venueData.models === undefined) {
			venueData.loadVenue();
		}
	}
}