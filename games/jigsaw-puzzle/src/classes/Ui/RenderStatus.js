export default class RenderStatus {
	static BEGIN = Symbol('begin');
	static EXIT = Symbol('exit');
	static NEW = Symbol('new');
	static READY = Symbol('ready');
	static START = Symbol('start');
	static PLAY = Symbol('play');
	static PAUSED = Symbol('paused');
	static FINISHED = Symbol('finished');
}