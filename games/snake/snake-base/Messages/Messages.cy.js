
import GameEvent from '../GameEvent/GameEvent.js';
import Messages from './Messages.js';

describe('Messages', () => {
	let instance;
	let testId;

	beforeEach(() => {
		testId = 'test message id';
	});

	describe('Constructor', () => {
		it('should create an instance with default id', () => {
			instance = new Messages();
			expect(instance).to.be.instanceOf(Messages);
			expect(instance.id).to.be.a('string');
		});

		it('should create an instance with provided id', () => {
			instance = new Messages({ id: testId });
			expect(instance.id).to.equal(testId);
		});

		it('should initialize with default messages', () => {
			instance = new Messages();
			const allMessages = instance.getAll();
			expect(allMessages).to.be.instanceOf(Map);
			expect(allMessages.size).to.be.greaterThan(0);
		});

		it('should have all required default messages', () => {
			instance = new Messages();

			expect(instance.get(GameEvent.GAME_OVER)).to.not.be.undefined;
			expect(instance.get(GameEvent.GAME_EVENT_INITIALIZED)).to.not.be.undefined;
			expect(instance.get(GameEvent.SNAKE_COLLISION_WALL)).to.not.be.undefined;
			expect(instance.get(GameEvent.SNAKE_COLLISION_SELF)).to.not.be.undefined;
			expect(instance.get(GameEvent.SNAKE_COLLISION_PRIZE)).to.not.be.undefined;
			expect(instance.get(GameEvent.SNAKE_MOVE)).to.not.be.undefined;
			expect(instance.get(GameEvent.SNAKE_DIRECTION_CHANGED)).to.not.be.undefined;
			expect(instance.get(GameEvent.SNAKE_JUMPED)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_CHANGE_DIRECTION)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_CHANGE_SPEED)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_GAME_EXIT)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_GAME_PAUSE)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_GAME_RESUME)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_GAME_RESET)).to.not.be.undefined;
			expect(instance.get(GameEvent.INPUT_GAME_START)).to.not.be.undefined;
			expect(instance.get(GameEvent.GAME_EXIT)).to.not.be.undefined;
			expect(instance.get(GameEvent.GAME_PAUSE)).to.not.be.undefined;
			expect(instance.get(GameEvent.GAME_RESUME)).to.not.be.undefined;
			expect(instance.get(GameEvent.GAME_RESET)).to.not.be.undefined;
			expect(instance.get(GameEvent.GAME_START)).to.not.be.undefined;
			expect(instance.get(GameEvent.DEVICE_CHANGE_DIRECTION)).to.not.be.undefined;
			expect(instance.get(GameEvent.DEVICE_GAME_EXIT)).to.not.be.undefined;
			expect(instance.get(GameEvent.DEVICE_GAME_PAUSE)).to.not.be.undefined;
			expect(instance.get(GameEvent.DEVICE_GAME_RESUME)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_START_COUNTDOWN_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_COUNTDOWN_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_COUNTDOWN_TICK_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_CLEAR_COUNTDOWN_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_CLEAR_GAME_OVER_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_DRAW_GAME_OVER_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_CLEAR_SCORE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_UPDATE_SCORE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_DRAW_SCORE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_CLEAR_PRIZE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_DRAW_PRIZE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_CLEAR_SNAKE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_DRAW_SNAKE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_UPDATE_SNAKE_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_CLEAR_PITCH_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_DRAW_PITCH_COMPLETE)).to.not.be.undefined;
			expect(instance.get(GameEvent.UI_RESET_PITCH_COMPLETE)).to.not.be.undefined;
			expect(instance.get(Messages.TITLE)).to.not.be.undefined;
			expect(instance.get(Messages.STATS_TITLE)).to.not.be.undefined;
			expect(instance.get(Messages.STATS_SCORE)).to.not.be.undefined;
			expect(instance.get(Messages.STATS_LENGTH)).to.not.be.undefined;
		});
	});

	describe('Properties', () => {
		beforeEach(() => {
			instance = new Messages({ id: testId });
		});

		it('should have read-only id property', () => {
			expect(() => instance.id = 'new-id').to.throw();
		});
	});

	describe('Methods', () => {
		beforeEach(() => {
			instance = new Messages({ id: testId });
		});

		describe('add()', () => {
			it('should add a new message', () => {
				const messageId = 'TEST_MESSAGE';
				const message = 'This is a test message';

				instance.add(messageId, message);

				expect(instance.get(messageId)).to.equal(message);
			});

			it('should replace an existing message', () => {
				const messageId = GameEvent.GAME_OVER;
				const originalMessage = instance.get(messageId);
				const newMessage = 'Custom game over message';

				instance.add(messageId, newMessage);

				expect(instance.get(messageId)).to.equal(newMessage);
				expect(instance.get(messageId)).to.not.equal(originalMessage);
			});

			it('should handle multiple messages being added', () => {
				instance.add('MESSAGE_1', 'First message');
				instance.add('MESSAGE_2', 'Second message');
				instance.add('MESSAGE_3', 'Third message');

				expect(instance.get('MESSAGE_1')).to.equal('First message');
				expect(instance.get('MESSAGE_2')).to.equal('Second message');
				expect(instance.get('MESSAGE_3')).to.equal('Third message');
			});
		});

		describe('get()', () => {
			it('should retrieve an existing message', () => {
				const message = instance.get(GameEvent.GAME_START);
				expect(message).to.equal('Game start');
			});

			it('should return undefined for non-existent message', () => {
				const message = instance.get('NON_EXISTENT_MESSAGE');
				expect(message).to.be.undefined;
			});

			it('should retrieve custom added message', () => {
				const messageId = 'CUSTOM_MESSAGE';
				const messageText = 'Custom message text';

				instance.add(messageId, messageText);

				expect(instance.get(messageId)).to.equal(messageText);
			});
		});

		describe('getAll()', () => {
			it('should return a Map', () => {
				const allMessages = instance.getAll();
				expect(allMessages).to.be.instanceOf(Map);
			});

			it('should return all messages including default ones', () => {
				const allMessages = instance.getAll();
				expect(allMessages.size).to.be.greaterThan(40); // We have 41 default messages
			});

			it('should return all messages including custom ones', () => {
				instance.add('CUSTOM_1', 'Custom message 1');
				instance.add('CUSTOM_2', 'Custom message 2');

				const allMessages = instance.getAll();

				expect(allMessages.has('CUSTOM_1')).to.be.true;
				expect(allMessages.has('CUSTOM_2')).to.be.true;
				expect(allMessages.get('CUSTOM_1')).to.equal('Custom message 1');
				expect(allMessages.get('CUSTOM_2')).to.equal('Custom message 2');
			});

			it('should have messageId as key and message as value', () => {
				const allMessages = instance.getAll();
				const gameOverMessage = allMessages.get(GameEvent.GAME_OVER);

				expect(gameOverMessage).to.not.be.undefined;
			});
		});

		describe('remove()', () => {
			it('should remove an existing message', () => {
				const messageId = 'TEST_MESSAGE';
				instance.add(messageId, 'Test message');
				expect(instance.get(messageId)).to.equal('Test message');
				instance.remove(messageId);
				expect(instance.get(messageId)).to.be.undefined;
			});

			it('should remove a default message', () => {
				instance.remove(GameEvent.GAME_OVER);
				expect(instance.get(GameEvent.GAME_OVER)).to.be.undefined;
			});

			it('should handle removing non-existent message gracefully', () => {
				expect(() => instance.remove('NON_EXISTENT')).to.not.throw();
			});

			it('should only remove specified message', () => {
				const sizeBefore = instance.getAll().size;
				instance.remove(GameEvent.GAME_OVER);
				const sizeAfter = instance.getAll().size;
				expect(sizeAfter).to.equal(sizeBefore - 1);
			});
		});

		describe('removeAll()', () => {
			it('should remove all messages', () => {
				instance.removeAll();
				const allMessages = instance.getAll();
				expect(allMessages.size).to.equal(0);
			});

			it('should remove custom messages', () => {
				instance.add('CUSTOM_MESSAGE', 'Custom');
				instance.removeAll();
				expect(instance.get('CUSTOM_MESSAGE')).to.be.undefined;
			});

			it('should allow adding messages after removeAll', () => {
				instance.removeAll();
				instance.add('NEW_MESSAGE', 'New message after clear');
				expect(instance.get('NEW_MESSAGE')).to.equal('New message after clear');
				expect(instance.getAll().size).to.equal(1);
			});
		});
	});
});