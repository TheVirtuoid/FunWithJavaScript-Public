const GARZ = Symbol('garz');
const THOKK = Symbol('thokk');
const VORG = Symbol('vorg');

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
const STILL = Symbol('still');

const orcs = new Map([
	[GARZ, { path: 'src/img/orcs/Garz' }],
	[THOKK, { path: 'src/img/orcs/Thokk' }],
	[VORG, { path: 'src/img/orcs/Vorg' }],
]);

const orcAnimationDirection = new Map([
	[DOWN, { start: 0, end: 5 }],
	[UP, { start: 6, end: 11 }],
	[LEFT, { start: 12, end: 17 }],
	[RIGHT, { start: 18, end: 23 }],
]);

const orcAnimation = new Map([
	[ATTACK, { img: 'attack.png', repeat: 0 }],
	[DEATH, { img: 'death.png', repeat: 0 }],
	[HURT, { img: 'hurt.png', repeat: 0 }],
	[IDLE, { img: 'idle.png', repeat: -1 }],
	[RUN, { img: 'run.png', repeat: 0 }],
	[RUN_ATTACK, { img: 'run_attack.png', repeat: 0 }],
	[WALK, { img: 'walk.png', repeat: 0 }],
	[WALK_ATTACK, { img: 'walk_attack.png', repeat: 0 }]
]);

export {
	GARZ, THOKK, VORG, ATTACK, DEATH, HURT, IDLE, RUN, RUN_ATTACK, WALK, WALK_ATTACK,
	UP, DOWN, LEFT, RIGHT, STILL,
	orcs, orcAnimation, orcAnimationDirection
};