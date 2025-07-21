import CardUpgradeType from "../enums/CardUpgradeType.js";
import Position from "./Position.js";
import Card from './Card.js';

export default class CardSelect {
	#scene;
	#cards;
	#position;

	constructor(args = {}) {
		const { scene, position } = args;
		this.#scene = scene;
		this.#position = position;
		this.#cards = [];
	}

	build() {
		const { x, y } = this.#position;
		for (let i = 0; i < 3; i++) {
			const levelIndex = Math.random();
			let cardIndex = 0;
			while (cardIndex < 3 && levelIndex > CardUpgradeType.DATABASE[cardIndex].pct) {
				cardIndex++;
			}
			const level = CardUpgradeType.DATABASE[cardIndex].level;
			const cardList = CardUpgradeType.DATABASE[cardIndex].cards;
			const cardData = cardList[Math.floor(Math.random() * cardList.length)];
			const card = new Card({ scene: this.#scene, position: new Position(x + i * 350, y),  ...cardData, level });
			// const card = new CardUi({scene: this, position: new Position(x + i * 350, y), ...cardData, level, parent: this });
			this.#cards.push(card);
		}
	}

	remove() {
		this.#cards.forEach(card => {
			card.remove();
		});
		this.#cards = [];
	}

}