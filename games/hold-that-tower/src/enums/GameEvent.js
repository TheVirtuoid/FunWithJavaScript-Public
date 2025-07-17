let scene;

export default class GameEvent {
	static GAME_OVER = 'game-over';

	static ENEMY_REACHED_TOWER = 'enemy-reached-tower';
	static ENEMY_DESTROYED = 'enemy-destroyed';
	static RUNNER_RETURNED = 'runner-returned';
	static RUNNER_DESTROYED = 'runner-destroyed';

	static MISSILE_HIT_TOWER = 'missile-hit-tower';
	static MISSILE_HIT_RUNNER = 'missile-hit-runner';
	static MISSILE_HIT_ENEMY = 'missile-hit-enemy';
	static MISSILE_HIT_MISSILE = 'missile-hit-missile';

	static WAVE_STARTED = 'wave-started';
	static WAVE_ENDED = 'wave-ended';
	static NEW_WAVE = 'new-wave';

	static CARD_SELECTED = 'card-selected';

	static UPGRADE_HEALTH = 'upgrade-health';
	static ADD_RUNNER = 'add-runner';
	static ADD_GUN = 'add-gun';

	static TYPES = [
		GameEvent.GAME_OVER,
		GameEvent.ENEMY_REACHED_TOWER,
		GameEvent.ENEMY_DESTROYED,
		GameEvent.RUNNER_RETURNED,
		GameEvent.RUNNER_DESTROYED,
		GameEvent.MISSILE_HIT_TOWER,
		GameEvent.MISSILE_HIT_RUNNER,
		GameEvent.MISSILE_HIT_ENEMY,
		GameEvent.MISSILE_HIT_MISSILE,
		GameEvent.WAVE_STARTED,
		GameEvent.WAVE_ENDED,
		GameEvent.NEW_WAVE,
		GameEvent.CARD_SELECTED,
		GameEvent.UPGRADE_HEALTH,
		GameEvent.ADD_RUNNER,
		GameEvent.ADD_GUN
	]

	static Setup(gameScene) {
		scene = gameScene;
	}

	static Emit(eventName, ...args) {
		if (!GameEvent.TYPES.includes(eventName)) {
			throw new Error(`Event ${eventName} is not defined in GameEvent`);
		}
		scene.events.emit(eventName, ...args);
	}

}