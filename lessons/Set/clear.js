import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetString();

console.log('\n\nBefore Clear');
SetTable.render(animals);

animals.clear();
console.log('\n\nAfter Clear');

SetTable.render(animals);

