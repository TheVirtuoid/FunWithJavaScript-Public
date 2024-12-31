import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";
import ArraySimpleTable from "../../Utilities/ArraySimpleTable.js";
import MapArrayTable from "../../Utilities/MapArrayTable.js";

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
	console.log(value);
});


console.log('\n\n-----The Map as an Array');
const animalArray = [...animals.values()];
console.log(animalArray);


