import {Given, When, Then, Before} from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the website', () => {
	cy.visit('/');
});

Given('I am on the "Select Cars" screen', () => {
	cy.visit('/');
	cy.get('[data-testid=select-cars]').click();
});

Given('I have a car in the Selected List', () => {
	cy.get('[data-testid=car-selection-list] li:first-child').click();
});

When('I navigate to the "Select Cars" page', () => {
	cy.get('[data-testid=select-cars]').click();
});

When('I select a car from the list', () => {
	cy.get('[data-testid=car-selection-list] li:first-child').click();
});

When('I select a car from the selected list', () => {
	cy.get('[data-testid=car-selected-list] li:first-child').click();
});

When('I have selected 1 car', () => {
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
});

When('I have selected 2 cars', () => {
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
});

When('I have selected 4 cars', () => {
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
	cy.get('[data-testid=car-selection-list] li:first-child').click();
	cy.get('[data-testid=button-select-car]').click();
});

Then('I should see the {string} page', (page) => {
	page = `${page.toLowerCase().replaceAll(' ', '-')}-page`;
	cy.get(`[data-testid=${page}]`).should('be.visible');
});

Then('I should see the {string} title', (title) => {
	title = `${title.toLowerCase().replaceAll(' ', '-')}-title`;
	cy.get(`[data-testid=${title}]`).should('be.visible');
});

Then('I should see the a Selection list of 8 cars', () => {
	cy.get('[data-testid=car-selection-list]').should('be.visible');
	cy.get('[data-testid=car-selection-list] li').should('have.length', 8);
});

Then('I should see the a Selection list of 8 cars', () => {
	cy.get('[data-testid=car-selection-list]').should('be.visible');
	cy.get('[data-testid=car-selection-list] li').should('have.length', 8);
});

Then('I should see a blank Selected list', () => {
	cy.get('[data-testid=car-selected-list]').should('be.visible');
	cy.get('[data-testid=car-selected-list] li').should('have.length', 0);
});

Then('I should see the selected car highlighted', () => {
	cy.get('[data-testid=car-selection-list] li:first-child').should('have.class', 'selected');
});

Then('I should not see any car in the Selected list highlighted', () => {
	cy.get('[data-testid=car-selection-list] li.selected').should('have.length', 1);
});

Then('I should see the car in the selected cars list', () => {
	cy.get('[data-testid=car-selected-list] li').should('have.length', 1);
	cy.get('[data-testid=car-selected-list] li:first-child').should('be.visible');
	cy.get('[data-testid=car-selected-list] li:first-child').should('contain.text', 'Car 1');
	cy.get('[data-testid=car-selected-list] li:first-child').should('not.have.class', 'selected');
});

Then('I should NOT see the car in the Selection cars list', () => {
	cy.get('[data-testid=car-selection-list] li').should('have.length', 7);
	cy.get('[data-testid=car-selection-list] li.selected').should('not.exist');
	cy.get('[data-testid=car-selection-list] li:first-child').should('not.contain.text', 'Car 1');
});

Then('I should see the car in the selected list highlighted', () => {
	cy.get('[data-testid=car-selected-list] li:first-child').should('have.class', 'selected');
});

Then('I should see the car in the Selection list', () => {
	cy.get('[data-testid=car-selection-list] li').should('have.length', 8);
	cy.get('[data-testid=car-selection-list] li.selected').should('not.exist');
	cy.get('[data-testid=car-selection-list] li').contains('Car 1').should('exist');
});

Then('I should NOT see the car in the Selected cars list', () => {
	cy.get('[data-testid=car-selected-list] li').contains('Car 1').should('not.exist');
});

Then('I should see the "Maximum number of cars selected" message appear', () => {
	cy.get('[data-testid=maximum-number-message]').should('be.visible');
});

Then('I should NOT see the "Maximum number of cars selected" message appear', () => {
	cy.get('[data-testid=maximum-number-message]').should('not.be.visible');
});

Then('I should NOT be able to click on any cars in the Selection list', () => {
	cy.get('[data-testid=car-selection-list] li').each((item) => {
		cy.wrap(item).should('be.disabled');
	});
});
