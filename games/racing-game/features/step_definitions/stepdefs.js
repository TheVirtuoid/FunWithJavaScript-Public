import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

const isItFriday = (today) => {
	if (today === 'Friday') {
		return 'TGIF';
	} else {
		return 'Nope';
	}
}

Given('today is Sunday', function () {
	this.today = 'Sunday';
});

Given('today is Friday', function () {
	this.today = 'Friday';
});


When('I ask whether it\'s Friday yet', function () {
	this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
	assert.strictEqual(this.actualAnswer, expectedAnswer);
});