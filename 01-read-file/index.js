const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const text = fs.createReadStream(filePath, { encoding: "utf8" });

text.on('data', function (chunk) {
	console.log(chunk);
});

