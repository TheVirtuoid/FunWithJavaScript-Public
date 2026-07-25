import Phaser from 'phaser';

export default class LevelUp extends Phaser.Scene {

	static LEVELS = {
		'time': {
			title: 'Time',
			graphic: 'level-time',
			activeFill: 0xffbbbb,
			highlightFill: 0xffdddd,
			levels: [
				{ text: 'Increase time by 30%', adjustment: 0.3, cost: [1, 0, 0, 0, 0, 0] },
				{ text: 'Increase time by 50%', adjustment: 0.5, cost: [4, 0, 0, 0, 0, 0] },
				{ text: 'Increase time by 50%', adjustment: 0.5, cost: [8, 2, 0, 0, 0, 0] },
			]
		}
	}

	#boxTime;
	#boxPower;
	#boxSpeed;
	#boxRange;
	#boxDurability;
	#boxSpawnRate;

	#levelTime = 0;

	#width = 200;
	#height = 300;
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


	constructor() {
		super({
			key: 'level-up'
		});
		this.#levels = structuredClone(LevelUp.LEVELS);
	}

	setInvetory(inventory) {
		this.#inventory = inventory;
	}

	preload() {
		this.load.image('level-time', '/src/img/level-time.png');
	}

	create() {
		this.#centerX = this.scale.width / 2;
		this.#centerY = this.scale.height / 2;
		this.#hw = this.#width / 2;
		this.#hh = this.#height / 2;
		this.#hg = this.#gap / 2;
		this.#db = this.#width + this.#gap;
		this.#shift = this.#hg + this.#hw;
		this.#startingX = this.#centerX - 2 * this.#db - this.#shift;
		this.#startingY = this.#centerY;
		this.#offsetX = this.#startingX + this.#width + this.#gap;
		this.#offsetY = 0;

		const name = 'time';
		const value = 15;
		const level = 0;
		const position = 0;
		this.#drawBox({ name, value, level, inventory: this.#inventory, position });

		this.events.on('got-level-data', (levelData) => {
			// console.log('got level data from the game', levelData);
		})


		//this.#boxTime = this.add.rectangle(centerX - 2 * db - shift, centerY, this.#width, this.#height, timeData.activeFill);
		/*this.#boxPower = this.add.rectangle(centerX - 1 * db - shift, centerY, this.#width, this.#height, 0xbbffbb);
		this.#boxSpeed = this.add.rectangle(centerX - shift, centerY, this.#width, this.#height, 0xbbbbff);
		this.#boxRange = this.add.rectangle(centerX + shift, centerY, this.#width, this.#height, 0xffbbff, .25);
		this.#boxDurability = this.add.rectangle(centerX + 1 * db + shift, centerY, this.#width, this.#height, 0xbbffff, .25);
		this.#boxSpawnRate = this.add.rectangle(centerX + 2 * db + shift, centerY, this.#width, this.#height, 0xffffbb, .25);*/

		/*this.add.text(centerX - 2 * db - shift - hw, centerY - hh + 2, timeData.title, { fontSize: '20px', fill: '#000000', fontFamily: '"Press Start 2P"', fontStyle: 'bold' });
		this.add.image(centerX - 2 * db - shift, centerY - hh / 4, timeData.graphic);

		this.add.text(centerX - 2 * db - shift - hw + 10, centerY + hh / 3, 'Increase time by 50%\n\n(15s -> 22s)', { fontSize: '14px', fill: '#000000', fontFamily: '"Press Start 2P"', wordWrap: { width: this.#width - 20 }  });
*/


		/*this.#boxTime.setInteractive();
		this.#boxTime.on('pointerover', () => {
			this.#boxTime.setFillStyle(timeData.highlightFill);
			this.input.setDefaultCursor('pointer');
		});
		this.#boxTime.on('pointerout', () => {
			this.#boxTime.setFillStyle(timeData.activeFill);
			this.input.setDefaultCursor('default');
		});
		this.#boxTime.on('pointerdown', () => {
			this.#boxTime.setFillStyle(timeData.activeFill);
			this.input.setDefaultCursor('default');
		});*/
	}

	update(time, delta) {
	}

	#drawBox(args = {}) {
		const { name, value, inventory, position } = args
		const data = this.#levels[name];
		const levelData = data.levels[0];
		const gotInventory = !inventory.some((number, index) => number < levelData.cost[index]);
		const fillAlpha = gotInventory ? 1 : .25;
		const x = this.#startingX + position * this.#offsetX;
		const y = this.#startingY + position * this.#offsetY;
		const newValue = value + value * levelData.adjustment;
		const increaseText = `(${Math.floor(value)}s -> ${Math.floor(newValue)}s)`;
		/*const box = this.add.rectangle(this.#centerX - 2 * this.#db - this.#shift, this.#centerY, this.#width, this.#height, data.activeFill, fillAlpha);
		this.add.text(this.#centerX - 2 * this.#db - this.#shift - this.#hw, this.#centerY - this.#hh + 2, data.title, { fontSize: '20px', fill: '#000000', fontFamily: this.#fontFamily, fontStyle: 'bold' });
		this.add.image(this.#centerX - 2 * this.#db - this.#shift, this.#centerY - this.#hh / 4, data.graphic);
		this.add.text(this.#centerX - 2 * this.#db - this.#shift - this.#hw + 10, this.#centerY + this.#hh / 3, 'Increase time by 50%\n\n(15s -> 22s)', { fontSize: '14px', fill: '#000000', fontFamily: this.#fontFamily, wordWrap: { width: this.#width - 20 }  });*/
		const box = this.add.rectangle(x, y, this.#width, this.#height, data.activeFill, fillAlpha);
		this.add.text(x - this.#hw, y - this.#hh + 2, data.title, { fontSize: '20px', fill: '#000000', fontFamily: this.#fontFamily, fontStyle: 'bold' });
		this.add.image(x, y - this.#hh / 4, data.graphic);
		this.add.text(x - this.#hw + 10, y + this.#hh / 3, `${levelData.text}\n\n${increaseText}`, { fontSize: '14px', fill: '#000000', fontFamily: this.#fontFamily, wordWrap: { width: this.#width - 20 }  });
		if (gotInventory) {
			box.setInteractive();
			box.on('pointerover', () => {
				box.setFillStyle(data.highlightFill);
				this.input.setDefaultCursor('pointer');
			});
			box.on('pointerout', () => {
				box.setFillStyle(data.activeFill);
				this.input.setDefaultCursor('default');
			});
			box.on('pointerdown', () => {
				box.setFillStyle(data.activeFill);
				this.input.setDefaultCursor('default');
				this.#levels[name].levels.shift();
				this.sys.game.events.emit('level-up', { field: 'time', value: newValue, cost: levelData.cost });
			});
		}
		return box;
	}

	#onPointOver() {
		box.setFillStyle(data.highlightFill);
		this.input.setDefaultCursor('pointer');
	}

}