export default class GameStatus {
	static EVENT_BEGIN = 'begin';
	static EVENT_EXIT = 'exit';
	static EVENT_NEW = 'new';
	static EVENT_READY = 'ready';
	static EVENT_START = 'start';
	static EVENT_PLAY = 'play';
	static EVENT_PAUSE = 'paused';
	static EVENT_CONTINUE = 'continue';
	static EVENT_FINISHED = 'finished';
	static EVENT_CANCEL = 'cancel';

	static BEGIN = Symbol(GameStatus.EVENT_BEGIN);
	static EXIT = Symbol(GameStatus.EVENT_EXIT);
	static NEW = Symbol(GameStatus.EVENT_NEW);
	static READY = Symbol(GameStatus.EVENT_READY);
	static START = Symbol(GameStatus.EVENT_START);
	static PLAY = Symbol(GameStatus.EVENT_PLAY);
	static PAUSE = Symbol(GameStatus.EVENT_PAUSE);
	static CONTINUE = Symbol(GameStatus.EVENT_CONTINUE);
	static FINISHED = Symbol(GameStatus.EVENT_FINISHED);
	static CANCEL = Symbol(GameStatus.EVENT_CANCEL);
}