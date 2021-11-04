const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');
const writeStream = fs.createWriteStream(bundlePath);

fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
	if (err) console.log(err);

	const trueCss = files.filter(file => file.name.split('.')[1] === 'css');

	trueCss.forEach(file => {
		const filePath = path.join(stylesPath, file.name);

		const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

		readStream.on('data', (chunk) => {
			writeStream.write(chunk + '\n');
		});
	});
});
