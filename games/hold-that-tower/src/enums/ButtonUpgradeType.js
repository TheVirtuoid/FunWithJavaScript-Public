export default class ButtonUpgradeType {
	static HEALTH = Symbol('health');
	static RUNNER = Symbol('runner');
	static GUN = Symbol('gun');
	static DOUBLE_RUNNER_SPEED = Symbol('double-runner-speed');
	static DOUBLE_GUN_DAMAGE = Symbol('double-gun-damage');

	static STARTING_HEALTH = 100;
	static STARTING_RUNNER_SPEED = 100;
	static STARTING_GUN_DAMAGE = 6
}