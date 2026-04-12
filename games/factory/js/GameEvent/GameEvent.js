let game;

export default class GameEvent {

	static GAME_EVENT_INITIALIZED = Symbol('game-event-initialized');
	static GAME_READY = Symbol('game-ready');

	static STAT_CURSOR_POSITION = Symbol('ui-stat-cursor-position');
	static STAT_CASH = Symbol('stat-cash');
	static STAT_LEVEL = Symbol('stat-level');
	static STAT_INVENTORY_UPDATE = Symbol('stat-inventory-update');
	static STAT_INFORMATION_UPDATE = Symbol('stat-information-update');

	static STAT_GET_CASH = Symbol('stat-get-cash');

	static INVENTORY_ADD = Symbol('inventory-add');
	static INVENTORY_REMOVE = Symbol('inventory-remove');
	static INVENTORY_SET_ACTIVE = Symbol('inventory-set-active');
	static INVENTORY_REMOVE_ACTIVE = Symbol('inventory-remove-active');

	static ORE_CREATE = Symbol('ore-create');
	static ORE_CREATED = Symbol('ore-created');

	static GRID_SELECTED = Symbol('grid-selected');

	static ALLOY_CREATE = Symbol('alloy-create');
	static COMBINATOR_INVENTORY_CHANGE = Symbol('combinator-inventory-change');
	static STORE_UPDATE_CASH = Symbol('store-update-cash');
	static BUILDING_REMOVED = Symbol('building-removed');

	static TYPES = [
		GameEvent.GAME_EVENT_INITIALIZED,
		GameEvent.GAME_READY,
		GameEvent.STAT_CURSOR_POSITION,
		GameEvent.STAT_CASH,
		GameEvent.STAT_GET_CASH,
		GameEvent.STAT_LEVEL,
		GameEvent.STAT_INVENTORY_UPDATE,
		GameEvent.STAT_INFORMATION_UPDATE,
		GameEvent.INVENTORY_ADD,
		GameEvent.INVENTORY_REMOVE,
		GameEvent.INVENTORY_SET_ACTIVE,
		GameEvent.INVENTORY_REMOVE_ACTIVE,
		GameEvent.ORE_CREATED,
		GameEvent.ORE_CREATE,
		GameEvent.ALLOY_CREATE,
		GameEvent.GRID_SELECTED,
		GameEvent.COMBINATOR_INVENTORY_CHANGE,
		GameEvent.BUILDING_REMOVED,

		GameEvent.STORE_UPDATE_CASH
	]

	static Setup(gameObject) {
		game = gameObject;
		GameEvent.Emit(GameEvent.GAME_EVENT_INITIALIZED);
	}

	static TakeDown() {
		game = null;
	}

	static Key(key) {
		if (!GameEvent.TYPES.includes(key)) {
			return undefined;
		}
		return key.description;
	}

	static Emit(eventName, ...args) {
		if (!game) {
			throw new Error('GameEvent object has not been set up');
		}
		if (!GameEvent.TYPES.includes(eventName)) {
			throw new Error(`Event '${eventName}' is not defined in GameEvent`);
		}
		game.emit(eventName, ...args);
	}

	constructor() {
		throw(new Error('GameEvent is static and cannot be instantiated'));
	}

}