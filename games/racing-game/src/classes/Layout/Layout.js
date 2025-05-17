import VenueDb from "../databases/VenueDb/VenueDb.js";
import Track from "../Track/Track.js";

export default class Layout {
	#id;
	#tracks;

	constructor(args = {}) {
		const { tracks = [] } = args;
		this.#id = window?.crypto.randomUUID() || '';
		if (!Array.isArray(tracks)) {
			throw new Error('Layout constructor: tracks must be an array');
		} else if (tracks.some((track) => !(track instanceof Track))) {
			throw new Error('Layout constructor: all elements in tracks must be instances of Track');
		} else if (tracks.length !== 0 && tracks.at(0).type !== Track.STARTING_ANCHOR) {
			throw new Error('Layout constructor: tracks property must begin with a StartingAnchor track');
		} else if (tracks.length !== 0 && tracks.at(-1).type !== Track.ENDING_ANCHOR) {
			throw new Error('Layout constructor: tracks property must end with an EndingAnchor track');
		}
		this.#tracks = [];
		tracks.forEach((track) => {
			this.addTrack(track);
		});
	}

	get id() {
		return this.#id;
	}

	get tracks() {
		return this.#tracks;
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
		if (this.#tracks.length === 0 && track.type !== Track.STARTING_ANCHOR) {
			throw new Error('Layout.addTrack(): First track added must be an Anchor');
		}
		if (this.#tracks.length !== 0) {
			track.connectTo(this.#tracks.at(-1));
		}
		this.#tracks.push(track);
	}

	removeTrack(track) {
		const index = this.#tracks.indexOf(track);
		if (index !== -1) {
			const removedTracks = this.#tracks.splice(index);
			const removedTrack = removedTracks.shift();
			removedTracks.forEach((track) => {
				this.addTrack(track);
			});
			return removedTrack;
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