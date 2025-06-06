import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the "Select Venue" screen', () => {
	cy.visit('/');
	cy.get('[data-testid=button-select-cars]').click();
	cy.get('[data-testid=car-selection-list] li:first-child button').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child button').click();
	cy.get('[data-testid=button-select-car]').click();
});

When('I select a venue from the list', () => {});

When('I navigate to the "Select Venue" page', () => {});

When('I select the same venue from the list', () => {});

When('I select another venue from the list', () => {});

Then('I should see the "Select Venue" title', () => {});

Then('I should see the a Selection list of 3 venues', () => {});

Then('I should see the selected venue highlighted', () => {});

Then('The venue should be deselected', () => {});

Then('The first venue should be deselected', () => {});

Then('The second venue should be selected', () => {});

Then('I should go to the Racing screen', () => {});