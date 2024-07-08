let suffixValue = 0;
let newSuffixValue = suffixValue++;

console.log(`Using var++: Value = ${suffixValue}, newValue = ${newSuffixValue}`);

let prefixValue = 0;
let newPrefixValue = ++prefixValue;

console.log(`Using ++var: Value = ${prefixValue}, newValue = ${newPrefixValue}`);

let floatValue = 0.123;
let newFloatValue = ++floatValue;

console.log(`Using ++float: Value = ${floatValue}, newValue = ${newFloatValue}`);