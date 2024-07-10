import Animals from "../../Utilities/Animals.js";
import ArrayTable from "../../Utilities/ArrayTable.js";

const animals = Animals.LIST;

let animal;

ArrayTable.render(animals, true);

console.log('\n\nPositive Number (3)');
animal = animals.at(3);
console.log(animal);

console.log('\n\nNegative Number (-3)');
animal = animals.at(-3);
console.log(animal);

console.log('\n\nPositive Out of Range (100)');
animal = animals.at(100);
console.log(animal);

console.log('\n\nNegative Out of Range (-100)');
animal = animals.at(-100);
console.log(animal);

console.log('\n\nNo argument ()');
animal = animals.at();
console.log(animal);

