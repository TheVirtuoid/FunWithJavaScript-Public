import { stdout as output } from "node:process";

export default class PrintText {
	constructor() {}

	print(text) {
		output.write(text);
	}

	printLine(text) {
		output.write(text + "\n");
	}
}