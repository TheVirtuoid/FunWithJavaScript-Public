const idDatabase = new Map();
const nameDatabase = new Map();
let json;
import VenueData from './VenueData.js';

export default class VenueDb {
	constructor() {
		throw new Error('VenueDb is a static class and cannot be instantiated');
	}

	static setDatabase(jsonDatabase) {
		json = JSON.parse(jsonDatabase);
		json.forEach((venueData) => {
			const venue = new VenueData(venueData);
			idDatabase.set(venue.id, venue);
			nameDatabase.set(venue.name, venue);
		});
	}

	static getAllVenues() {
		return [...idDatabase.values()];
	}

	static getVenueById(id) {
		return idDatabase.get(id);
	}

	static getVenueByName(name) {
		return nameDatabase.get(name);
	}

	static loadVenue(venue) {
		return venue.loadVenue();
	}
}