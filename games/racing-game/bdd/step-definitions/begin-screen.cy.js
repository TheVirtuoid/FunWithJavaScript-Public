import {Given, When, Then, Before} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
	cy.clearCookies();
	cy.clearLocalStorage();
})

Given('I navigate to the "begin" page', () => {
	cy.visit('/index.html');
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










































