import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";

const animals = Animals.ListMapString();

MapTable.render(animals);

animals.forEach((value, key) => {
	console.log(key, value);
});

animals.set('Godzilla', { type: 'Monster', name: 'Godzilla', class: 'Reptilia' });
console.log('\n\n\n-----The Map after adding Godzilla-----');
MapTable.render(animals);

animals.forEach((value, key) => {
	console.log(key, value);
});
