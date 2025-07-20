import Statistics from "./Statistics.js";
import GameEvent from "../../enums/GameEvent.js";

export default class UpgradeButton {
	#limit;
	#amount;
	#scene;
	#position;
	#button;
	#buttonText;
	#type;
	#selectable = false;

	constructor(args = {}) {
		const { scene, limit, position, type } = args;
		this.#scene = scene;
		this.#limit = limit;
		this.#position = position;
		this.#amount = 0;
		this.#type = type;
		this.#build();
	}

	get button() {
		return this.#button;
	}

	get buttonText() {
		return this.#buttonText;
	}

	get type() {
		return this.#type;
	}

	get limit() {
		return this.#limit;
	}

	get selectable() {
		return this.#selectable;
	}

	#build() {
		const text = this.#limit.toString();
		const { x, y } = this.#position;
		const backgroundColor = this.#setBackgroundColor(0);
		const foregroundColor = this.#setForegroundColor(0);
		const lineColor = this.#setBorderColor(0);

		const renderedText = this.#addSmallText(this.#position, this.#limit, foregroundColor);
		const { width: textWidth, height: textHeight } = renderedText.getBounds();
		renderedText.destroy();

		const gx = x - Statistics.PADDING * .5;
		const gy = y - Statistics.PADDING * .5;
		const gw = textWidth + Statistics.PADDING;
		const gh = textHeight + Statistics.PADDING;

		this.#button = this.#scene.add.rectangle(
			gx,
			gy,
			gw,
			gh,
			backgroundColor,
			1
		)
			.setOrigin(0, 0)
			.setStrokeStyle(2, lineColor);
		this.#button.setInteractive();
		this.#buttonText = this.#addSmallText(this.#position, this.#limit, foregroundColor);
		this.#button.on('pointerdown', () => {
			if (this.#selectable) {
				GameEvent.Emit(GameEvent.UPDATE_SELECTED, this);
			}
		});
		this.#selectable = false;
	}

	setLimit(value) {
		this.#limit = value;
		this.#buttonText.setText(value);
		this.update(0);
	}

	update(amount) {
		this.#amount = amount;
		this.#button.setFillStyle(this.#setBackgroundColor(this.#amount));
		this.#button.setStrokeStyle(2, this.#setBorderColor(this.#amount));
		this.#buttonText.setFill(this.#setForegroundColor(this.#amount));
		this.#selectable = this.#amount >= this.#limit;
	}

	setPosition(position) {
		this.#position = position;
		this.#button.setPosition(this.#position.x - Statistics.PADDING * .5, this.#position.y - Statistics.PADDING * .5);
		this.#buttonText.setPosition(this.#position.x, this.#position.y);
	}

	#setForegroundColor(amount) {
		return amount < this.#limit ? '#666666' : '#ffffff';
	}

	#setBackgroundColor(amount) {
		return amount < this.#limit ? 0x660000 : 0x006600;
	}

	#setBorderColor(amount) {
		return amount < this.#limit ? 0x666666 : 0xffffff;
	}

	#addSmallText(position, text, color = '#ffffff') {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '10px',
			fill: color
		});
	}

}