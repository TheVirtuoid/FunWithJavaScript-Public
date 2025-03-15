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

	it('should reset the time', () => {
		const stats = new Statistics();
		stats.incrementTime();
		stats.resetTime();
		expect(stats.time).to.equal(0);
	});

	it('should reset the moves', () => {
		const stats = new Statistics();
		stats.incrementTime();
		stats.resetMoves();
		expect(stats.moves).to.equal(0);
	});

	describe('When formatting the time', () => {
		it('should format the centiseconds correctly', () => {
			const stats = new Statistics();
			stats.incrementTime();
			expect(stats.formattedTime()).to.equal('0:00.01');
		});

		it('should format the seconds correctly', () => {
			const stats = new Statistics();
			for(let i = 0; i < 100; i++) {
				stats.incrementTime();
			}
			expect(stats.formattedTime()).to.equal('0:01.00');
		});

		it('should format the minutes correctly', () => {
			const stats = new Statistics();
			for(let i = 0; i < 100 * 60; i++) {
				stats.incrementTime();
			}
			expect(stats.formattedTime()).to.equal('1:00.00');
		});

	});

});