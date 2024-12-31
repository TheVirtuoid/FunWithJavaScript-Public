import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";
import MapArrayTable from "../../Utilities/MapArrayTable.js";

const animals = Animals.ListMapString();

MapTable.render(animals);

console.log('----------------Creating entries iterator----------');
const entriesIterator = animals.entries();
console.log(entriesIterator);

console.log('\n\n------.next()');
console.log(entriesIterator.next().value);
console.log('\n\n------.next()');
console.log(entriesIterator.next().value);
console.log('\n\n------.next()');
console.log(entriesIterator.next().value);

console.log('\n\n------What is Left');
entriesIterator.forEach((value, key) => {
	console.log(key, value);
});

console.log('\n\n-----The Map as an Array');
const animalArray = [...animals.entries()];
MapArrayTable.render(animalArray, true);

