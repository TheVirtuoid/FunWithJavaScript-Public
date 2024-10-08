import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetTypeString();
const animalsAtZoo = new Set(['Cow', 'Dog', 'Dolphin']);

SetTable.render(animals);
SetTable.render(animalsAtZoo);
const symmetricDifferenceZoo = animalsAtZoo.symmetricDifference(animals);
console.log(`Symmetric Difference between Zoo and Animals:`);
SetTable.render(symmetricDifferenceZoo);

const animalsAtOtherZoo = new Set(['Alligator', 'Bear', 'Cougar']);
console.log('\n\n\n');
SetTable.render(animals);
SetTable.render(animalsAtOtherZoo);
const symmetricDifferenceOtherZoo = animalsAtOtherZoo.symmetricDifference(animals);
console.log(`Symmetric Difference between Other Zoo and Animals:`);
SetTable.render(symmetricDifferenceOtherZoo);

