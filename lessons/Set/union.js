import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetTypeString();
const animalsAtZoo = new Set(['Cow', 'Dog', 'Dolphin']);

SetTable.render(animals);
SetTable.render(animalsAtZoo);
const unionZoo = animalsAtZoo.union(animals);
console.log(`Union between Zoo and Animals:`);
SetTable.render(unionZoo);

const animalsAtOtherZoo = new Set(['Alligator', 'Bear', 'Cougar']);
console.log('\n\n\n');
SetTable.render(animals);
SetTable.render(animalsAtOtherZoo);
const unionOtherZoo = animalsAtOtherZoo.union(animals);
console.log(`Union between Other Zoo and Animals:`);
SetTable.render(unionOtherZoo);

