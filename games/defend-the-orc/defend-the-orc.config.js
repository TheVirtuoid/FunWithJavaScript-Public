const GARZ = Symbol('garz');
const THOKK = Symbol('thokk');
const VORG = Symbol('vorg');

const DAREK = Symbol('darek');
const GARETH = Symbol('gareth');
const MALAKOR = Symbol('makor');
const MOROS = Symbol('moros');
const ORLOK = Symbol('orlok');
const TORIN = Symbol('torin');

const ATTACK = Symbol('attack');
const DEATH = Symbol('death');
const HURT = Symbol('hurt');
const IDLE = Symbol('idle');
const RUN = Symbol('run');
const RUN_ATTACK = Symbol('run-attack');
const WALK = Symbol('walk');
const WALK_ATTACK = Symbol('walk-attack');

const UP = Symbol('up');
const DOWN = Symbol('down');
const LEFT = Symbol('left');
const RIGHT = Symbol('right');

const CONTROLLER_RUN = 2;
const CONTROLLER_ATTACK = 7;

const HIT_POINTS = Symbol('hit-points');
const STAMINA = Symbol('stamina');
const DAMAGE = Symbol('damage');

const attributes = new Map([
	[HIT_POINTS, { name: 'Hit points' }],
	[STAMINA, { name: 'Stamina' }],
	[DAMAGE, { name: 'Damage' }],
]);

const isAttribute = (key) => [...attributes.keys()].includes(key);

const swordsmen = new Map([
	[DAREK, {	path: 'src/img/enemies/Darek' }],
	[GARETH, {	path: 'src/img/enemies/Gareth' }],
	[TORIN, {	path: 'src/img/enemies/Torin' }]
]);

const vampires = new Map([
	[MALAKOR, {	path: 'src/img/enemies/Malakor' }],
	[MOROS, {	path: 'src/img/enemies/Moros' }],
	[ORLOK, {	path: 'src/img/enemies/Orlok' }]
]);

const swordsmanAnimation = new Map([
	[ATTACK,
		{ img: 'attack.png',
			repeat: 0,
			frameRate: 16,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 24, end: 31 }],
				[LEFT, { start: 8, end: 15 }],
				[RIGHT, { start: 16, end: 23 }],
			])
		}],
	[DEATH,
		{ img: 'death.png',
			repeat: 0,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 7,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 6 }],
				[UP, { start: 21, end: 27 }],
				[LEFT, { start: 7, end: 13 }],
				[RIGHT, { start: 14, end: 20 }],
			])
		}],
	[HURT,
		{ img: 'hurt.png',
			repeat: 0,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 5,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 4 }],
				[UP, { start: 15, end: 19 }],
				[LEFT, { start: 5, end: 9 }],
				[RIGHT, { start: 10, end: 14 }],
			])
		}],
	[IDLE,
		{ img: 'idle.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 12,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 11 }],
				[UP, { start: 36, end: 39 }],
				[LEFT, { start: 12, end: 23 }],
				[RIGHT, { start: 24, end: 35 }],
			])
		}],
	[RUN,
		{ img: 'run.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 24, end: 31 }],
				[LEFT, { start: 8, end: 15 }],
				[RIGHT, { start: 16, end: 23 }],
			])
		}],
	[WALK,
		{ img: 'walk.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 6,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 5 }],
				[UP, { start: 18, end: 23 }],
				[LEFT, { start: 6, end: 11 }],
				[RIGHT, { start: 12, end: 17 }],
			])
		}],
]);

const vampireAnimation = new Map([
	[ATTACK,
		{ img: 'attack.png',
			repeat: 0,
			frameRate: 16,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 12,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 11 }],
				[UP, { start: 12, end: 23 }],
				[LEFT, { start: 24, end: 25 }],
				[RIGHT, { start: 36, end: 47 }],
			])
		}],
	[DEATH,
		{ img: 'death.png',
			repeat: 0,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 10,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 9 }],
				[UP, { start: 10, end: 19 }],
				[LEFT, { start: 20, end: 29 }],
				[RIGHT, { start: 30, end: 39 }],
			])
		}],
	[HURT,
		{ img: 'hurt.png',
			repeat: 0,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 4,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 3 }],
				[UP, { start: 4, end: 7 }],
				[LEFT, { start: 8, end: 11 }],
				[RIGHT, { start: 12, end: 15 }],
			])
		}],
	[IDLE,
		{ img: 'idle.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 4,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 3 }],
				[UP, { start: 4, end: 7 }],
				[LEFT, { start: 8, end: 11 }],
				[RIGHT, { start: 12, end: 15 }],
			])
		}],
	[RUN,
		{ img: 'run.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 8, end: 15 }],
				[LEFT, { start: 16, end: 23 }],
				[RIGHT, { start: 24, end: 31 }],
			])
		}],
	[WALK,
		{ img: 'walk.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 6,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 5 }],
				[UP, { start: 6, end: 11 }],
				[LEFT, { start: 12, end: 17 }],
				[RIGHT, { start: 18, end: 23 }],
			])
		}],
]);

