import Animals from "../../Utilities/Animals.js";
import SetTable from "../../Utilities/SetTable.js";

const animals = Animals.ListSetString();

SetTable.render(animals);

const hasFido = animals.has('Fido');
const hasLowerCaseFido = animals.has('fido');
const hasGodzilla = animals.has('godzilla');

console.log(`Do I have a Fido value?\t\t\t ${hasFido ? 'YES!' : 'No.'}`);
console.log(`Do I have a lower-case Fido value?\t ${hasLowerCaseFido ? 'YES!' : 'No.'}`);
console.log(`Do I have a Godzilla value?\t\t ${hasGodzilla ? 'YES!' : 'No.'}`);

animals.add({ name: 'Godzilla' });

const hasObjectGodzilla = animals.has({ name: 'Godzilla' });
console.log(`\n\nDo I have Godzilla as an Object? ${hasObjectGodzilla ? 'YES!' : 'No.'}`);

const objectKingKong = { name: 'King Kong' };
animals.add(objectKingKong);
const hasObjectKingKong = animals.has(objectKingKong);
console.log(`\n\nDo I have King Kong as an Object? ${hasObjectKingKong ? 'YES!' : 'No.'}`);


