import {attributes} from "../../../defend-the-orc.config.js";

export default class Panel {
	#entries;

	constructor(args = {}) {
		const { entries } = args;
		this.#entries = new Map();
		const ul = document.querySelector('#panel .entries');
		ul.replaceChildren();
		entries.forEach((entry) => {
			const attr = attributes.get(entry);
			if (attr) {
				const li = document.createElement('li');
				const span = document.createElement('span');
				span.insertAdjacentHTML('afterbegin', `<img src="src/img/panel/${attr.img}" title="${attr.name}" />`);
				li.appendChild(span);
				const zeroSpan = document.createElement('span');
				zeroSpan.classList.add('value');
				zeroSpan.textContent = '0';
				li.appendChild(zeroSpan);
				this.#entries.set(entry, li);
				ul.appendChild(li);
			}
		});
	}

	set(entry, value) {
		if (this.#entries.has(entry)) {
			const valueSpan = this.#entries.get(entry).querySelector('span.value');
			valueSpan.textContent = value;
		}
	}
}