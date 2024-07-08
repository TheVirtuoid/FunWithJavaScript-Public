/*
	Set is a collection of unique values. It is similar to an array, but it does not allow duplicate values.
 */

const mySet = new Set([1, 2, 3, 4, 5]);
console.log(mySet);

/*
	The values in a set can be anything!
 */

const wierdSet = new Set([1, 'one', true, Symbol(), null, function(){}, { name: 'TheVirtuoid' }, undefined, 'killer']);
console.log(wierdSet);

/*
	But they must be unique! If an attempt to add a duplicate is made, it will ignore the replacement.

	How can we test this? Set() will always return the insertion order. We can take advantage of that.
 */

const duplicateSet = new Set([1, 2, "end", 1]);
console.log(duplicateSet);

/*
	The power of a Set is its uniqueness. It can be used to remove duplicates from an array.
 */

const myDuplicateArray = [1, 2, 3, 4, 3, 5, 2, 4, 1, 1];
const myUniqueSet = new Set(myDuplicateArray);
console.log(myDuplicateArray, myUniqueSet);

/*
	Along the same lines, if you are keeping track of unique values as they appear, a Set works much better than an array.
 */

const records = ['TheVirtuoid', 'TheOtherVirtuoid', 'MamaVirtuoid', 'DaddyVirtuoid', 'BabyVirtuoid', 'TheOtherVirtuoid'];

const arrayOfRecords = [];
const setOfRecords = new Set();

records.forEach((record) => {
	if (arrayOfRecords.indexOf(record) === -1) {
		arrayOfRecords.push(record);
	}
	setOfRecords.add(record);
});

console.log(arrayOfRecords);
console.log(setOfRecords);
