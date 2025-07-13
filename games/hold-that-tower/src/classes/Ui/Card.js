import Statistics from "./Statistics.js";
import Position from "../Position.js";
import CardUpgradeType from "../../enums/CardUpgradeType.js";
import GameEvent from "../../enums/GameEvent.js";

export default class Card {
	#scene;
	#position;
	#width = 300;
	#height = 400;
	#level;
	#title;
	#description;
	#parent;

	#parts;

	constructor(args = {}) {
		const { scene, position, level, title, description, parent } = args;
		this.#scene = scene;
		this.#position = position;
		this.#parts = [];
		this.#level = level;
		this.#title = title;
		this.#description = description;
		this.#parent = parent;
	}

	create() {
		let { x, y } = this.#position;
		const w = this.#width;
		const h = this.#height;
		const card = this.#scene.add.rectangle(x, y, w, h, CardUpgradeType.LEVEL_COLORS[this.#level], 1)
			.setOrigin(0, 0)
			.setStrokeStyle(2, 0xffffff);
		x += 10;
		y += 10;
		const title = this.#addTitle(new Position(x, y), this.#title, '0x000000');
		y += title.height + 20;
		const description = this.#addStandardText(new Position(x, y), this.#description, '0x000000');
		y+= description.height + 60;
		const icon = this.#scene.add.image(x + w / 2 - 5, y, 'gun');
		icon.setScale(.1);
		icon.setOrigin(.5, .5);

		const bx = this.#position.x + w / 2 - 45;
		const by = this.#position.y + h - 20;
		const selectedBox = this.#scene.add.rectangle(bx, by, 100, 40, 0x000000, 1).setOrigin(0, 0).setStrokeStyle(2, 0xffffff);
		const selectedText = this.#addStandardFreeText(new Position(bx + 19, by + 5), 'Select', '#ffffff');
		selectedBox.setInteractive();
		selectedBox.once('pointerdown', () => {
			GameEvent.Emit(GameEvent.CARD_SELECTED, this.#parent);
		});
		this.#parts.push(card, title, description, icon, selectedBox, selectedText);
	}

	remove() {
		this.#parts.forEach(part => {
			part.destroy();
		});
		this.#parts = [];
	}

	#addTitle(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '50px',
			fill: color,
			fixedWidth: this.#width - 20,
			wordWrap: { width: this.#width - 20, useAdvancedWrap: true },
			align: 'center'
		});
	}

	#addLargeText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '30px',
			fill: color
		});
	}

	#addStandardText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '24px',
			fixedWidth: this.#width - 20,
			fill: color,
			wordWrap: { width: this.#width - 20 },
			align: 'center'
		});
	}

	#addStandardFreeText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '24px',
			fill: color
		});
	}

}