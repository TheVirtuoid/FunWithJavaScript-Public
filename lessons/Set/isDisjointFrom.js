import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetTypeString();
const animalsAtZoo = new Set(['Alligator', 'Bear', 'Cougar']);

console.log('----------------Testing isDisjointFrom With Zoo----------------');
SetTable.render(animals);
SetTable.render(animalsAtZoo);
const isDisjointZoo = animalsAtZoo.isDisjointFrom(animals);
console.log(`Are the two sets disjoint? ${isDisjointZoo ? 'YES!' : 'No.'}\n\n`);

const animalsAtOtherZoo = new Set(['Alligator', 'Bear', 'Cougar', 'Cow']);
console.log('----------------Testing isDisjointFrom With OtherZoo----------------');
SetTable.render(animals);
SetTable.render(animalsAtOtherZoo);
const isDisjointOtherZoo = animalsAtOtherZoo.isDisjointFrom(animals);
console.log(`Are the two sets disjoint? ${isDisjointOtherZoo ? 'YES!' : 'No.'}`);

