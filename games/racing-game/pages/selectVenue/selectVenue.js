import {setButton, setButtons} from "../buttons.js";

const venues = [
	{id: 1, name: 'Venue 1'},
	{id: 2, name: 'Venue 2'},
	{id: 3, name: 'Venue 3'}
]
export default class SelectVenue {

	#selectionList;

	constructor() {
		this.#selectionList = document.querySelector('#venue-selection-list ul');

		this.#selectionList.addEventListener('click', this.#onVenueSelect.bind(this));
		this.#populateSelectionList();
		setButtons(['back', 'exit']);
	}

	#populateSelectionList() {
		this.#selectionList.replaceChildren();
		venues.forEach(venue => {
			const button = document.createElement('button');
			button.textContent = venue.name;
			const li = document.createElement('li');
			li.dataset.venueId = venue.id;
			li.appendChild(button);
			this.#selectionList.appendChild(li);
		});
	}

	#onVenueSelect(event) {
		if (event.target.tagName === 'BUTTON') {
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
}