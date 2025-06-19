import {setButton, setButtons} from "../buttons.js";
import venues from './../../databases/venues.json';
import VenueDb from "../../src/classes/databases/VenueDb/VenueDb.js";
import CarDb from "../../src/classes/databases/CarDb/CarDb.js";

export default class SelectVenue {

	#selectionList;

	constructor() {
		this.#selectionList = document.querySelector('#venue-selection-list ul');

		this.#selectionList.addEventListener('click', this.#onVenueSelect.bind(this));

		VenueDb.setDatabase(JSON.stringify(venues));

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
		} else {
			const selectedVenue = this.#selectionList.querySelector('li.selected');
			if (selectedVenue) {
				selectedVenue.classList.remove('selected');
			}
			venue.classList.add('selected');
			setButton('race', true);
		}
	}
}