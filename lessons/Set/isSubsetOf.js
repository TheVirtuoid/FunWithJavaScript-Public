import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetTypeString();
const animalsAtZoo = new Set(['Cow', 'Dog', 'Dolphin']);

console.log('----------------Testing isSubsetOf With Zoo----------------');
SetTable.render(animals);
SetTable.render(animalsAtZoo);
const isSubsetOfZoo = animalsAtZoo.isSubsetOf(animals);
console.log(`Are the zoo animals a subset of all our animals? ${isSubsetOfZoo ? 'YES!' : 'No.'}\n\n`);

const animalsAtOtherZoo = new Set(['Cow', 'Dog', 'Dolphin', 'Alligator']);
console.log('----------------Testing isSubsetOf With OtherZoo----------------');
SetTable.render(animals);
SetTable.render(animalsAtOtherZoo);
const isSubsetOfOtherZoo = animalsAtOtherZoo.isSubsetOf(animals);
console.log(`Are the other zoo animals a subset of all our animals? ${isSubsetOfOtherZoo ? 'YES!' : 'No.'}`);

