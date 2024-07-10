import Animals from "../../Utilities/Animals.js";

const animals = Animals.LIST_SET_STRING;

console.log(animals);

let animalRemoved = animals.delete('Betsy');

console.log(`Was the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(animals);

animalRemoved = animals.delete('Betsy');
console.log(`\n\n\nWas the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(animals);

console.log('\n\n------------------------------------------OBJECT--------------------------------');
const objAnimals = Animals.LIST_SET_OBJECT;
console.log(objAnimals);
const animalToRemove = objAnimals.entries().next().value[1];

animalRemoved = objAnimals.delete(animalToRemove);
console.log(`\n\n\nWas the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(objAnimals);

const anotherAnimalToRemove =   { type: 'Dog', name: 'Fido', class: 'Mammalia' };
animalRemoved = objAnimals.delete(anotherAnimalToRemove);
console.log('tried to remove:', anotherAnimalToRemove);
console.log(`\n\n\nWas the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(objAnimals);






