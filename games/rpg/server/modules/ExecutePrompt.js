import quit from "./commands/quit.js";
import roll from "./commands/roll.js";
import calc from "./commands/calc.js";

export default class ExecutePrompt {

	static JUMPTABLE = new Map([
		['exit', { cmd: quit }],
		['quit', { cmd: quit }],
		['roll', { cmd: roll }],
		['calc', { cmd: calc }],
	]);

	static COMMANDS = [...ExecutePrompt.JUMPTABLE.keys()];

	constructor() {}

	go(commandLine = []) {
		const exit = false;
		if (commandLine.length === 0) {
			return { exit };
		}
		const command = commandLine.splice(0, 1)[0].toLowerCase();
		if (!ExecutePrompt.COMMANDS.includes(command)) {
			return { exit, error: `Unknown command: ${command}` };
		}
		return ExecutePrompt.JUMPTABLE.get(command).cmd(commandLine);
	}
}