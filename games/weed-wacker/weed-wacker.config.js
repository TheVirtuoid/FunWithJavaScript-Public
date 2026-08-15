const thistlebite = Symbol('thistlebite');
const gravelbane = Symbol('gravelbane');
const vileclover = Symbol('vileclover');
const brambleroot = Symbol('brambleroot');
const stingnettle = Symbol('stingnettle');
const prickleweed = Symbol('prickleweed');
const mosschoke = Symbol('mosschoke');
const crabvine = Symbol('crabvine');
const flameleaf = Symbol('flameleaf');
const dreadstalk = Symbol('dreadstalk');

const time = Symbol('time');
const score = Symbol('score');
const power = Symbol('power');
const speed = Symbol('speed');
const range = Symbol('range');
const durability = Symbol('durability');
const spawnRate = Symbol('spawn-rate');
const round = Symbol('round');

const basaltusk = Symbol('basaltusk');
const cragmantle = Symbol('cragmantle');
const shalecore = Symbol('shalecore');
const flintspire = Symbol('flintspire');
const ironvein = Symbol('ironvein');

const cutterIdle = Symbol('cutter-idle');
const weedCutting = Symbol('weed-cutting');
const weedCut = Symbol('weed-cut');
const rockHit = Symbol('rock-hit');

const SOUND_CUTTER_IDLE = cutterIdle;
const SOUND_WEED_CUTTING = weedCutting;
const SOUND_WEED_CUT = weedCut;
const SOUND_ROCK_HIT = rockHit;

const TIME = time;
const POWER = power;
const SPAWN_RATE = spawnRate;
const SPEED = speed;
const RANGE = range;
const DURABILITY = durability;
const ROUND = round;

const rocks = new Map([
	[basaltusk, { type: basaltusk, name: 'Basaltusk', toughness: 1, image: '/src/img/rock-1.png' }],
	[cragmantle, { type: cragmantle, name: 'Cragmantle', toughness: 2, image: '/src/img/rock-2.png' }],
	[shalecore, { type: shalecore, name: 'Shalecore', toughness: 3, image: '/src/img/rock-3.png' }],
	[flintspire, { type: flintspire, name: 'Flintspire', toughness: 5, image: '/src/img/rock-4.png' }],
	[ironvein, { type: ironvein, name: 'Ironvein', toughness: 7, image: '/src/img/rock-5.png' }]
]);

const rockTypes = [...rocks.keys()];

const weeds = new Map([
	[thistlebite, { type: thistlebite, name: 'Thistlebite', toughness: 1000, points: 1, image: '/src/img/weed-0.png' }],
	[gravelbane, { type: gravelbane, name: 'Gravelbane', toughness: 1500, points: 2, image: '/src/img/weed-1.png' }],
	[vileclover, { type: vileclover, name: 'Vileclover', toughness: 2500, points: 3, image: '/src/img/weed-2.png' }],
	[brambleroot, { type: brambleroot, name: 'Brambleroot', toughness: 4000, points: 4, image: '/src/img/weed-3.png' }],
	[stingnettle, { type: stingnettle, name: 'Stingnettle', toughness: 6000, points: 5, image: '/src/img/weed-4.png' }],
	[prickleweed, { type: prickleweed, name: 'Prickleweed', toughness: 8500, points: 6, image: '/src/img/weed-5.png' }],
	[mosschoke, { type: mosschoke, name: 'Mosschoke', toughness: 11000, points: 8, image: '/src/img/weed-6.png' }],
	/*[crabvine, { type: crabvine, name: 'Crabvine', toughness: 25, points: 10 }],
	[flameleaf, { type: flameleaf, name: 'Flameleaf', toughness: 29, points: 13 }],
	[dreadstalk, { type: dreadstalk, name: 'Dreadstalk', toughness: 34, points: 18 }]*/
]);

const weedTypes = [...weeds.keys()];

