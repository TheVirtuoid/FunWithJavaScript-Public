import Animals from "../../Utilities/Animals.js";

const animals = Animals.LIST_MAP;

console.log(animals);

const newAnimal = {
	type: 'Salamander',
	name: 'Sally',
	class: 'Amphibia'
};

animals.set(newAnimal.type, newAnimal);

console.log(animals);

const anotherNewAnimal = {
	type: 'Cow',
	name: 'Priscillia',
	class: 'Mammalia'
};

animals.set(anotherNewAnimal.type, anotherNewAnimal);
console.log('\n\nNew Listing');
console.log(animals);

console.log('\n\n------------------------------------------OBJECT--------------------------------');

const objAnimals = Animals.LIST_MAP_OBJECT;
console.log(objAnimals);
const replaceAnimal = {
	type: 'Cow',
	name: 'Betsy',
	class: 'Mammalia'
};

objAnimals.set(replaceAnimal, 'SuperBovine');

console.log('\n\nAfter replacement');
console.log(objAnimals);