const orcs = new Map([
	[GARZ, {
		path: 'src/img/orcs/Garz',
		collisionZones: {
			UP: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
			DOWN: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
			LEFT: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
			RIGHT: { width: 0, height: 0, offsetX: 0, offsetY: 0 }
			}
		}
	],
	[THOKK, {
		path: 'src/img/orcs/Thokk',
		collisionZones: {
			UP: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
			DOWN: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
			LEFT: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
			RIGHT: { width: 0, height: 0, offsetX: 0, offsetY: 0 }
		}
	}
	],
	[VORG, {
		path: 'src/img/orcs/Vorg',
		collisionZones: {
			UP: { width: 32, height: 37, offsetX: 16, offsetY: 13 },
			DOWN: { width: 30, height: 38, offsetX: 16, offsetY: 11 },
			LEFT: { width: 27, height: 38, offsetX: 21, offsetY: 10 },
			RIGHT: { width: 28, height: 37, offsetX: 15, offsetY: 12 }
		}
	}
	],
]);

const orcAnimation = new Map([
	[ATTACK,
		{ img: 'attack.png',
			repeat: 0,
			frameRate: 16,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 8, end: 15 }],
				[LEFT, { start: 16, end: 23 }],
				[RIGHT, { start: 24, end: 31 }],
			])
		}],
	[DEATH,
		{ img: 'death.png',
			repeat: 0,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 8, end: 15 }],
				[LEFT, { start: 16, end: 23 }],
				[RIGHT, { start: 24, end: 31 }],
			])
		}],
	[HURT,
		{ img: 'hurt.png',
			repeat: 0,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 6,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 5 }],
				[UP, { start: 6, end: 11 }],
				[LEFT, { start: 12, end: 17 }],
				[RIGHT, { start: 18, end: 23 }],
			])
		}],
	[IDLE,
		{ img: 'idle.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 4,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 3 }],
				[UP, { start: 4, end: 7 }],
				[LEFT, { start: 8, end: 11 }],
				[RIGHT, { start: 12, end: 15 }],
			])
		}],
	[RUN,
		{ img: 'run.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 8, end: 15 }],
				[LEFT, { start: 16, end: 23 }],
				[RIGHT, { start: 24, end: 31 }],
			])
		}],
	[RUN_ATTACK,
		{ img: 'run_attack.png',
			repeat: 0,
			frameRate: 16,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 8,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 7 }],
				[UP, { start: 8, end: 15 }],
				[LEFT, { start: 16, end: 23 }],
				[RIGHT, { start: 24, end: 31 }],
			])
		}],
	[WALK,
		{ img: 'walk.png',
			repeat: -1,
			frameRate: 8,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 6,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 5 }],
				[UP, { start: 6, end: 11 }],
				[LEFT, { start: 12, end: 17 }],
				[RIGHT, { start: 18, end: 23 }],
			])
		}],
	[WALK_ATTACK,
		{ img: 'walk_attack.png',
			repeat: 0,
			frameRate: 12,
			config: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 6,
			},
			frames: new Map([
				[DOWN, { start: 0, end: 5 }],
				[UP, { start: 6, end: 11 }],
				[LEFT, { start: 12, end: 17 }],
				[RIGHT, { start: 18, end: 23 }],
			])
		}]
]);

export {
	GARZ, THOKK, VORG, ATTACK, DEATH, HURT, IDLE, RUN, RUN_ATTACK, WALK, WALK_ATTACK,
	DAREK, GARETH, MALAKOR, MOROS, ORLOK, TORIN,
	UP, DOWN, LEFT, RIGHT,
	CONTROLLER_RUN, CONTROLLER_ATTACK,
	orcs, orcAnimation,
	swordsmen, swordsmanAnimation, vampires, vampireAnimation,
	attributes, isAttribute, HIT_POINTS, STAMINA, DAMAGE
};