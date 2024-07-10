let suffixValue = 1;
let newSuffixValue = suffixValue--;

console.log(`Using var--: Value = ${suffixValue}, newValue = ${newSuffixValue}`);

let prefixValue = 1;
let newPrefixValue = --prefixValue;

console.log(`Using ++var: Value = ${prefixValue}, newValue = ${newPrefixValue}`);

let floatValue = 1.123;
let newFloatValue = --floatValue;

console.log(`Using ++float: Value = ${floatValue}, newValue = ${newFloatValue}`);