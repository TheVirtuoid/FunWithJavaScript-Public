import Phaser from 'phaser';
import {DURABILITY, levels as levelData, TIME, weeds} from './../../../weed-wacker.config.js';

export default class LevelUp extends Phaser.Scene {

	static NO_INVENTORY = Symbol('no-inventory');
	static GOT_INVENTORY = Symbol('got-inventory');
	static MAX_LEVEL = Symbol('max-level');


	#width = 200;
	#height = 320;
	#gap = 50;
	#fontFamily = `"Press Start 2P"`;

	#centerX;
	#centerY;
	#hw;
	#hh;
	#hg;
	#db;
	#shift;
	#startingX;
	#startingY;
	#offsetX;
	#offsetY;

	#inventory;
	#levels;
	#values;

	#containers = new Map();

	constructor() {
		super({
			key: 'level-up'
		});
		this.reset();
	}

	setInventory(inventory) {
		this.#inventory = inventory;
	}

	setValues(values) {
		this.#values = values;
	}

	get levels() {
		return this.#levels;
	}

	preload() {}

	create() {
		this.#centerX = this.scale.width / 2;
		this.#centerY = this.scale.height / 2;
		this.add.tileSprite(this.#centerX, this.#centerY, this.scale.width, this.scale.height, 'grass');
		this.#hw = this.#width / 2;
		this.#hh = this.#height / 2;
		this.#hg = this.#gap / 2;
		this.#db = this.#width + this.#gap;
		this.#shift = this.#hg + this.#hw;
		this.#startingX = this.#centerX - 2 * this.#db - this.#shift;
		this.#startingY = this.#centerY;
		this.#offsetX = this.#width + this.#gap;
		this.#offsetY = 0;

		this.#levels.forEach((levelData, key) => {
			const value = this.#values.get(key);
			const position = levelData.position;
			const nextLevel = levelData.levels[0];
			const container = this.#drawBox({ key, value, inventory: this.#inventory, position, nextLevel });
			this.#containers.set(key, container);
		});

		this.events.on('update-boxes', this.#updateBoxes.bind(this));
	}

	reset() {
		this.#levels = new Map();
		levelData.forEach((keyData, key) => {
			const entry = { ...keyData };
			entry.levels = [];
			for (const levelData of keyData.levels) {
				const data = {...levelData}
				data.cost = new Map();
				levelData.cost.forEach((value, key) => data.cost.set(key, value));
				entry.levels.push(data);
			}
			this.#levels.set(key, entry);
		});
	}

