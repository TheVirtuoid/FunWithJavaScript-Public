import Animals from '../../../Utilities/Animals.js';
import Table from "../../../Utilities/Table.js";

const header = ['Index', 'Animal', 'Name', 'Class'];
const data = [];
Animals.LIST.forEach((animal, index) => {
	data.push([index, animal.type, animal.name, animal.class]);
});
const table = new Table({ header, data });
table.render();


let index = 0;
while(index < Animals.LIST.length) {
	const animal = Animals.LIST[index];
	console.log(`${index}, ${animal?.type}, ${animal?.name}, ${animal?.class}`);
	index++;
}

