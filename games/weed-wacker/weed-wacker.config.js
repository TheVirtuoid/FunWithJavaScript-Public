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

const TIME = time;

const weeds = new Map([
	[thistlebite, {type: thistlebite, name: 'Thistlebite', toughness: 1000, points: 1, minLevel: 1, image: '/src/img/weed-0.png' }],
	[gravelbane, {type: gravelbane, name: 'Gravelbane', toughness: 1500, points: 2, minLevel: 3, image: '/src/img/weed-1.png' }],
	[vileclover, {type: vileclover, name: 'Vileclover', toughness: 2500, points: 3, minLevel: 5, image: '/src/img/weed-2.png' }],
	[brambleroot, {type: brambleroot, name: 'Brambleroot', toughness: 4000, points: 4, minLevel: 8, image: '/src/img/weed-3.png' }],
	[stingnettle, {type: stingnettle, name: 'Stingnettle', toughness: 6000, points: 5, minLevel: 11, image: '/src/img/weed-4.png'}],
	[prickleweed, {type: prickleweed, name: 'Prickleweed', toughness: 8500, points: 6, minLevel: 14, image: '/src/img/weed-5.png'}],
	[mosschoke, {type: mosschoke, name: 'Mosschoke', toughness: 11000, points: 8, minLevel: 17, image: '/src/img/weed-6.png'}],
	/*[crabvine, {type: crabvine, name: 'Crabvine', toughness: 25, points: 10, minLevel: 21}],
	[flameleaf, {type: flameleaf, name: 'Flameleaf', toughness: 29, points: 13, minLevel: 25}],
	[dreadstalk, {type: dreadstalk, name: 'Dreadstalk', toughness: 34, points: 18, minLevel: 30}]*/
]);

const weedTypes = [...weeds.keys()];

const stats = new Map([
	[time, { type: time, tag: 'time', name: 'Time' }],
	[score, { type: score, tag: 'score', name: 'Score' }],
	[power, { type: power, tag: 'power', name: 'Power' }],
	[speed, { type: speed, tag: 'speed', name: 'Speed' }],
	[range, { type: range, tag: 'range', name: 'Range' }],
	[durability, { type: durability, tag: 'durability', name: 'Durability' }],
	[spawnRate, { type: spawnRate, tag: 'spawn-rate', name: 'Spawn Rate' }]
]);

const statTypes = [...stats.keys()];

/*const stats = [
	{ type: Symbol('time'), tag: 'time', name: 'Time' },
	{ type: Symbol('score'), tag: 'score', name: 'Score' },
	{ type: Symbol('power'), tag: 'power', name: 'Power' },
	{ type: Symbol('speed'), tag: 'speed', name: 'Speed' },
	{ type: Symbol('range'), tag: 'range', name: 'Range' },
	{ type: Symbol('durability'), tag: 'durability', name: 'Durability' },
	{ type: Symbol('spawn-rate'), tag: 'spawn-rate', name: 'Spawn Rate' }
];*/

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
			{ text: 'Increase power by 20%', adjustment: 0.2, cost: new Map([[thistlebite, 3]]) },
			{ text: 'Increase power by 30%', adjustment: 0.3, cost: new Map([[thistlebite, 4], [gravelbane, 1]]) },
			{ text: 'Increase power by 40%', adjustment: 0.4, cost: new Map([[thistlebite, 2], [gravelbane, 3], [vileclover, 1]]) },
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
			{ text: 'Increase speed by 10%', adjustment: 0.1, cost: new Map([[thistlebite, 4], [gravelbane, 1]]) },
			{ text: 'Increase speed by 20%', adjustment: 0.2, cost: new Map([[thistlebite, 6], [gravelbane, 2], [vileclover, 1]]) },
			{ text: 'Increase speed by 30%', adjustment: 0.3, cost: new Map([[thistlebite, 3], [gravelbane, 4], [vileclover, 2], [brambleroot, 1]]) },
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
			{ text: 'Increase range by 5%', adjustment: 0.01, cost: new Map([[thistlebite, 6], [gravelbane, 1]]) },
			{ text: 'Increase range by 10%', adjustment: 0.1, cost: new Map([[thistlebite, 8], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Increase range by 15%', adjustment: 0.15, cost: new Map([[thistlebite, 6], [gravelbane, 6], [vileclover, 3], [brambleroot, 2], [stingnettle, 1]]) },
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
			{ text: 'Increase range by 5%', adjustment: 0.01, cost: new Map([[thistlebite, 6], [gravelbane, 1]]) },
			{ text: 'Increase range by 10%', adjustment: 0.1, cost: new Map([[thistlebite, 8], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Increase range by 15%', adjustment: 0.15, cost: new Map([[thistlebite, 6], [gravelbane, 6], [vileclover, 3], [brambleroot, 2], [stingnettle, 1]]) },
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
			{ text: 'Increase range by 5%', adjustment: 0.01, cost: new Map([[thistlebite, 6], [gravelbane, 1]]) },
			{ text: 'Increase range by 10%', adjustment: 0.1, cost: new Map([[thistlebite, 8], [gravelbane, 3], [vileclover, 1]]) },
			{ text: 'Increase range by 15%', adjustment: 0.15, cost: new Map([[thistlebite, 6], [gravelbane, 6], [vileclover, 3], [brambleroot, 2], [stingnettle, 1]]) },
		]
	}]
]);



// const statsDescription = new Map(stats.map((stat) => [stat.type.description, stat.type]));
//  const weedsDescription = new Map(weeds.map((weed) => [weed.type.description, weed.type]));

export { weeds, weedTypes, stats, statTypes, levels, TIME };