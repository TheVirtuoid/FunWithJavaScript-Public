import Animals from "../../Utilities/Animals.js";

const animals = [...Animals.LIST];

console.log(animals);

const animal = animals.pop();

console.log(animals);
console.log(`\nThe animal removed was ${animal.name} the ${animal.type} in the ${animal.class} class.`);

