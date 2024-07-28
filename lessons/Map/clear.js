import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";

const animals = Animals.ListMapString();

console.log('\n\nBefore Clear');
MapTable.render(animals);

animals.clear();
console.log('\n\nAfter Clear');

MapTable.render(animals);

/* Simulate the clear() method. DO NOT USE. Use clear() instead. This is just for fun */

const clearAnimals = Animals.ListMapString();

console.log('\n\nBefore Clear');
MapTable.render(clearAnimals);

clearAnimals.forEach((value, key) => {
	clearAnimals.delete(key);
});

console.log('\n\nAfter Clear');
MapTable.render(clearAnimals);



