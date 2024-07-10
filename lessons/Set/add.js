import Animals from "../../Utilities/Animals.js";

const animals = Animals.LIST_SET_STRING;

console.log(animals);

animals.add('Priscillia');

console.log('\n\nAfter adding name');
console.log(animals);

animals.add('Betsy');
console.log('\n\nAfter adding duplicate name');
console.log(animals);

animals.add(135.44);
console.log('\n\nAfter adding number');
console.log(animals);


console.log('\n\n------------------------------- OBJECTS -------------------------------');
const objAnimals = Animals.LIST_SET_OBJECT;
console.log(objAnimals);

const newAnimal = {
	type: 'Salamander',
	name: 'Sally',
	class: 'Amphibia'
};

objAnimals.add(newAnimal);

console.log('\n\nAfter adding object');
console.log(objAnimals);

const anotherNewAnimal = {
	type: 'Cow',
	name: 'Betsy',
	class: 'Mammalia'
};

objAnimals.add(anotherNewAnimal);
console.log('\n\nAfter adding duplicate object');
console.log(objAnimals);

