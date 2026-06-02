import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export default class CommandPrompt {

	static PROMPT = 'rpg> ';

	#commandPrompt;


	constructor() {
		this.#commandPrompt = readline.createInterface({ input, output });
	}

	async get(prompt = CommandPrompt.PROMPT) {
		return await this.#commandPrompt.question(prompt);
	}
}