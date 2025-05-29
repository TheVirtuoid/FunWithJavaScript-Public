import {Given, When, Then, Before} from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the website', () => {
	cy.visit('/');
});

When('I navigate to the "Select Cars" page', () => {
	cy.get('[data-testid=select-cars]').click();
});

Then('I should see the {string} page', (page) => {
	cy.get(`[data-testid=${page.toLowerCase().replace(/\s+/g, '-')}-screen]`).should('be.visible');
});

When('The first screen appears', () => {
	// nothing here! We just want to look at the screen
});

Then('I should see the header menu', () => {
	cy.get('[data-testid=header] [data-testid=actions]').should('be.visible');
});

Then('I should see the main', () => {
	cy.get('[data-testid=main]').should('be.visible');
});

Then('I should see the footer', () => {
	cy.get('[data-testid=footer]').should('be.visible');
});

Then('I should see the "racing game" title', () => {
	cy.get('[data-testid=begin-screen]').should('be.visible')
		.should('have.text', 'racing game');
});

Then('I should not see the "select cars" screen', () => {
	cy.get('[data-testid=select-cars-screen]').should('not.be.visible');
});

Then('I should not see the "select venue" screen', () => {
	cy.get('[data-testid=select-venue-screen]').should('not.be.visible');
});

Then('I should not see the "venue" screen', () => {
	cy.get('[data-testid=venue-screen]').should('not.be.visible');
});

Then('I should see the "Select Cars" screen', () => {
	cy.get('[data-testid=begin-screen]').should('not.be.visible');
	cy.get('[data-testid=select-cars-screen]').should('be.visible');
});

Then('I should see the "Confirm Exit" dialog box', () => {
	cy.get('[data-testid=exit-game-dialog]').should('be.visible');
});

Then('I should see no other buttons than the ones mentioned', () => {
	cy.get('#actions > button').should('have.length', buttons.size);
	buttons.forEach((value, key) => {
		cy.get(`[data-testid=${value}]`).should('be.visible');
	});
});








































