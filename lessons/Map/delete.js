import Animals from "../../Utilities/Animals.js";

const animals = Animals.LIST_MAP;

console.log(animals);

let animalRemoved = animals.delete('Cow');

console.log(`Was the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(animals);

animalRemoved = animals.delete('Cow');
console.log(`\n\n\nWas the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(animals);

console.log('\n\n------------------------------------------OBJECT--------------------------------');
const objAnimals = Animals.LIST_MAP_OBJECT;
console.log(objAnimals);
const animalToRemove = objAnimals.entries().next().value[0];

animalRemoved = objAnimals.delete(animalToRemove);
console.log(`\n\n\nWas the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(objAnimals);

const anotherAnimalToRemove =   { type: 'Dog', name: 'Fido', class: 'Mammalia' };
animalRemoved = objAnimals.delete(anotherAnimalToRemove);
console.log('tried to remove:', anotherAnimalToRemove);
console.log(`\n\n\nWas the animal removed? ${animalRemoved ? 'Yes!' : 'No!'}`);
console.log(objAnimals);






