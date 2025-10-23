
import KeyboardLayout from "./KeyboardLayout.js";
import { MockVector } from "../../../../tdd-utilities/tddUtilities.js";
import GameEvent from "../../../../snake-base/GameEvent/GameEvent.js";

describe('And when I work with the KeyboardLayout class', () => {
	describe('And when I work with the constructor', () => {
		it('should throw an error as this is a static class', () => {
			expect(() => new KeyboardLayout()).to.throw();
		});
	});

	describe('And when I work with the WASD layout', () => {
		beforeEach(() => {
			KeyboardLayout.Setup(MockVector);
		});

		it('should be defined as a Map', () => {
			expect(KeyboardLayout.WASD).to.be.instanceOf(Map);
		});

		describe('And when I check the movement keys', () => {
			it('should have W key mapped to UP action with Up vector', () => {
				const wMapping = KeyboardLayout.WASD.get('KeyW');
				expect(wMapping).to.exist;
				expect(wMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(wMapping.direction.equals(MockVector.Up())).to.be.true;
			});

			it('should have S key mapped to DOWN action with Down vector', () => {
				const sMapping = KeyboardLayout.WASD.get('KeyS');
				expect(sMapping).to.exist;
				expect(sMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(sMapping.direction.equals(MockVector.Down())).to.be.true;
			});

			it('should have A key mapped to LEFT action with Left vector', () => {
				const aMapping = KeyboardLayout.WASD.get('KeyA');
				expect(aMapping).to.exist;
				expect(aMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(aMapping.direction.equals(MockVector.Left())).to.be.true;
			});

			it('should have D key mapped to RIGHT action with Right vector', () => {
				const dMapping = KeyboardLayout.WASD.get('KeyD');
				expect(dMapping).to.exist;
				expect(dMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(dMapping.direction.equals(MockVector.Right())).to.be.true;
			});
		});

		describe('And when I check the control keys', () => {
			it('should have P key mapped to PAUSE action with null vector', () => {
				const pMapping = KeyboardLayout.WASD.get('KeyP');
				expect(pMapping).to.exist;
				expect(pMapping.action).to.equal(GameEvent.DEVICE_GAME_PAUSE);
				expect(pMapping.direction).to.be.null;
			});

			it('should have R key mapped to RESUME action with null vector', () => {
				const rMapping = KeyboardLayout.WASD.get('KeyR');
				expect(rMapping).to.exist;
				expect(rMapping.action).to.equal(GameEvent.DEVICE_GAME_RESUME);
				expect(rMapping.direction).to.be.null;
			});

			it('should have ESC key mapped to EXIT action with null vector', () => {
				const escMapping = KeyboardLayout.WASD.get('Escape');
				expect(escMapping).to.exist;
				expect(escMapping.action).to.equal(GameEvent.DEVICE_GAME_EXIT);
				expect(escMapping.direction).to.be.null;
			});
		});
	});

	describe('And when I work with the ARROW layout', () => {
		it('should be defined as a Map', () => {
			expect(KeyboardLayout.ARROW).to.be.instanceOf(Map);
		});

		describe('And when I check the movement keys', () => {
			it('should have UpArrow key mapped to UP action with Up vector', () => {
				const upMapping = KeyboardLayout.ARROW.get('ArrowUp');
				expect(upMapping).to.exist;
				expect(upMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(upMapping.direction.equals(MockVector.Up())).to.be.true;
			});

			it('should have DownArrow key mapped to DOWN action with Down vector', () => {
				const downMapping = KeyboardLayout.ARROW.get('ArrowDown');
				expect(downMapping).to.exist;
				expect(downMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(downMapping.direction.equals(MockVector.Down())).to.be.true;
			});

			it('should have LeftArrow key mapped to LEFT action with Left vector', () => {
				const leftMapping = KeyboardLayout.ARROW.get('ArrowLeft');
				expect(leftMapping).to.exist;
				expect(leftMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(leftMapping.direction.equals(MockVector.Left())).to.be.true;
			});

			it('should have RightArrow key mapped to RIGHT action with Right vector', () => {
				const rightMapping = KeyboardLayout.ARROW.get('ArrowRight');
				expect(rightMapping).to.exist;
				expect(rightMapping.action).to.equal(GameEvent.DEVICE_CHANGE_DIRECTION);
				expect(rightMapping.direction.equals(MockVector.Right())).to.be.true;
			});
		});

		describe('And when I check the control keys', () => {
			it('should have P key mapped to PAUSE action with null vector', () => {
				const pMapping = KeyboardLayout.ARROW.get('KeyP');
				expect(pMapping).to.exist;
				expect(pMapping.action).to.equal(GameEvent.DEVICE_GAME_PAUSE);
				expect(pMapping.direction).to.be.null;
			});

			it('should have R key mapped to RESUME action with null vector', () => {
				const rMapping = KeyboardLayout.ARROW.get('KeyR');
				expect(rMapping).to.exist;
				expect(rMapping.action).to.equal(GameEvent.DEVICE_GAME_RESUME);
				expect(rMapping.direction).to.be.null;
			});

			it('should have ESC key mapped to EXIT action with null vector', () => {
				const escMapping = KeyboardLayout.ARROW.get('Escape');
				expect(escMapping).to.exist;
				expect(escMapping.action).to.equal(GameEvent.DEVICE_GAME_EXIT);
				expect(escMapping.direction).to.be.null;
			});
		});
	});
});