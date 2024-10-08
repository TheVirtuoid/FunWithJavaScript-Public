import Animals from "../../Utilities/Animals.js";

const animals = Animals.ListSetTypeString();

console.log('----------------Looping Through the Values----------------');
const animalValuesIterator = animals.values();
let animalType = animalValuesIterator.next().value;
while (animalType) {
	console.log(`   Type is ${animalType}`);
	animalType = animalValuesIterator.next().value;
}
console.log('End of list.\n\n\n');


console.log('----------------Automatically Building an Array----------------');
const animalValuesArray = [...animals.values()];
console.log(animalValuesArray);


console.log('\n\n----------------Of course, you really do not need values()----------------');
const animalValuesArray2 = [...animals];
console.log(animalValuesArray2);


