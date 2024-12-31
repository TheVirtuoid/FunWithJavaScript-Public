import Animals from "../../Utilities/Animals.js";
import MapTable from "../../Utilities/MapTable.js";

const animals = Animals.ListMapString();

MapTable.render(animals);

const myAnimal = animals.has('Lizard');
console.log(`\n\nIs there a "Lizard"? ${myAnimal ? 'Yes!' : 'No!'}`);


const lowerCaseAnimal = animals.has('lizard');
console.log(`\n\nIs there a "lizard"? ${lowerCaseAnimal ? 'Yes!' : 'No!'}`);

const missingAnimal = animals.has('Spider');
console.log(`\n\nIs there a "Spider"? ${missingAnimal ? 'Yes!' : 'No!'}`);

