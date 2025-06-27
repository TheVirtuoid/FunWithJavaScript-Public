export default class RacingResults {
	#resultsBoard;
	#tbody;

	constructor(elementId) {
		this.#resultsBoard = document.getElementById('race-results');
		this.#tbody = this.#resultsBoard.querySelector('tbody');
		this.#tbody.replaceChildren();
	}

	addRow(car, place, time) {
		const tr = document.createElement('tr');
		let td = document.createElement('td');
		td.textContent = place;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = time;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = car.name;
		tr.appendChild(td);
		this.#tbody.appendChild(tr);
	}
}