const stats = new Map([
	[time, { type: time, tag: 'time', name: 'Time', start: 15000 }],
	// [score, { type: score, tag: 'score', name: 'Score', start: 0 }],
	[power, { type: power, tag: 'power', name: 'Power', start: 5 }],
	[speed, { type: speed, tag: 'speed', name: 'Speed', start: 1 }],
	[range, { type: range, tag: 'range', name: 'Range', start: .5 }],
	[durability, { type: durability, tag: 'durability', name: 'Durability', start: 100 }],
	[spawnRate, { type: spawnRate, tag: 'spawn-rate', name: 'Spawn Rate', start: 1 }],
	[round, { type: round, tag: 'round', name: 'Round', start: 0 }]
]);

const statTypes = [...stats.keys()];

const sounds = new Map([
	[cutterIdle, { type: cutterIdle, name: 'cutter-idle', audio: '/src/sounds/idle.mp3' }],
	[weedCutting, { type: weedCutting, name: 'weed-cutting', audio: '/src/sounds/weeds.mp3' }],
	[weedCut, { type: weedCut, name: 'weed-cut', audio: '/src/sounds/weed-cut.mp3' }],
	[rockHit, { type: rockHit, name: 'rock-hit', audio: '/src/sounds/rocks.mp3' }]
]);

const soundTypes = [...sounds.keys()];

