import { images, imagesLength } from '../support.js';

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
});