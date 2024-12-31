import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";

const animals = Animals.ListMapString();

MapTable.render(animals);

const myAnimal = animals.get('Lizard');
console.log(myAnimal);

const lowerCaseAnimal = animals.get('lizard');

console.log('\n\n\n-----After the lower case get:');
console.log(lowerCaseAnimal);

const missingAnimal = animals.get('Chicken');
console.log('\n\n\n-----After getting a missing animal:');
console.log(missingAnimal);

animals.set({ name: 'TheVirtuoid'}, { type: 'Immortal Being', class: 'In His Own', name: 'TheVirtuoid' });

console.log('\n\n\n-----Can we read the virtuoid?-----');
const theVirtuoid = animals.get({ name: 'TheVirtuoid' });
console.log(theVirtuoid);