const levels = new Map([
	[time, {
		title: 'Time',
		key: time,
		graphic: 'level-time',
		activeFill: 0xffbbbb,
		highlightFill: 0xffdddd,
		position: 0,
		levels: [
			{ text: 'Increase time by 30%', adjustment: 0.3, cost: new Map([[thistlebite, 1]]) },
			{ text: 'Increase time by 50%', adjustment: 0.5, cost: new Map([[thistlebite, 4]]) },
			{ text: 'Increase time by 50%', adjustment: 0.5, cost: new Map([[thistlebite, 8], [gravelbane, 2]]) },
		]
	}],
	[power, {
		title: 'Power',
		key: power,
		graphic: 'level-power',
		activeFill: 0xbbffbb,
		highlightFill: 0xddffdd,
		position: 1,
		levels: [
			{ text: 'Increase power by 100%', adjustment: 1, cost: new Map([[thistlebite, 3]]) },
			{ text: 'Increase power by 30%', adjustment: 0.3, cost: new Map([[thistlebite, 4], [gravelbane, 1]]) },
			{ text: 'Increase power by 40%', adjustment: 0.4, cost: new Map([[thistlebite, 2], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Increase power by 50%', adjustment: 0.5, cost: new Map([[gravelbane, 3], [vileclover, 1], [brambleroot, 1]]) },
			{ text: 'Increase power by 50%', adjustment: 0.5, cost: new Map([[vileclover, 3], [brambleroot, 2], [stingnettle, 2]]) },
			{ text: 'Increase power by 50%', adjustment: 0.5, cost: new Map([[brambleroot, 3], [stingnettle, 2], [prickleweed, 1]]) },
		]
	}],
	[speed, {
		title: 'Speed',
		key: speed,
		graphic: 'level-speed',
		activeFill: 0xbbbbff,
		highlightFill: 0xddddff,
		position: 2,
		levels: [
			{ text: 'Increase speed by 20%', adjustment: 0.2, cost: new Map([[thistlebite, 4], [gravelbane, 1]]) },
			{ text: 'Increase speed by 30%', adjustment: 0.3, cost: new Map([[thistlebite, 6], [gravelbane, 2], [vileclover, 1]]) },
			{ text: 'Increase speed by 40%', adjustment: 0.4, cost: new Map([[thistlebite, 3], [gravelbane, 4], [vileclover, 2], [brambleroot, 1]]) },
		]
	}],
	[range, {
		title: 'Range',
		key: range,
		graphic: 'level-range',
		activeFill: 0xffbbff,
		highlightFill: 0xffddff,
		position: 3,
		levels: [
			{ text: 'Increase range by 50%', adjustment: 0.5, cost: new Map([[thistlebite, 6], [gravelbane, 1]]) },
			{ text: 'Increase range by 50%', adjustment: 0.5, cost: new Map([[thistlebite, 8], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Increase range by 50%', adjustment: 0.5, cost: new Map([[thistlebite, 6], [gravelbane, 6], [vileclover, 3], [brambleroot, 2], [stingnettle, 1]]) },
		]
	}],
	[durability, {
		title: 'Durability',
		key: durability,
		graphic: 'level-durability',
		activeFill: 0xbbffff,
		highlightFill: 0xddffff,
		position: 4,
		levels: [
			{ text: 'Add 100 to current stat', adjustment: 100, cost: new Map([[thistlebite, 6], [gravelbane, 1]]) },
			{ text: 'Add 100 to current stat', adjustment: 100, cost: new Map([[thistlebite, 8], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Add 100 to current stat', adjustment: 100, cost: new Map([[thistlebite, 6], [gravelbane, 6], [vileclover, 3], [brambleroot, 2], [stingnettle, 1]]) },
		]
	}],
	[spawnRate, {
		title: 'Spawn Rate',
		key: spawnRate,
		graphic: 'level-spawn-rate',
		activeFill: 0xffffbb,
		highlightFill: 0xffffdd,
		position: 5,
		levels: [
			{ text: 'Double the rate', adjustment: 1, cost: new Map([[thistlebite, 6], [gravelbane, 1]]) },
			{ text: 'Double the rate', adjustment: 1, cost: new Map([[thistlebite, 8], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Double the rate', adjustment: 1, cost: new Map([[thistlebite, 6], [gravelbane, 6], [vileclover, 3], [brambleroot, 2], [stingnettle, 1]]) },
		]
	}]
]);

const rockGeneration = [
	[
		{ rock: basaltusk, pct: 0 },
		{ rock: cragmantle, pct: 0 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: 0 },
		{ rock: cragmantle, pct: 0 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: 0 },
		{ rock: cragmantle, pct: 0 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: 1 },
		{ rock: cragmantle, pct: 0 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: 1 },
		{ rock: cragmantle, pct: 0 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .9 },
		{ rock: cragmantle, pct: .1 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .8 },
		{ rock: cragmantle, pct: .2 },
		{ rock: shalecore, pct: 0 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .7 },
		{ rock: cragmantle, pct: .2 },
		{ rock: shalecore, pct: .1 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .6 },
		{ rock: cragmantle, pct: .25 },
		{ rock: shalecore, pct: .15 },
		{ rock: flintspire, pct: 0 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .5 },
		{ rock: cragmantle, pct: .25 },
		{ rock: shalecore, pct: .15 },
		{ rock: flintspire, pct: .1 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .4 },
		{ rock: cragmantle, pct: .25 },
		{ rock: shalecore, pct: .2 },
		{ rock: flintspire, pct: .15 },
		{ rock: ironvein, pct: 0 }
	],
	[
		{ rock: basaltusk, pct: .3 },
		{ rock: cragmantle, pct: .25 },
		{ rock: shalecore, pct: .2 },
		{ rock: flintspire, pct: .15 },
		{ rock: ironvein, pct: .1 }
	],
	[
		{ rock: basaltusk, pct: .2 },
		{ rock: cragmantle, pct: .25 },
		{ rock: shalecore, pct: .2 },
		{ rock: flintspire, pct: .2 },
		{ rock: ironvein, pct: .15 }
	],
	[
		{ rock: basaltusk, pct: .2 },
		{ rock: cragmantle, pct: .2 },
		{ rock: shalecore, pct: .2 },
		{ rock: flintspire, pct: .2 },
		{ rock: ironvein, pct: .2 }
	],
]

const weedGeneration = [
	{
		start: 5,
		distribution: [
			{ weed: thistlebite, pct: 1 },
			{ weed: gravelbane, pct: 0 },
			{ weed: vileclover, pct: 0 },
			{ weed: brambleroot, pct: 0 },
			{ weed: stingnettle, pct: 0 },
			{ weed: prickleweed, pct: 0 },
			{ weed: mosschoke, pct: 0 }
		]
	},
	{
		start: 7,
		distribution: [
			{ weed: thistlebite, pct: .9 },
			{ weed: gravelbane, pct: .1 },
			{ weed: vileclover, pct: 0 },
			{ weed: brambleroot, pct: 0 },
			{ weed: stingnettle, pct: 0 },
			{ weed: prickleweed, pct: 0 },
			{ weed: mosschoke, pct: 0 }
		]
	},
	{
		start: 9,
		distribution: [
			{ weed: thistlebite, pct: .8 },
			{ weed: gravelbane, pct: .15 },
			{ weed: vileclover, pct: .05 },
			{ weed: brambleroot, pct: 0 },
			{ weed: stingnettle, pct: 0 },
			{ weed: prickleweed, pct: 0 },
			{ weed: mosschoke, pct: 0 }
		]
	},
	{
		start: 11,
		distribution: [
			{ weed: thistlebite, pct: .7 },
			{ weed: gravelbane, pct: .17 },
			{ weed: vileclover, pct: .08 },
			{ weed: brambleroot, pct: .05 },
			{ weed: stingnettle, pct: 0 },
			{ weed: prickleweed, pct: 0 },
			{ weed: mosschoke, pct: 0 }
		]
	},
	{
		start: 13,
		distribution: [
			{ weed: thistlebite, pct: .6 },
			{ weed: gravelbane, pct: .20 },
			{ weed: vileclover, pct: .11 },
			{ weed: brambleroot, pct: .07 },
			{ weed: stingnettle, pct: .03 },
			{ weed: prickleweed, pct: 0 },
			{ weed: mosschoke, pct: 0 }
		]
	},
	{
		start: 15,
		distribution: [
			{ weed: thistlebite, pct: .4 },
			{ weed: gravelbane, pct: .24 },
			{ weed: vileclover, pct: .15 },
			{ weed: brambleroot, pct: .11 },
			{ weed: stingnettle, pct: .07 },
			{ weed: prickleweed, pct: .03 },
			{ weed: mosschoke, pct: 0 }
		]
	},
	{
		start: 17,
		distribution: [
			{ weed: thistlebite, pct: .3 },
			{ weed: gravelbane, pct: .26 },
			{ weed: vileclover, pct: .17 },
			{ weed: brambleroot, pct: .12 },
			{ weed: stingnettle, pct: .08 },
			{ weed: prickleweed, pct: .04 },
			{ weed: mosschoke, pct: .03 }
		]
	},
	{
		start: 19,
		distribution: [
			{ weed: thistlebite, pct: .2 },
			{ weed: gravelbane, pct: .26 },
			{ weed: vileclover, pct: .19 },
			{ weed: brambleroot, pct: .14 },
			{ weed: stingnettle, pct: .1 },
			{ weed: prickleweed, pct: .06 },
			{ weed: mosschoke, pct: .05 }
		]
	},
	{
		start: 21,
		distribution: [
			{ weed: thistlebite, pct: .1 },
			{ weed: gravelbane, pct: .26 },
			{ weed: vileclover, pct: .21 },
			{ weed: brambleroot, pct: .16 },
			{ weed: stingnettle, pct: .12 },
			{ weed: prickleweed, pct: .08 },
			{ weed: mosschoke, pct: .07 }
		]
	},
];

export {
	weeds, weedTypes, stats, statTypes, levels, weedGeneration,
	rocks, rockTypes, rockGeneration,
	sounds, soundTypes, SOUND_CUTTER_IDLE, SOUND_WEED_CUTTING, SOUND_WEED_CUT, SOUND_ROCK_HIT,
	TIME, POWER, SPAWN_RATE, SPEED, RANGE, DURABILITY, ROUND
};