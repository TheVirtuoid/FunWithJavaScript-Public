import Animals from "../../Utilities/Animals.js";
import ArrayTable from "../../Utilities/ArrayTable.js";

const animals = Animals.LIST;
const newAnimals = [{ type: 'Salamander', name: 'Sally', class: 'Amphibia' }];

const concatAnimals = animals.concat(newAnimals);

console.log('\n\nOriginal Animals:');
ArrayTable.render(animals);

console.log('\nAdded Animals:');
ArrayTable.render(newAnimals);

console.log('\nConcatenated Animals:');
ArrayTable.render(concatAnimals);

newAnimals.push({ type: 'Cow', name: 'Betsy', class: 'Mammalia' });
const concatAnimals2 = animals.concat(newAnimals);

console.log('\n\nOriginal Animals:');
ArrayTable.render(animals);

console.log('\nAdded Animals:');
ArrayTable.render(newAnimals);

console.log('\nConcatenated Animals #2:');
ArrayTable.render(concatAnimals2);

/*   REMOVING DUPLICATE OBJECTS FROM ARRAYS   */

console.log('\n\n---------------------- REMOVE DUPLICATE OBJECTS FROM ARRAYS (SET) ----------------------');
const setFromArray = new Set([...concatAnimals2]);
const arrayFromSet = Array.from(setFromArray);
ArrayTable.render(arrayFromSet);

console.log('\nBefore New Concatenation');
const newAnimals2 = [{ type: 'Salamander', name: 'Sally', class: 'Amphibia' }];
newAnimals2.push(animals.at(3));
const concatAnimals3 = animals.concat(newAnimals2);
ArrayTable.render(concatAnimals3);

console.log('\nAfter New Duplication Removal');
const setFromArray2 = new Set([...concatAnimals3]);
const arrayFromSet2 = Array.from(setFromArray2);
ArrayTable.render(arrayFromSet2);


