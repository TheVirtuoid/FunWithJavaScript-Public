import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";
import ArraySimpleTable from "../../Utilities/ArraySimpleTable.js";

const animals = Animals.ListMapString();

MapTable.render(animals);

console.log('----------------Creating keys iterator----------');
const keysIterator = animals.keys();
console.log(keysIterator);

console.log('\n\n------.next()');
console.log(keysIterator.next().value);
console.log('\n\n------.next()');
console.log(keysIterator.next().value);
console.log('\n\n------.next()');
console.log(keysIterator.next().value);

console.log('\n\n------What is Left');
keysIterator.forEach((value, key) => {
	console.log(value);
});

console.log('\n\n-----The Map as an Array');
const animalArray = [...animals.keys()];
ArraySimpleTable.render(animalArray, true);

