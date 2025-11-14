import ActionButtons from './ActionButtons'; // adjust as needed

describe('ActionButtons', () => {
	let buttons;

	beforeEach(() => {
		buttons = new ActionButtons();
	});

	context('constructor & id', () => {
		it('generates an id by default', () => {
			expect(buttons.id).to.be.a('string');
			expect(buttons.id).to.not.be.empty;
		});

		it('uses the provided id when passed', () => {
			const customId = 'test-id';
			const withId = new ActionButtons({ id: customId });

			expect(withId.id).to.equal(customId);
		});

		it('treats id as read-only', () => {
			expect(() => { buttons.id = 'new-id'; }).to.throw();
		});
	});

	context('addButton', () => {
		it('adds a button with required fields and default flags', () => {
			const TYPE = Symbol('TRY_AGAIN');
			const action = cy.stub().as('tryAgainAction');

			buttons.addButton({
				type: TYPE,
				label: 'Try Again',
				action,
			});

			const btn = buttons.getButton(TYPE); // or whatever accessor you provide

			expect(btn.type).to.equal(TYPE);
			expect(btn.label).to.equal('Try Again');
			expect(btn.action).to.equal(action);
			expect(btn.disabled).to.be.false;
			expect(btn.hidden).to.be.false;
		});

		it('honors explicit disabled and hidden flags', () => {
			const TYPE = Symbol('GO_BACK');
			const action = cy.stub().as('goBackAction');

			buttons.addButton({
				type: TYPE,
				label: 'Go Back',
				action,
				disabled: true,
				hidden: true,
			});

			const btn = buttons.getButton(TYPE);

			expect(btn.disabled).to.be.true;
			expect(btn.hidden).to.be.true;
		});
	});

	context('removeButton', () => {
		it('removes an existing button', () => {
			const A = Symbol('A');
			const B = Symbol('B');

			buttons.addButton({ type: A, label: 'A', action: () => {} });
			buttons.addButton({ type: B, label: 'B', action: () => {} });

			buttons.removeButton(A);

			expect(buttons.getButton(A)).to.be.undefined;
			expect(buttons.getButton(B)).to.exist;
		});

		it('is a no-op when type is not found', () => {
			const A = Symbol('A');

			buttons.addButton({ type: A, label: 'A', action: () => {} });

			expect(() => {
				buttons.removeButton(Symbol('NON_EXISTENT'));
			}).not.to.throw();

			expect(buttons.getButton(A)).to.exist;
		});
	});

	context('setButtonAction', () => {
		it('updates the action for an existing button', () => {
			const A = Symbol('A');
			const original = cy.stub().as('originalAction');
			const updated = cy.stub().as('updatedAction');

			buttons.addButton({ type: A, label: 'A', action: original });

			buttons.setButtonAction(A, updated);

			const btn = buttons.getButton(A);
			expect(btn.action).to.equal(updated);
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			const original = cy.stub().as('originalAction');

			buttons.addButton({ type: A, label: 'A', action: original });

			buttons.setButtonAction(Symbol('NON_EXISTENT'), cy.stub().as('otherAction'));

			const btn = buttons.getButton(A);
			expect(btn.action).to.equal(original);
		});
	});

	context('setDisabled', () => {
		it('sets disabled to true for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {} });

			buttons.setDisabled(A, true);

			const btn = buttons.getButton(A);
			expect(btn.disabled).to.be.true;
		});

		it('sets disabled to false for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, disabled: true });

			buttons.setDisabled(A, false);

			const btn = buttons.getButton(A);
			expect(btn.disabled).to.be.false;
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, disabled: false });

			buttons.setDisabled(Symbol('NON_EXISTENT'), true);

			const btn = buttons.getButton(A);
			expect(btn.disabled).to.be.false;
		});
	});

	context('setHidden', () => {
		it('sets hidden to true for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {} });

			buttons.setHidden(A, true);

			const btn = buttons.getButton(A);
			expect(btn.hidden).to.be.true;
		});

		it('sets hidden to false for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, hidden: true });

			buttons.setHidden(A, false);

			const btn = buttons.getButton(A);
			expect(btn.hidden).to.be.false;
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, hidden: false });

			buttons.setHidden(Symbol('NON_EXISTENT'), true);

			const btn = buttons.getButton(A);
			expect(btn.hidden).to.be.false;
		});
	});
});