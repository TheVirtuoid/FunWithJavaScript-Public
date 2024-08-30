import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";
import ArrayTable from "../../Utilities/ArrayTable.js";

const animals = Animals.ListSetString();

SetTable.render(animals);

console.log('----------------Creating entries iterator----------');
const entriesIterator = animals.entries();
console.log(entriesIterator);

console.log(entriesIterator.next().value);
console.log(entriesIterator.next().value);
console.log(entriesIterator.next().value);

entriesIterator.forEach((value, key) => {
	console.log(value);
});

const animalArray = [...animals.entries()];
ArrayTable.render(animalArray);

