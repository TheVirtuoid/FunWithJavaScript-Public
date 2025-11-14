// ActionButton.cy.js
import ActionButton from './ActionButton'; // adjust path as needed

describe('ActionButton', () => {
	let button;

	beforeEach(() => {
		button = new ActionButton({
			label: 'Default Label',
			action: () => {},
		});
	});

	context('constructor & id', () => {
		it('generates an id by default', () => {
			expect(button.id).to.be.a('string');
			expect(button.id).to.not.be.empty;
		});

		it('uses the provided id when passed', () => {
			const customId = 'test-id';
			const btn = new ActionButton({
				id: customId,
				label: 'Label',
				action: () => {},
			});

			expect(btn.id).to.equal(customId);
		});

		it('treats id as read-only', () => {
			expect(() => {
				button.id = 'new-id';
			}).to.throw();
		});
	});

	context('constructor & defaults', () => {
		it('sets required fields and default flags', () => {
			const action = cy.stub().as('clickAction');
			const btn = new ActionButton({
				label: 'Click Me',
				action,
			});

			expect(btn.label).to.equal('Click Me');
			expect(btn.action).to.equal(action);
			expect(btn.disabled).to.be.false;
			expect(btn.hidden).to.be.false;
		});

		it('defaults classList to an empty array', () => {
			const btn = new ActionButton({
				label: 'No Classes',
				action: () => {},
			});

			expect(btn.classList).to.be.an('array');
			expect(btn.classList).to.have.length(0);
		});

		it('honors explicit disabled, hidden, and classList', () => {
			const classes = ['primary', 'large'];

			const btn = new ActionButton({
				label: 'Configured',
				action: () => {},
				disabled: true,
				hidden: true,
				classList: classes,
			});

			expect(btn.disabled).to.be.true;
			expect(btn.hidden).to.be.true;
			expect(btn.classList).to.deep.equal(classes);
		});
	});

	context('property immutability', () => {
		it('treats label as read-only from the outside', () => {
			expect(() => {
				button.label = 'New Label';
			}).to.throw();
		});

		it('treats action as read-only from the outside', () => {
			expect(() => {
				button.action = () => {};
			}).to.throw();
		});

		it('treats disabled as read-only from the outside', () => {
			expect(() => {
				button.disabled = true;
			}).to.throw();
		});

		it('treats hidden as read-only from the outside', () => {
			expect(() => {
				button.hidden = true;
			}).to.throw();
		});

		it('treats classList as read-only reference from the outside', () => {
			expect(() => {
				button.classList = ['changed'];
			}).to.throw();
		});
	});

	context('setAction', () => {
		it('updates the action', () => {
			const original = cy.stub().as('originalAction');
			const updated = cy.stub().as('updatedAction');

			const btn = new ActionButton({
				label: 'Label',
				action: original,
			});

			btn.setAction(updated);

			expect(btn.action).to.equal(updated);
		});
	});

	context('setDisabled', () => {
		it('sets disabled to true', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
			});

			btn.setDisabled(true);

			expect(btn.disabled).to.be.true;
		});

		it('sets disabled to false', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
				disabled: true,
			});

			btn.setDisabled(false);

			expect(btn.disabled).to.be.false;
		});
	});

	context('setHidden', () => {
		it('sets hidden to true', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
			});

			btn.setHidden(true);

			expect(btn.hidden).to.be.true;
		});

		it('sets hidden to false', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
				hidden: true,
			});

			btn.setHidden(false);

			expect(btn.hidden).to.be.false;
		});
	});

	context('setLabel', () => {
		it('sets the label', () => {
			const btn = new ActionButton({
				label: 'Original',
				action: () => {},
			});

			btn.setLabel('Updated');

			expect(btn.label).to.equal('Updated');
		});

		it('overwrites an existing label', () => {
			const btn = new ActionButton({
				label: 'First',
				action: () => {},
			});

			btn.setLabel('Second');

			expect(btn.label).to.equal('Second');
		});
	});

	context('setClassList', () => {
		it('sets classList', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
			});

			const newClasses = ['primary', 'rounded'];

			btn.setClassList(newClasses);

			expect(btn.classList).to.deep.equal(newClasses);
		});

		it('replaces existing classList with a new array', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
				classList: ['small'],
			});

			const replacement = ['large', 'secondary'];

			btn.setClassList(replacement);

			expect(btn.classList).to.deep.equal(replacement);
		});

		it('allows setting classList to an empty array', () => {
			const btn = new ActionButton({
				label: 'Label',
				action: () => {},
				classList: ['to-be-cleared'],
			});

			btn.setClassList([]);

			expect(btn.classList).to.be.an('array');
			expect(btn.classList).to.have.length(0);
		});
	});
});