export default class ProcessPrompt {
	constructor() {}

	parse(commandLine) {
		if (!commandLine) {
			return [];
		}
		const regex = /(?:'[^']*'|"[^"]*"|[^\s])+/g;
		const matches = commandLine.match(regex);
		if (!matches) {
			return [];
		}
		return matches.map(token => {
			const unquotedToken = token.replace(/(["'])(.*?)\1/g, '$2');
			if (unquotedToken.includes('=')) {
				return unquotedToken.split('=');
			}
			return unquotedToken;
		});
	}

}
