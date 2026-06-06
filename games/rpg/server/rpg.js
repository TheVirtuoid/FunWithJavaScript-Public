import CommandPrompt from './modules/CommandPrompt.js';
import ProcessPrompt from './modules/ProcessPrompt.js';
import ExecutePrompt from "./modules/ExecutePrompt.js";
import PrintText from "./modules/PrintText.js";

const commandPrompt = new CommandPrompt();
const processPrompt = new ProcessPrompt();
const executePrompt = new ExecutePrompt();
const printText = new PrintText();

printText.printLine('\n\n\n');
printText.printLine('Welcome to the Virtuoid RPG!\n');
printText.printLine('     /----------------\\');
printText.printLine('    /  VIRTUOID ARENA  \\');
printText.printLine('/--/                    \\--\\');
printText.printLine('|      O            O      |');
printText.printLine('|     /|\\  /    \\  /|\\     |');
printText.printLine('|    / | \\/      \\/ | \\    |');
printText.printLine('|      |            |      |');
printText.printLine('|     / \\          / \\     |');
printText.printLine('|    /   \\        /   \\    |');
printText.printLine('\\--------------------------/')
printText.printLine('\n');

let sayGoodbye = false;
while (!sayGoodbye) {
	const commandLine = processPrompt.parse(await commandPrompt.get());
	const { exit, error, result } = executePrompt.go(commandLine);
	if (error) {
		printText.printLine(`? ${error}`);
	}
	if (result) {
		const output = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;
		printText.printLine(output);
	}
	sayGoodbye = exit;
}
process.exit(0);