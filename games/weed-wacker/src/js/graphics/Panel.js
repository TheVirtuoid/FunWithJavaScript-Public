import {TIME} from "../../../weed-wacker.config.js";
import Panel from "../engine/Panel.js";

export default class PanelUI {

	#domStats = new Map();
	#domWeeds = new Map();
	#domLevelUp;
	#domContinue;
	#domNewGame;
	#parent;
	#game;

	#sceneYard;
	#sceneLevelUp;

	constructor(args = {}) {
		const { stats, weeds, parent } = args;
		this.#parent = parent;
		this.#game = parent.game;

		const statsList = document.querySelector('.stats ul');
		stats.forEach((stat, type) => {
			const li = document.createElement('li');
			const spanName = document.createElement('span');
			const spanData = document.createElement('span');
			spanName.textContent = stat.name;
			spanData.dataset.stat = stat.tag;
			spanData.textContent = stat.value;
			li.classList.add(stat.tag);
			li.append(spanName, spanData);
			statsList.append(li);
			this.#domStats.set(type, spanData);
		});

		const weedList = document.querySelector('.weeds ul');
		weeds.forEach((weed) => {
			const li = document.createElement('li');
			const spanText = document.createElement('span');
			const spanData = document.createElement('span');
			const img = document.createElement('img');
			img.src = weed.image;
			spanText.appendChild(img);
			spanData.dataset.name = weed.name;
			spanData.textContent = weed.count;
			li.append(spanText, spanData);
			// this.#domStats.set(weed.type, spanData);
			weedList.append(li);
			this.#domWeeds.set(weed.type, spanData);
		});

		const actionButtons = document.querySelector('.action-buttons');
		this.#domLevelUp = document.createElement('button');
		this.#domLevelUp.textContent = 'Level Up';
		this.#domLevelUp.id = 'level-up';
		actionButtons.append(this.#domLevelUp);
		this.#domContinue = document.createElement('button');
		this.#domContinue.textContent = 'Continue';
		this.#domContinue.id = 'continue';
		actionButtons.append(this.#domContinue);
		this.#domNewGame = document.createElement('button');
		this.#domNewGame.textContent = 'New Game';
		this.#domNewGame.id = 'new-game';
		actionButtons.append(this.#domNewGame);

		this.#domNewGame.addEventListener('click', this.#onNewGame.bind(this));
		this.#domLevelUp.addEventListener('click', this.#onLevelUp.bind(this));
		this.#domContinue.addEventListener('click', this.#onContinue.bind(this));
	}

	setScenes() {
		this.#sceneYard = this.#game.scene.getScene('yard');
		this.#sceneLevelUp = this.#game.scene.getScene('level-up');
	}

	updateStat(type, value) {
		const adjustedValue = type === TIME ? Math.ceil(value / 1000) : Math.max(0, value);
		let displayValue;
		if (+adjustedValue.toFixed(2) == Math.round(adjustedValue)) {
			displayValue = adjustedValue.toFixed(0);
		} else if (adjustedValue < 10) {
			displayValue = adjustedValue.toFixed(2);
		} else if (adjustedValue < 100) {
			displayValue = adjustedValue.toFixed(1);
		} else {
			displayValue = adjustedValue.toFixed(0);
		}
		this.#domStats.get(type).textContent = displayValue;
	}

	updateWeed(type, count) {
		this.#domWeeds.get(type).textContent = count;
	}

	setState(state) {
		switch (state) {
			case Panel.STATE_START:
				this.#domLevelUp.disabled = true;
				this.#domContinue.disabled = true;
				this.#domNewGame.disabled = false;
				break;
			case Panel.STATE_LEVEL_UP:
				this.#domLevelUp.disabled = true;
				this.#domContinue.disabled = false;
				this.#domNewGame.disabled = false;
				break;
			case Panel.STATE_IN_ROUND:
				this.#domLevelUp.disabled = true;
				this.#domContinue.disabled = true;
				this.#domNewGame.disabled = true;
				break;
			case Panel.STATE_TIME_UP:
				this.#domLevelUp.disabled = false;
				this.#domContinue.disabled = false;
				this.#domNewGame.disabled = false;
				break;
			case Panel.STATE_GAME_OVER:
				this.#domLevelUp.disabled = true;
				this.#domContinue.disabled = true;
				this.#domNewGame.disabled = false;
				break;
		}
	}

	#onNewGame() {
		this.#parent.onNewGame();
	}

	#onLevelUp() {
		this.#parent.onLevelUp();
	}

	#onContinue() {
		this.#parent.onContinueGame();
	}
}