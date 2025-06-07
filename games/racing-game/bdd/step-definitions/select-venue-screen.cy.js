import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the "Select Venue" screen', () => {
	cy.visit('/');
	cy.get('[data-testid=button-select-cars]').click();
	cy.get('[data-testid=car-selection-list] li:first-child button').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child button').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=button-select-venue]').click();
});

When('I select a venue from the list', () => {
	cy.get('[data-testid=venue-selection-list] li:first-child button').click();
});

When('I navigate to the "Select Venue" page', () => {
	cy.visit('/');
	cy.get('[data-testid=button-select-cars]').click();
	cy.get('[data-testid=car-selection-list] li:first-child button').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child button').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=button-select-venue]').click();
});

When('I select the same venue from the list', () => {
	cy.get('[data-testid=venue-selection-list] li:first-child button').click();
	cy.get('[data-testid=venue-selection-list] li:first-child button').click();
});

When('I select another venue from the list', () => {
	cy.get('[data-testid=venue-selection-list] li:nth-child(2) button').click();
});

Then('I should see the "Select Venue" title', () => {
	cy.get('[data-testid=select-venue-title]').should('be.visible').and('contain.text', 'Select Venue');
});

Then('I should see the a Selection list of 3 venues', () => {
	cy.get('[data-testid=venue-selection-list] li').should('have.length', 3);
});

Then('I should see the selected venue highlighted', () => {
	cy.get('[data-testid=venue-selection-list] li:first-child').should('have.class', 'selected');
});

Then('The venue should be deselected', () => {
	cy.get('[data-testid=venue-selection-list] li:first-child').should('not.have.class', 'selected');
});

Then('The first venue should be deselected', () => {
	cy.get('[data-testid=venue-selection-list] li:first-child').should('not.have.class', 'selected');
});

Then('The second venue should be selected', () => {
	cy.get('[data-testid=venue-selection-list] li:nth-child(2)').should('have.class', 'selected');
});
