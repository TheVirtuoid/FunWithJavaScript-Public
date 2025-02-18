import Statistics from "../../src/classes/Statistics/Statistics.js";

describe('When I work with the statistics class', () => {
	it('should initialize to 0 time and 0 moves', () => {
		const stats = new Statistics();
		expect(stats.time).to.equal(0);
		expect(stats.moves).to.equal(0);
	});
	it('should increment the time', () => {
		const stats = new Statistics();
		stats.incrementTime();
		expect(stats.time).to.equal(1);
	});
	it('should increment the moves', () => {
		const stats = new Statistics();
		stats.incrementMoves();
		expect(stats.moves).to.equal(1);
	});
});