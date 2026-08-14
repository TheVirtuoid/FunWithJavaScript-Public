import { readFileSync, writeFileSync } from 'fs';

const monsterData = readFileSync('./monsters.md', 'utf8');
let monsterLines = [];
let count = 0;
let monsterFilename = '';
monsterData.split('\r\n').forEach(line => {
	if (line.startsWith('###')) {
		if (count > 0) {
			writeFileSync(`./monsters/${monsterFilename}.md`, monsterLines.join('\r\n'));
		}
		monsterFilename =
			line.substring(3)
				.trim()
				.replaceAll(',', '')
				.replaceAll('(', '')
				.replaceAll(')', '');
		console.log(monsterFilename);
		count++;
		monsterLines = [line];
	} else {
		monsterLines.push(line);
	}
});
count++;
console.log(count);
