import {setButton, setButtons} from "../buttons.js";
import venues from './../../databases/venues.json';
import VenueDb from "../../src/classes/databases/VenueDb/VenueDb.js";
import GameData from "../../src/classes/databases/GameData/GameData.js";

export default class SelectVenue {

	#selectionList;
	#gameData;

	constructor() {
		this.#selectionList = document.querySelector('#venue-selection-list ul');

		this.#selectionList.addEventListener('click', this.#onVenueSelect.bind(this));

		VenueDb.setDatabase(JSON.stringify(venues));
		this.#gameData = new GameData();

		this.#populateSelectionList();
		setButtons(['back', 'exit']);
	}

	#populateSelectionList() {
		this.#selectionList.replaceChildren();
		const venuePromises = [];
		const venues = VenueDb.getAllVenues();
		venues.forEach((venue) => {
			venuePromises.push(venue.loadVenue());
		});
		Promise.all(venuePromises)
			.then(() => {
				venues.forEach(venue => {
					const button = document.createElement('button');
					button.classList.add('invisible');
					const span = document.createElement('span');
					span.textContent = venue.name;
					button.appendChild(venue.thumbnail);
					button.appendChild(span);
					const li = document.createElement('li');
					li.dataset.venueId = venue.id;
					li.appendChild(button);
					if (this.#gameData.selectedVenue === venue.id) {
						li.classList.add('selected');
					}
					this.#selectionList.appendChild(li);
				});
			})
			.catch((err) => {
				console.log(err);
				console.log('ERROR: Could not load all venues');
			});


	}

	#onVenueSelect(event) {
		const venue = event.target.closest('li');
		if (venue.classList.contains('selected')) {
			venue.classList.remove('selected');
			setButton('race', false);
			this.#gameData.selectedVenue = '';
		} else {
			const selectedVenue = this.#selectionList.querySelector('li.selected');
			if (selectedVenue) {
				selectedVenue.classList.remove('selected');
			}
			venue.classList.add('selected');
			const venueId = venue.dataset.venueId;
			setButton('race', true);
			this.#gameData.selectedVenue = venueId;
		}
	}
}