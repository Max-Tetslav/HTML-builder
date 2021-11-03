const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
	if (err) console.log(err);
	let trueFiles = files.filter(file => file.isFile());

	trueFiles.forEach(file => {
		let nameArr = file.name.split('.');
		let name = nameArr[0];
		let fileExt = nameArr[1];
		fs.stat(dirPath + '/' + file.name, (err, stats) => {
			let result = [name, fileExt, `${stats.size / 1000} kb`];
			console.log(result.join(' - '));
		});
	});
});