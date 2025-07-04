// TODO: These will be expanded upon later
export default class EnemyType {
	static GUNNER = Symbol('gunner');
	static BOSS = Symbol('boss');
	static RUNNER = Symbol('runner');

	static TYPES = [
		EnemyType.GUNNER,
		EnemyType.BOSS,
		EnemyType.RUNNER,
	];
}