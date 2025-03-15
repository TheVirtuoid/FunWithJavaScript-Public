export default class InGameEvent {
	static EVENT_PIECE_MOVED = 'pieceMoved';

	static PIECE_MOVED = Symbol(InGameEvent.EVENT_PIECE_MOVED);

	static Event = (code, data) => {
		return { code, data };
	}
}