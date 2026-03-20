export default class StatInventoryUI {
	#dom;

	constructor(dom) {
		this.#dom = dom;
	}

	update(statInventory) {
		[...statInventory.getInventory()].forEach(([item, count]) => {
			const existingDom = this.#dom.querySelector(`li[data-item="${item.description}"]`);
			if (existingDom) {
				if (count === 0) {
					existingDom.remove();
				} else {
					existingDom.querySelector('span').textContent = count;
				}
			} else if (count > 0) {
				const li = document.createElement('li');
				li.dataset.item = item.description;
				const img = document.createElement('img');
				img.src = `img/${item.description}.png`;
				img.alt = item.description;
				const button = document.createElement('button');
				button.classList.add('icon-only');
				button.appendChild(img);
				const span = document.createElement('span');
				span.textContent = count;
				li.appendChild(button);
				li.appendChild(span);
				this.#dom.appendChild(li);
			}
		});
	}
}