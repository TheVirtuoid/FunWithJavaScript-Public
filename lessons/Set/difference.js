import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";
import MapTable from "../../Utilities/MapTable.js";

const animals = Animals.LIST_SET_STRING;

const animalsToCompare = new Set(['Fluffy', 'Mr. Ed', 'Betsy', 'Flipper', 'Godzilla']);

console.log('\n\nGiven this set of animals:');
SetTable.render(animals);

console.log('\n\nWhat values are difference from this set of animals:');
SetTable.render(animalsToCompare);

const animalsDifference = animals.difference(animalsToCompare);

console.log('\n\nThe difference is:');
SetTable.render(animalsDifference);

const animalsMap = new Map([
	['Fluffy', { "type": "Cat", "name": "Fluffy", "class": "Mammalia" }],
	['Mr. Ed', { "type": "Horse", "name": "Mr. Ed", "class": "Mammalia" }],
	['Betsy', { "type": "Cow", "name": "Betsy", "class": "Mammalia" }],
	['Flipper', { "type": "Dolphin", "name": "Flipper",  "class": "Mammalia" }],
	['Godzilla', { "type": "Kaiju", "name": "Godzilla",  "class": "Reptilia"}]
]);

const mapComparison = animals.difference(animalsMap);
console.log('\n\nThe Animals in a Map:');
MapTable.render(animalsMap);

console.log('\n\nAfter the map difference:');
SetTable.render(mapComparison);