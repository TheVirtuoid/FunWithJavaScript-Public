// games/hold-that-tower/tdd/Runner.cy.js
import Runner from '../src/classes/Runner.js';
import Prize from '../src/classes/Prize.js';
import Position from '../src/classes/Position.js';
import PrizeType from "../src/enums/PrizeType.js";

describe('Runner', () => {
	let runner;
	let mockPrize;
	let mockTower;
	let mockMissile;
	const position = new Position(0, 0);

	beforeEach(() => {
		runner = new Runner({ position });
		mockPrize = new Prize({
			value: 50,
			type: PrizeType.GUN,
			position: new Position(100, 100)
		});
		mockTower = {
			position: new Position(0, 0)
		};
		mockMissile = {
			ammo: {
				damage: 20
			}
		};
	});

	it('initializes with default values', () => {
		expect(runner.speed).to.equal(Runner.DEFAULT_SPEED);
		expect(runner.hitPoints).to.equal(Runner.DEFAULT_HIT_POINTS);
		expect(runner.prize).to.be.null;
		expect(runner.position).to.be.instanceOf(Position);
	});

	it('reduces hit points when taking damage', () => {
		const initialHP = runner.hitPoints;
		runner.takeDamage(10);
		expect(runner.hitPoints).to.equal(initialHP - 10);
	});

	it('increases speed when upgraded', () => {
		const initialSpeed = runner.speed;
		runner.upgradeSpeed(5);
		expect(runner.speed).to.equal(initialSpeed + 5);
	});

	it('increases hit points when upgraded', () => {
		const initialHP = runner.hitPoints;
		runner.upgradeHitPoints(15);
		expect(runner.hitPoints).to.equal(initialHP + 15);
	});

	xit('moves to prize location', () => {
		const runnerMovedSpy = cy.spy();
		runner.on('runnerMoved', runnerMovedSpy);

		runner.moveToPrize(mockPrize);

		expect(runner.position.x).not.to.equal(0);
		expect(runner.position.y).not.to.equal(0);
		expect(runnerMovedSpy).to.be.called;
	});

	xit('picks up prize when reached', () => {
		runner.position = mockPrize.position.clone();
		runner.moveToPrize(mockPrize);

		expect(runner.prize).to.equal(mockPrize);
	});

	xit('returns to tower with prize', () => {
		const runnerReturnedSpy = cy.spy();
		runner.on('runnerReturned', runnerReturnedSpy);

		runner.prize = mockPrize;
		runner.returnToTower(mockTower);

		// Check that it's moving toward the tower
		expect(runner.position.x).not.to.equal(mockPrize.position.x);
		expect(runner.position.y).not.to.equal(mockPrize.position.y);
	});

	xit('emits runnerReturned when reaching tower with prize', () => {
		const runnerReturnedSpy = cy.spy();
		runner.on('runnerReturned', runnerReturnedSpy);

		runner.prize = mockPrize;
		runner.position = mockTower.position.clone();
		runner.returnToTower(mockTower);

		expect(runnerReturnedSpy).to.be.calledWith(runner, mockPrize);
		expect(runner.prize).to.be.null;
	});

	it('should pick up a prize', () => {
		runner.pickUpPrize(mockPrize);
		expect(runner.prize).to.equal(mockPrize);
	});

	it('drops prize when instructed to', () => {
		runner.pickUpPrize(mockPrize);
		const droppedPrize = runner.dropPrize();
		expect(droppedPrize).to.equal(mockPrize);
		expect(runner.prize).to.be.null;
	});

	xit('drops prize when destroyed', () => {
		const runnerDestroyedSpy = cy.spy();
		runner.on('runnerDestroyed', runnerDestroyedSpy);

		runner.prize = mockPrize;
		runner.hitPoints = 15;
		runner.takeDamage(20);

		expect(runner.hitPoints).to.equal(0);
		expect(runnerDestroyedSpy).to.be.calledWith(runner, mockPrize);
	});

	xit('handles missile hit and takes damage', () => {
		const initialHP = runner.hitPoints;
		runner.onMissileHit(mockMissile);
		expect(runner.hitPoints).to.equal(initialHP - mockMissile.ammo.damage);
	});

	it('does not move below zero hit points', () => {
		runner.takeDamage(Runner.DEFAULT_HIT_POINTS + 20);
		expect(runner.hitPoints).to.equal(0);
	});

	it('cannot pick up prize when already carrying one', () => {
		const firstPrize = new Prize({
			value: 10,
			type: PrizeType.GUN,
			position: new Position(50, 50)
		});
		runner.pickUpPrize(mockPrize);
		runner.pickUpPrize(firstPrize);
		expect(runner.prize).to.equal(mockPrize);
	});
	// TODO: All the events
	xit('does not emit runnerReturned when reaching tower without prize', () => {
		const runnerReturnedSpy = cy.spy();
		runner.on('runnerReturned', runnerReturnedSpy);

		runner.position = mockTower.position.clone();
		runner.returnToTower(mockTower);

		expect(runnerReturnedSpy).not.to.be.called;
	});
});