import { statsDescription } from '../../../weed-wacker.config.js';

export default class Panel {

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
		stats.forEach((stat) => {
			const li = document.createElement('li');
			const spanName = document.createElement('span');
			const spanData = document.createElement('span');
			spanName.textContent = stat.name;
			spanData.dataset.stat = stat.tag;
			spanData.textContent = stat.value;
			li.classList.add(stat.tag);
			li.append(spanName, spanData);
			statsList.append(li);
			this.#domStats.set(stat.type, spanData);
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
			this.#domStats.set(weed.type, spanData);
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
	}

	setScenes() {
		this.#sceneYard = this.#game.scene.getScene('yard');
		this.#sceneLevelUp = this.#game.scene.getScene('level-up');
	}

	updateStat(type, value) {
		const displayValue = type.description === 'time' ? Math.ceil(value / 1000) : value;
		this.#domStats.get(type).textContent = displayValue;
	}

	updateWeed(type, count) {
		this.#domWeeds.get(type).textContent = count;
	}

	#onNewGame() {
		this.#sceneLevelUp.scene.stop();
		this.#parent.reset();
		this.#sceneYard.newGame(this.#parent.time);
	}

	#onLevelUp() {
		this.#sceneYard.scene.stop();
		this.#sceneLevelUp.setInvetory(this.#parent.getWeedInventory());
		this.#sceneLevelUp.scene.start();
	}
}