import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.LIST_SET_STRING;

console.log('\n\nBefore Clear');
SetTable.render(animals);

animals.clear();
console.log('\n\nAfter Clear');

SetTable.render(animals);

