import Animals from "../../Utilities/Animals.js";

const animals = Animals.ListSetTypeString();

console.log('----------------Looping Through the Keys----------------');
const animalKeysIterator = animals.keys();
let animalType = animalKeysIterator.next().value;
while (animalType) {
	console.log(`   Type is ${animalType}`);
	animalType = animalKeysIterator.next().value;
}
console.log('End of list.\n\n\n');


console.log('----------------Automatically Building an Array----------------');
const animalKeysArray = [...animals.keys()];
console.log(animalKeysArray);


console.log('\n\n----------------Of course, you really do not need keys()----------------');
const animalKeysArray2 = [...animals];
console.log(animalKeysArray2);


