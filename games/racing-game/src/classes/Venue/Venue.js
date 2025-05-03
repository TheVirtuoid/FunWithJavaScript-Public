import VenueData from "../databases/VenueDb/VenueData.js";
import VenueDb from "../databases/VenueDb/VenueDb.js";

export default class Venue {
	#id;
	#venueId;
	#venue;

	constructor(args = {}) {
		const { id = '', venueId = '' } = args;
		this.#id = id;
		this.#venueId = venueId;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#venue?.name;
	}

	get description() {
		return this.#venue?.description;
	}

	get venueId() {
		return this.#venueId;
	}

	get models() {
		return this.#venue?.models;
	}

	get layout() {
		return this.#venue?.layout;
	}

	getVenue() {
		const venue = VenueDb.getVenueById(this.venueId);
		if (venue === undefined) {
			return undefined;
		}
		venue.loadVenue();
		this.#venue = venue;
		return venue;
	}
}