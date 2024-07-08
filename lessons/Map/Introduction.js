/*
	A map is a "collection" of JavaScript objects with a key-value pair structure.

	What is a key/value pair?

	Remember our discussion on an array being like a shelf at the local hardware store that holds paints?
	You accessed a paint color by the "position" it was on the shelf.

	But what if you didn't know the position of the paint you needed?

	A map solves this problem. It will be like a book at the paint counter that says "Yellow is at position 3".
	Each paint color will have a name (key) and a position (value).
 */

import Animals from "../../Utilities/Animals.js";

const paints = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
const paintMap = new Map([
	['red', 0],
	['blue', 1],
	['green', 2],
	['yellow', 3],
	['black', 4],
	['white', 5]
]);

console.log(paints);
console.log(paintMap);

console.log(`The index for yellow is ${paintMap.get('yellow')}, which on the paints array is "${paints[paintMap.get('yellow')]}".`);

/*
	A Map key can be any object, but each key MUST be unique.
	A Map value can be any object. They can be duplicates, if required

	If the key is not unique, the previous value is replaced with the new value.
 */

const mapDuplicate = new Map([
		['red', 0],
		['red', 1]
]);

console.log(mapDuplicate);