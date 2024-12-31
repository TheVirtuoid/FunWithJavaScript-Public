import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";

const animals = Animals.ListMapString();

MapTable.render(animals);

console.log('----------------Creating values iterator----------');
const valuesIterator = animals.values();
console.log(valuesIterator);

console.log('\n\n------.next()');
console.log(valuesIterator.next().value);
console.log('\n\n------.next()');
console.log(valuesIterator.next().value);
console.log('\n\n------.next()');
console.log(valuesIterator.next().value);

console.log('\n\n------What is Left');
valuesIterator.forEach((value, key) => {
	console.log(key, value);
});


console.log('\n\n-----The Map as an Array');
const animalArray = [...animals.values()];
console.log(animalArray);


