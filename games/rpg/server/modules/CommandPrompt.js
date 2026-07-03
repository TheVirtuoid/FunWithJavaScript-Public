import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

let instance;

export default class CommandPrompt {

	static PROMPT = 'rpg> ';

	#commandPrompt;

	constructor() {
		if (instance) {
			return instance;
		}
		this.#commandPrompt = readline.createInterface({ input, output });
		instance = this;
	}

	async get(prompt = CommandPrompt.PROMPT) {
		return await this.#commandPrompt.question(prompt);
	}
}