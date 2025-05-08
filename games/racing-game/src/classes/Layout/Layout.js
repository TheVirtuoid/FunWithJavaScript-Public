import VenueDb from "../databases/VenueDb/VenueDb.js";
import Track from "../Track/Track.js";

export default class Layout {
	#id;
	#tracks;

	constructor(args = {}) {
		const { tracks } = args;
		this.#id = window?.crypto.randomUUID() || '';
		if (tracks === undefined) {
			this.#tracks = [];
		} else if (!Array.isArray(tracks)) {
			throw new Error('Layout constructor: tracks must be an array');
		} else if (tracks.some((track) => !(track instanceof Track))) {
			throw new Error('Layout constructor: all elements in tracks must be instances of Track');
		} else {
			this.#tracks = tracks;
		}
	}
	get id() {
		return this.#id;
	}

	getSize() {
		return this.#tracks.length;
	}

	getTrack(trackId) {
		return this.#tracks.find((track) => track.id === trackId);
	}

	addTrack(track) {
		if (!(track instanceof Track)) {
			throw new Error('Layout.addTrack(): Argument must be an instance of Track');
		}
		this.#tracks.push(track);
	}

	removeTrack(track) {
		const index = this.#tracks.indexOf(track);
		if (index !== -1) {
			return this.#tracks.splice(index, 1)[0];
		}
		return undefined;
	}

	removeTrackById(trackId) {
		const track = this.getTrack(trackId);
		if (track) {
			return this.removeTrack(track);
		}
		return undefined;
	}

	clear() {
		this.#tracks = [];
	}
}