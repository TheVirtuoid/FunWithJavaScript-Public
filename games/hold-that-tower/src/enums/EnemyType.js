export default class EnemyType {
	static SHADOWLING = Symbol('shadowling');
	static FROSTWISP = Symbol('frostwisp');
	static THORNLING = Symbol('thornling');
	static MISTWEAVER = Symbol('mistweaver');
	static EMBERLING = Symbol('emberling');
	static STORMCALLER = Symbol('stormcaller');
	static DUSKRUNNER = Symbol('duskrunner');
	static PLAGUESEEKER = Symbol('plagueseeker');
	static VOIDCRAWLER = Symbol('voidcrawler');
	static GRIMREAVER = Symbol('grimreaver');
	static BLOODHARBINGER = Symbol('bloodharbinger');
	static NETHERLORD = Symbol('netherlord');
	static DOOMHOWLER = Symbol('doomhowler');
	static SOULREAPER = Symbol('soulreaper');
	static CHAOSBORN = Symbol('chaosborn');
	static WRAITHKING = Symbol('wraithking');
	static NIGHTTERROR = Symbol('nightterror');
	static DREADLORD = Symbol('dreadlord');
	static ABYSSLORD = Symbol('abysslord');
	static WORLDENDER = Symbol('worldender');

	static TYPES = [
		EnemyType.SHADOWLING,
		EnemyType.FROSTWISP,
		EnemyType.THORNLING,
		EnemyType.MISTWEAVER,
		EnemyType.EMBERLING,
		EnemyType.STORMCALLER,
		EnemyType.DUSKRUNNER,
		EnemyType.PLAGUESEEKER,
		EnemyType.VOIDCRAWLER,
		EnemyType.GRIMREAVER,
		EnemyType.BLOODHARBINGER,
		EnemyType.NETHERLORD,
		EnemyType.DOOMHOWLER,
		EnemyType.SOULREAPER,
		EnemyType.CHAOSBORN,
		EnemyType.WRAITHKING,
		EnemyType.NIGHTTERROR,
		EnemyType.DREADLORD,
		EnemyType.ABYSSLORD,
		EnemyType.WORLDENDER
	];

	static DATABASE = new Map([
		[EnemyType.SHADOWLING, {
			name: "Shadowling",
			hitPoints: 10,
			speed: 20,
			damage: 5,
			imageUrl: '/src/images/snowman.png',
			spritesUrl: '/src/sprites/shadowling',
			scale: 3,
			spriteConfig: {
				frameWidth: 64,
				frameHeight: 64,
				columnsPerRow: 6,
			},
			sprites: {
				walk: { image: '/walk_full.png', start: 19, end: 23, frameRate: 12, repeat: -1 },
				attack: { image: '/attack_full.png', start: 0, end: 7, frameRate: 12, repeat: -1 },
				death: { image: '/death_full.png', start: 0, end: 7, frameRate: 12, repeat: 0 }
			}
		}],
		[EnemyType.FROSTWISP,      { name: "FrostWisp",      hitPoints: 15,  speed: 18, damage: 8,   imageUrl: '/src/images/grinning.png' }],
		[EnemyType.THORNLING,      { name: "Thornling",      hitPoints: 20,  speed: 19, damage: 10,  imageUrl: '/src/images/cold.png' }],
		[EnemyType.MISTWEAVER,     { name: "MistWeaver",     hitPoints: 25,  speed: 17, damage: 15,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.EMBERLING,      { name: "Emberling",      hitPoints: 30,  speed: 16, damage: 20,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.STORMCALLER,    { name: "StormCaller",    hitPoints: 40,  speed: 15, damage: 25,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.DUSKRUNNER,     { name: "DuskRunner",     hitPoints: 50,  speed: 14, damage: 30,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.PLAGUESEEKER,   { name: "PlagueSeeker",   hitPoints: 60,  speed: 13, damage: 35,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.VOIDCRAWLER,    { name: "VoidCrawler",    hitPoints: 70,  speed: 12, damage: 40,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.GRIMREAVER,     { name: "GrimReaver",     hitPoints: 80,  speed: 11, damage: 45,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.BLOODHARBINGER, { name: "BloodHarbinger", hitPoints: 90,  speed: 10, damage: 50,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.NETHERLORD,     { name: "NetherLord",     hitPoints: 100, speed: 9,  damage: 60,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.DOOMHOWLER,     { name: "DoomHowler",     hitPoints: 120, speed: 8,  damage: 70,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.SOULREAPER,     { name: "SoulReaper",     hitPoints: 140, speed: 7,  damage: 80,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.CHAOSBORN,      { name: "ChaosBorn",      hitPoints: 160, speed: 6,  damage: 90,  imageUrl: '/src/images/snowman.png' }],
		[EnemyType.WRAITHKING,     { name: "WraithKing",     hitPoints: 180, speed: 5,  damage: 100, imageUrl: '/src/images/snowman.png' }],
		[EnemyType.NIGHTTERROR,    { name: "NightTerror",    hitPoints: 200, speed: 4,  damage: 120, imageUrl: '/src/images/snowman.png' }],
		[EnemyType.DREADLORD,      { name: "DreadLord",      hitPoints: 250, speed: 3,  damage: 140, imageUrl: '/src/images/snowman.png' }],
		[EnemyType.ABYSSLORD,      { name: "AbyssLord",      hitPoints: 300, speed: 3,  damage: 160, imageUrl: '/src/images/snowman.png' }],
		[EnemyType.WORLDENDER,     { name: "WorldEnder",     hitPoints: 400, speed: 2,  damage: 200, imageUrl: '/src/images/snowman.png' }]
	]);

	static preload(scene) {
		EnemyType.DATABASE.forEach((enemy, type) => {
			scene.load.image(
				enemy.name,
				enemy.imageUrl
			);
			if (enemy.spritesUrl) {
				const url = enemy.spritesUrl;
				for (const spriteSheet in enemy.sprites) {
					// console.log(`sprite name: ${enemy.name}-${spriteSheet}`);
					scene.load.spritesheet(
						`${enemy.name}-${spriteSheet}`,
						`${url}${enemy.sprites[spriteSheet].image}`,
						enemy.spriteConfig,
					);
				}
			}
		});
	}

	static get(type) {
		if (!EnemyType.TYPES.includes(type)) {
			throw new Error('Invalid enemy type');
		}
		const enemyData = EnemyType.DATABASE.get(type);
		if (!enemyData) {
			throw new Error('Enemy data not found');
		}
		return {...enemyData};
	}

	static createAnimations(scene) {
		EnemyType.DATABASE.forEach((enemy, type) => {
			if (enemy.sprites) {
				for (const spriteData in enemy.sprites) {
					scene.anims.create({
						key: `${enemy.name}-${spriteData}-anim`,
						frames: scene.anims.generateFrameNumbers(`${enemy.name}-${spriteData}`, {
							start: enemy.sprites[spriteData].start,
							end: enemy.sprites[spriteData].end
						}),
						frameRate: enemy.sprites[spriteData].frameRate,
						repeat: enemy.sprites[spriteData].repeat
					});
				}
			}
		});
	}

}