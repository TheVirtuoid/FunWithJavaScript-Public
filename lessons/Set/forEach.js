import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetString();

SetTable.render(animals);

animals.forEach((value, key) => {
	console.log(value);
});

animals.add('Godzilla');
console.log('\n\n\n');
SetTable.render(animals);

animals.forEach((value, key) => {
	console.log(value);
});