	#drawBox(args = {}) {
		const { key, value, inventory, position, nextLevel } = args
		const data = this.#levels.get(key);
		const levelData = data.levels[0];
		const canWeUpgrade = this.#compareInventory(inventory, nextLevel);
		const fillAlpha = canWeUpgrade === LevelUp.GOT_INVENTORY ? 1 : .25;
		const x = this.#startingX + position * this.#offsetX;
		const y = this.#startingY + position * this.#offsetY;
		const { weedImages, weedImageText, newValue, increaseText } = this.#buildBox({ nextLevel: levelData, key, value, canWeUpgrade });
		const backgroundBox = this.add.rectangle(0, 0, this.#width, this.#height, 0x000000);
		const box = this.add.rectangle(0, 0, this.#width, this.#height, data.activeFill, fillAlpha);
		const titleText = this.add.text(0 - this.#hw + 2, 0 - this.#hh + 2, data.title, { fontSize: '18px', fill: '#000000', fontFamily: this.#fontFamily, fontStyle: 'bold' });
		const boxImage = this.add.image(0, 0 - this.#hh / 4, data.graphic);
		const upgradeText = this.add.text(0 - this.#hw + 10, this.#hh / 3, increaseText, { fontSize: '14px', fill: '#000000', fontFamily: this.#fontFamily, wordWrap: { width: this.#width - 20 }  });
		box.name = data.key;
		box.setData('data', { ...data, newValue, levelData });
		if (canWeUpgrade === LevelUp.GOT_INVENTORY) {
			box.setInteractive();
			box.on('pointerover', this.#onPointerOver);
			box.on('pointerout', this.#onPointerOut);
			box.on('pointerdown', this.#onPointerDown);
		}
		box.setName('box');
		upgradeText.setName('upgradeText');
		return this.add.container(x, y, [backgroundBox, box, titleText, boxImage, upgradeText, ...weedImages, ...weedImageText]);
	}

	#updateBoxes(args = {}) {
		const { key, value } = args;
		this.#containers.forEach((container, containerKey) => {
			// const data = this.#levels.get(key);
			const data = this.#levels.get(containerKey);
			const nextLevel = data.levels[0];
			let box;
			let upgradeText;
			container.getAll().forEach((containerObject) => {
				if (containerObject.name === 'box') {
					box = containerObject;
				}
				if (containerObject.name === 'upgradeText') {
					upgradeText = containerObject;
				}
				if (containerKey === key) {
					if (containerObject.name.startsWith('text-') || containerObject.name.startsWith('weed-')) {
						container.remove(containerObject, true);
					}
				}
			});
			const canWeUpgrade = this.#compareInventory(this.#inventory, nextLevel);
			if (containerKey === key) {
				const { weedImages, weedImageText, newValue, increaseText } = this.#buildBox({ nextLevel, key, value, canWeUpgrade });
				upgradeText.text = increaseText;
				container.add([...weedImages, ...weedImageText]);
			}
			box.fillAlpha = canWeUpgrade === LevelUp.GOT_INVENTORY ? 1 : .25;
			if (canWeUpgrade !== LevelUp.GOT_INVENTORY) {
				box.off('pointerover');
				box.off('pointerout');
				box.off('pointerdown');
			}
		});
	}

	#buildBox(args = {}) {
		const { value, key, nextLevel, canWeUpgrade } = args;
		const weedImages = [];
		const weedImageText = [];
		let increaseText;
		let newValue;
		if (canWeUpgrade !== LevelUp.MAX_LEVEL) {
			if (key === DURABILITY) {
				newValue = value + nextLevel.adjustment;
			} else {
				newValue = value + value * nextLevel.adjustment;
			}
			if (key === TIME) {
				increaseText = `(${Math.ceil(value / 1000)}s -> ${Math.ceil(newValue / 1000)}s)`;
			} else {
				increaseText = `(${Math.ceil(value)} -> ${Math.ceil(newValue)})`;
			}
			increaseText = `${nextLevel.text}\n\n${increaseText}`
			let index = 0;
			nextLevel.cost.forEach((count, type) => {
				const weedData = weeds.get(type);
				const weedImage = this.add.image(0 - this.#hw + 10 + index * 55, this.#hh / 3 + 70, weedData.name);
				weedImage.setOrigin(0);
				weedImage.setScale(0.4);
				weedImage.setName(`weed-${weedData.name}`);
				weedImages.push(weedImage);
				const weedText = this.add.text(0 - this.#hw + 35 + index * 55, this.#hh / 3 + 80, `${count}`, {
					fontSize: '12px',
					fill: '#000000',
					fontFamily: this.#fontFamily
				});
				weedText.setName(`text-${weedData.name}`);
				weedImageText.push(weedText);
				index++;
			});
		} else {
			newValue = Number.POSITIVE_INFINITY;
			increaseText = 'MAX LEVEL';
		}
		return { weedImages, weedImageText, newValue, increaseText }
	}

	#onPointerOver() {
		const scene = this.scene;
		const { key, highlightFill } = this.getData('data');
		const container = scene.#containers.get(key);
		this.setFillStyle(highlightFill);
		scene.input.setDefaultCursor('pointer');
	}

	#onPointerOut() {
		const scene = this.scene;
		const { key, activeFill } = this.getData('data');
		const container = scene.#containers.get(key);
		this.setFillStyle(activeFill);
		scene.input.setDefaultCursor('default');
	}

	#onPointerDown() {
		const scene = this.scene;
		const { key, activeFill, newValue, levelData } = this.getData('data');
		const container = scene.#containers.get(key);
		this.setFillStyle(activeFill);
		scene.input.setDefaultCursor('default');
		const targetLevel = scene.levels.get(key);
		targetLevel.levels.shift();
		scene.levels.set(key, targetLevel);
		scene.sys.game.events.emit('on-level-up', { key, value: newValue, cost: levelData.cost });
	}

	#compareInventory(inventory, nextLevel) {
		if (!nextLevel) {
			return LevelUp.MAX_LEVEL;
		}
		let gotInventory = LevelUp.GOT_INVENTORY;
		nextLevel.cost.forEach((value, weedType) => {
			if (value > inventory.get(weedType)) {
				gotInventory = LevelUp.NO_INVENTORY;
			}
		});
		return gotInventory;
	}

}