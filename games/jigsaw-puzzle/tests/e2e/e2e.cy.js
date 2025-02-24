describe('When I do my thing with the Jigsaw Puzzle Screen', () => {
	beforeEach(() => {
		cy.visit('http://localhost:4173');
	});

	const testBeginScreen = () => {
		cy.get('[data-testid="button-new"]').should('not.be.disabled');
		cy.get('[data-testid="button-start"]').should('be.disabled');
		cy.get('[data-testid="button-pause"]').should('be.disabled');
		cy.get('[data-testid="button-continue"]').should('be.disabled');
		cy.get('[data-testid="button-exit"]').should('not.be.disabled');
		cy.get('[data-testid="button-cancel"]').should('be.disabled');

		cy.get('[data-testid="new-game-dialog"]').should('not.be.visible');
		cy.get('[data-testid="blank-screen"]').should('be.visible');
		cy.get('[data-testid="puzzle"]').should('not.be.visible');
		cy.get('[data-testid="puzzle-information"]').should('not.be.visible');
	}

	const testReadyScreen = () => {
		cy.get('[data-testid="button-new"]').should('not.be.disabled');
		cy.get('[data-testid="button-start"]').should('not.be.disabled');
		cy.get('[data-testid="button-pause"]').should('be.disabled');
		cy.get('[data-testid="button-continue"]').should('be.disabled');
		cy.get('[data-testid="button-exit"]').should('not.be.disabled');
		cy.get('[data-testid="button-cancel"]').should('not.be.disabled');

		cy.get('[data-testid="new-game-dialog"]').should('not.be.visible');
		cy.get('[data-testid="puzzle"]').should('be.visible');
		cy.get('[data-testid="puzzle-information"]').should('be.visible');
		cy.get('[data-testid="blank-screen"]').should('not.be.visible');
	};

	it('should initially display the Begin screen', () => {
		testBeginScreen();
	});

	it('should be on Begin screen when New Game / Cancel is clicked', () => {
		cy.get('[data-testid="button-new"]').click();
		cy.get('[data-testid="new-game-dialog"]').should('be.visible');
		cy.get('[data-testid="new-dialog-button-cancel"]').click();
		cy.get('[data-testid="new-game-dialog"]').should('not.be.visible');
		testBeginScreen();
	});

	it('should end on the Ready screen when New Game / Continue is clicked', () => {
		cy.get('[data-testid="button-new"]').click();
		cy.get('[data-testid="new-game-dialog-image-list"] ul li:first-child button').click();
		cy.get('[data-testid="new-game-dialog-cut-list"] ul li:first-child button').click();
		cy.get('[data-testid="new-game-dialog-numpiece-list"] ul li:first-child button').click();
		cy.get('[data-testid="new-dialog-button-continue"]').click();

		testReadyScreen();
		cy.get('[data-testid="puzzle-information"]').should('be.visible');
		cy.get('[data-testid="puzzle-information"] span.puzzle-name').should('have.text', 'My Favorite Beach');
		cy.get('[data-testid="puzzle-information"] span.puzzle-cut').should('have.text', 'Square');
		cy.get('[data-testid="puzzle-information"] span.puzzle-num-pieces').should('have.text', '8');

		cy.get('[data-testid="puzzle"] img').should('be.visible');
	});

});