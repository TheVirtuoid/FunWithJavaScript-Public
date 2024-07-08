/*
		An array is a "collection" of JavaScript objects.

		A collection is like a shelf at the local hardware store that holds paints.

		The "shelf" is the array, and the "paints" are the objects.

 */

const paints = ['red', 'blue', 'green', 'yellow', 'black', 'white'];

/* The objects in JavaScript can be numbers */
const numbers = [1, 3, 5, 7, 9, 11, 13];

/* ... or strings */
const strings = ['My', 'name', 'is', 'TheVirtuoid'];

/* ... or even a mix of both */

const mix = [1, 'My', 3, 'name', 5, 'is', 7, 'TheVirtuoid'];

/* In fact, they can be any type of JavaScript object, even another array */

const wierd = [
		1,
		true,
		Symbol(),
		null,
		undefined,
		function() {},
		'String',
		{ name: 'TheVirtuoid' },
		[1, 2, 3]
];

/*
	Each object within the Array is said to be an "element" of the array

	JavaScript assigns numbers to each element in the array, starting from 0.
*/

console.log(numbers[0]); // 1
console.log(strings[1]); // 'name'
console.log(mix[3]); // 'name'

/*
	For example, going back to the "paints" array, if someone needed you to get the 'yellow' paint,
	you would go to the paints shelf and get the paint at position 3.

	Why 3 when it's the 4th element? JavaScript starts counting from 0, so the 1st element is 0, the
	second is 1, the third is 2, and so on.
 */

console.log(paints[3]); // 'yellow'

/*
	And that is the very basics of an array.
 */

