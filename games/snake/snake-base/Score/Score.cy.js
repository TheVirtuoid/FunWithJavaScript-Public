import Score from './Score.js';

describe('Score - Constructor', () => {
	it('should create instance with all provided options', () => {
		const options = {
			score: 100,
			speed: 5,
			level: 3,
			time: 1000,
			length: 10
		};

		const score = new Score(options);

		expect(score.score).to.equal(100);
		expect(score.speed).to.equal(5);
		expect(score.level).to.equal(3);
		expect(score.time).to.equal(1000);
		expect(score.length).to.equal(10);
	});

	it('should create instance with default values when no options provided', () => {
		const score = new Score();

		expect(score.score).to.equal(0);
		expect(score.speed).to.equal(0);
		expect(score.level).to.equal(1);
		expect(score.time).to.equal(0);
		expect(score.length).to.equal(0);
	});
});

describe('Score - Properties', () => {
	let score;

	beforeEach(() => {
		score = new Score({
			score: 100,
			speed: 5,
			level: 3,
			time: 1000,
			length: 10
		});
	});

	it('should have read-only score property', () => {
		expect(() => {
			score.score = 200;
		}).to.throw();
	});

	it('should have read-only speed property', () => {
		expect(() => {
			score.speed = 10;
		}).to.throw();
	});

	it('should have read-only level property', () => {
		expect(() => {
			score.level = 5;
		}).to.throw();
	});

	it('should have read-only time property', () => {
		expect(() => {
			score.time = 2000;
		}).to.throw();
	});

	it('should have read-only length property', () => {
		expect(() => {
			score.length = 20;
		}).to.throw();
	});
});

describe('Score - incrementScore()', () => {
	let score;

	beforeEach(() => {
		score = new Score({ score: 100 });
	});

	it('should increment score by 1 when no value provided', () => {
		score.incrementScore();
		expect(score.score).to.equal(101);
	});

	it('should increment score by provided positive value', () => {
		score.incrementScore(50);
		expect(score.score).to.equal(150);
	});

	it('should decrement score when negative value provided', () => {
		score.incrementScore(-25);
		expect(score.score).to.equal(75);
	});

	it('should handle multiple increments', () => {
		score.incrementScore(10);
		score.incrementScore(20);
		score.incrementScore(-5);
		expect(score.score).to.equal(125);
	});
});

describe('Score - incrementSpeed()', () => {
	let score;

	beforeEach(() => {
		score = new Score({ speed: 5 });
	});

	it('should increment speed by 1 when no value provided', () => {
		score.incrementSpeed();
		expect(score.speed).to.equal(6);
	});

	it('should increment speed by provided positive value', () => {
		score.incrementSpeed(3);
		expect(score.speed).to.equal(8);
	});

	it('should decrement speed when negative value provided', () => {
		score.incrementSpeed(-2);
		expect(score.speed).to.equal(3);
	});

	it('should handle multiple increments', () => {
		score.incrementSpeed(2);
		score.incrementSpeed(1);
		score.incrementSpeed(-3);
		expect(score.speed).to.equal(5);
	});
});

describe('Score - incrementLevel()', () => {
	let score;

	beforeEach(() => {
		score = new Score({ level: 3 });
	});

	it('should increment level by 1 when no value provided', () => {
		score.incrementLevel();
		expect(score.level).to.equal(4);
	});

	it('should increment level by provided positive value', () => {
		score.incrementLevel(2);
		expect(score.level).to.equal(5);
	});

	it('should handle multiple increments', () => {
		score.incrementLevel(1);
		score.incrementLevel(2);
		expect(score.level).to.equal(6);
	});
});

describe('Score - incrementLength()', () => {
	let score;

	beforeEach(() => {
		score = new Score({ length: 5 });
	});

	it('should increment length by 1 when no value provided', () => {
		score.incrementLength();
		expect(score.length).to.equal(6);
	});

	it('should increment length by provided positive value', () => {
		score.incrementLength(3);
		expect(score.length).to.equal(8);
	});

	it('should handle multiple increments', () => {
		score.incrementLength(2);
		score.incrementLength(1);
		expect(score.length).to.equal(8);
	});
});

describe('Score - setTime()', () => {
	let score;

	beforeEach(() => {
		score = new Score({ time: 1000 });
	});

	it('should set time to provided value', () => {
		score.setTime(2500);
		expect(score.time).to.equal(2500);
	});

	it('should handle setting time to 0', () => {
		score.setTime(0);
		expect(score.time).to.equal(0);
	});

	it('should handle multiple time updates', () => {
		score.setTime(1500);
		expect(score.time).to.equal(1500);
		score.setTime(3000);
		expect(score.time).to.equal(3000);
	});

	it('should throw error when time value is not provided', () => {
		expect(() => score.setTime()).to.throw();
	});

	it('should throw error when time value is negative', () => {
		expect(() => score.setTime(-100)).to.throw();
	});
});