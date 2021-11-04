const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const existDirPath = path.join(__dirname, 'files/');
const newDirPath = path.join(__dirname, 'files-copy/');

fsPromises.mkdir(newDirPath, { recursive: true });

fs.readdir(newDirPath, {}, (err, files) => {
	if (err) console.log(err);
	if (files.length) {
		files.forEach(file => fsPromises.rm(newDirPath + file));
	};
});

function add() {
	fs.readdir(existDirPath, { withFileTypes: true }, (err, files) => {
		if (err) console.log(err);

		files.forEach(file => fsPromises.copyFile(existDirPath + file.name, newDirPath + file.name));
	})
}

setTimeout(add, 1000);

