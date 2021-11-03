const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const process = require('process');
const stdout = process.stdout;
const stdin = process.stdin;

const into = fs.createWriteStream(filePath);

into.on('open', () => {
	stdout.write('Как тебя зовут?\n');
	stdin.on('data', (data) => {
		if (data.toString().trim() === 'exit'.trim()) {
			process.exit();
		}
		into.write(data.toString());
	});
	process.on('exit', () => stdout.write('Удачи!'));
})




