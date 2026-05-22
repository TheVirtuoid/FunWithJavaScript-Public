import { readFileSync, writeFileSync } from 'fs';

const monsterData = readFileSync('./monsters.md', 'utf8');
let monsterLines = [];
let count = 0;
monsterData.split('\r\n').forEach(line => {
	if (line.startsWith('###')) {
		const filename =
			line.substring(3)
				.trim()
				.replaceAll(',', '')
				.replaceAll('(', '')
				.replaceAll(')', '');
		console.log(filename);
		if (count > 0) {
			writeFileSync(`./monsters/${filename}.md`, monsterLines.join('\r\n'));
		}
		count++;
		monsterLines = [line];
	} else {
		monsterLines.push(line);
	}
});
count++;
console.log(count);
