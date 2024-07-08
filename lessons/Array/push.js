import Animals from "../../Utilities/Animals.js";

const animals = [...Animals.LIST];

console.log(animals);

const newAnimal = {
	name: 'Sally',
	type: 'Salamander',
	class: 'Amphibia'
}

const newLength = animals.push(newAnimal);

console.log(animals);
const animal = animals[newLength - 1];
console.log(`The last animal added was ${animal.name} the ${animal.type} in the ${animal.class} class.`);

