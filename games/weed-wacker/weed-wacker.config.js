const weeds = [
	{type: Symbol('thistlebite'), name: 'Thistlebite', toughness: 1000, points: 1, minLevel: 1, image: '/src/img/weed-0.png' },
	{type: Symbol('gravelbane'), name: 'Gravelbane', toughness: 1500, points: 2, minLevel: 3, image: '/src/img/weed-1.png' },
	{type: Symbol('vileclover'), name: 'Vileclover', toughness: 2500, points: 3, minLevel: 5, image: '/src/img/weed-2.png' },
	{type: Symbol('brambleroot'), name: 'Brambleroot', toughness: 4000, points: 4, minLevel: 8, image: '/src/img/weed-3.png' },
	{type: Symbol('stingnettle'), name: 'Stingnettle', toughness: 6000, points: 5, minLevel: 11, image: '/src/img/weed-4.png'},
	{type: Symbol('prickleweed'), name: 'Prickleweed', toughness: 8500, points: 6, minLevel: 14, image: '/src/img/weed-5.png'},
	{type: Symbol('mosschoke'), name: 'Mosschoke', toughness: 11000, points: 8, minLevel: 17, image: '/src/img/weed-6.png'},
	/*{type: Symbol('crabvine'), name: 'Crabvine', toughness: 25, points: 10, minLevel: 21},
	{type: Symbol('flameleaf'), name: 'Flameleaf', toughness: 29, points: 13, minLevel: 25},
	{type: Symbol('dreadstalk'), name: 'Dreadstalk', toughness: 34, points: 18, minLevel: 30},*/
];

const stats = [
	{ type: Symbol('time'), tag: 'time', name: 'Time' },
	{ type: Symbol('score'), tag: 'score', name: 'Score' },
	{ type: Symbol('power'), tag: 'power', name: 'Power' },
	{ type: Symbol('speed'), tag: 'speed', name: 'Speed' },
	{ type: Symbol('range'), tag: 'range', name: 'Range' },
	{ type: Symbol('durability'), tag: 'durability', name: 'Durability' },
	{ type: Symbol('spawn-rate'), tag: 'spawn-rate', name: 'Spawn Rate' }
];


const statsDescription = new Map(stats.map((stat) => [stat.type.description, stat.type]));
const weedsDescription = new Map(weeds.map((weed) => [weed.type.description, weed.type]));

export { weeds, stats, statsDescription, weedsDescription };