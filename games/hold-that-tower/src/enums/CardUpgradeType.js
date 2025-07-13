export default class CardUpgradeType {
	static DAMAGE = Symbol('damage');
	static SPEED = Symbol('speed');
	static RANGE = Symbol('range');
	static HEALTH = Symbol('health');
	static MAX_HEALTH = Symbol('max_health');

	static LEVEL_MINOR = Symbol('level-minor');
	static LEVEL_MAJOR = Symbol('level-major');
	static LEVEL_GIANT = Symbol('level-giant');

	static GUN_DAMAGE = Symbol('gun-damage');
	static GUN_SPEED = Symbol('gun-speed');

	static TOWER_HEALTH = Symbol('tower-health');
	static TOWER_MAX_HEALTH = Symbol('tower-max-health');
	static TOWER_ROTATION_SPEED = Symbol('tower-rotation-speed');

	static RUNNER_SPEED = Symbol('runner-speed');
	static RUNNER_HEALTH = Symbol('runner-health');

	static LEVEL_COLORS = {
		[CardUpgradeType.LEVEL_MINOR]: 0x006600,
		[CardUpgradeType.LEVEL_MAJOR]: 0x4444bb,
		[CardUpgradeType.LEVEL_GIANT]: 0xbb2222
	};

	static TYPES = [
		CardUpgradeType.DAMAGE,
		CardUpgradeType.SPEED,
		CardUpgradeType.RANGE,
		CardUpgradeType.HEALTH,
		CardUpgradeType.MAX_HEALTH
	];

	static ICONS = {
		[CardUpgradeType.GUN_DAMAGE]: 'gun',
		[CardUpgradeType.GUN_SPEED]: 'gun',
		[CardUpgradeType.TOWER_HEALTH]: 'tower',
		[CardUpgradeType.TOWER_MAX_HEALTH]: 'tower',
		[CardUpgradeType.TOWER_ROTATION_SPEED]: 'tower',
		[CardUpgradeType.RUNNER_SPEED]: 'runner',
		[CardUpgradeType.RUNNER_HEALTH]: 'runner'
	};

	static DATABASE = [
		{ pct: .77, level: CardUpgradeType.LEVEL_MINOR, cards: [
				{ type: CardUpgradeType.GUN_DAMAGE, title: 'Punch!', description: 'Increase gun damage by 10%', upgradeAmount: 1.1 },
				{ type: CardUpgradeType.TOWER_MAX_HEALTH, title: 'Workout', description: 'Increase max health by 10%', upgradeAmount: 1.1 },
				{ type: CardUpgradeType.TOWER_HEALTH, title: 'Refreshing', description: 'Restore health by 10%', upgradeAmount: 1.1 },
				{ type: CardUpgradeType.RUNNER_SPEED, title: 'Zoom', description: 'Increase runner speed by 25%', upgradeAmount: 1.25 },
				{ type: CardUpgradeType.TOWER_ROTATION_SPEED, title: 'Clock', description: 'Increase gun rotation speed by .005', upgradeAmount: .005 }
		]},
		{ pct: .98, level: CardUpgradeType.LEVEL_MAJOR, cards: [
				{ type: CardUpgradeType.GUN_DAMAGE, title: 'Big Punch!', description: 'Increase gun damage by 50%', upgradeAmount: 1.5 },
				{ type: CardUpgradeType.TOWER_MAX_HEALTH, title: 'More Workout', description: 'Increase max health by 25%', upgradeAmount: 1.25 },
				{ type: CardUpgradeType.TOWER_HEALTH, title: 'Invigorating', description: 'Restore health by 25%', upgradeAmount: 1.25 },
				{ type: CardUpgradeType.RUNNER_SPEED, title: 'Zoom Zoom', description: 'Increase runner speed by 50%', upgradeAmount: 1.5 },
				{ type: CardUpgradeType.TOWER_ROTATION_SPEED, title: 'Wheel', description: 'Increase gun rotation speed by .015', upgradeAmount: .015 }
		]},
		{ pct: 1, level: CardUpgradeType.LEVEL_GIANT, cards: [
				{ type: CardUpgradeType.GUN_DAMAGE, title: 'Serious Punch!', description: 'Double gun damage', upgradeAmount: 2 },
				{ type: CardUpgradeType.TOWER_MAX_HEALTH, title: 'Gym God', description: 'Increase max health by 50%', upgradeAmount: 1.5 },
				{ type: CardUpgradeType.TOWER_HEALTH, title: 'Regenerate!', description: 'Restore health by 50%', upgradeAmount: 1.5 },
				{ type: CardUpgradeType.RUNNER_SPEED, title: 'Sonic Boom', description: 'Double runner speed', upgradeAmount: 1.1 },
				{ type: CardUpgradeType.TOWER_ROTATION_SPEED, title: '78 RPM', description: 'Increase gun rotation speed by .03', upgradeAmount: .03 }
		]},
	];
}
