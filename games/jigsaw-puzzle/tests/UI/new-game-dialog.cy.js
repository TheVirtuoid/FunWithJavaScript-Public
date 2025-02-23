import {imagesLength, cutsLength, numPiecesLength} from '../support.js';

describe('When I click on the New Game button', () => {
	beforeEach(() => {
		cy.visit('http://localhost:4173');
		cy.get('[data-testid="button-new"]').click();
	});

	it('should display the new game dialog', () => {
		cy.get('[data-testid="new-game-dialog"]').should('exist');
	});

	it('should display the images in the "select image" element', () => {
		cy.get('[data-testid="new-game-dialog-image-list"] ul').should('exist');
		cy.get('[data-testid="new-game-dialog-image-list"] ul li').should('have.length', imagesLength);
	});

	it('should display the images in the "select cuts" element', () => {
		cy.get('[data-testid="new-game-dialog-cut-list"] ul').should('exist');
		cy.get('[data-testid="new-game-dialog-cut-list"] ul li').should('have.length', cutsLength);
	});

	it('should display the images in the "select pieces" element', () => {
		cy.get('[data-testid="new-game-dialog-numpiece-list"] ul').should('exist');
		cy.get('[data-testid="new-game-dialog-numpiece-list"] ul li').should('have.length', numPiecesLength);
	});

	it('should have the Continue button disabled, the Cancel button enabled', () => {
		cy.get('[data-testid="new-dialog-button-continue"]').should('be.disabled');
		cy.get('[data-testid="new-dialog-button-cancel"]').should('not.be.disabled');
	});

	it('should not activate the continue button until all selections are made', () => {
		cy.get('[data-testid="new-dialog-button-continue"]').should('be.disabled');
		cy.get('[data-testid="new-game-dialog-image-list"] ul li:first-child button').click();
		cy.get('[data-testid="new-dialog-button-continue"]').should('be.disabled');
		cy.get('[data-testid="new-game-dialog-cut-list"] ul li:first-child button').click();
		cy.get('[data-testid="new-dialog-button-continue"]').should('be.disabled');
		cy.get('[data-testid="new-game-dialog-numpiece-list"] ul li:first-child button').click();
		cy.get('[data-testid="new-dialog-button-continue"]').should('not.be.disabled');
	});
});