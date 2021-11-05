const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

function createPath(dirname, filename) {
	return path.join(dirname, filename);
}

function makeDir(dir) {
	fsPromises.mkdir(dir, { recursive: true });
}

const distPath = createPath(__dirname, 'project-dist');

makeDir(distPath);

function copyAssets(distPath, target) {
	const existDirPath = createPath(__dirname, target);
	const newDirPath = createPath(distPath, target);

	makeDir(newDirPath);

	function rmFiles() {
		fs.readdir(newDirPath, { withFileTypes: true }, (err, files) => {
			if (!files.length) return;
			err
				? console.log(err)
				: files.forEach(file => {
					fsPromises.rm(newDirPath + file.name, { recursive: true, force: true });
				});
		});
	}

	function copy() {
		fs.readdir(existDirPath, { withFileTypes: true }, (err, dirs) => {
			err
				? console.log(err)
				: dirs.forEach(dir => {
					const existAssetsDirPath = createPath(existDirPath, dir.name + '/');
					const newAssetsDirPath = createPath(newDirPath, dir.name + '/');

					makeDir(newAssetsDirPath);

					fs.readdir(existAssetsDirPath, { withFileTypes: true }, (err, files) => {
						err
							? console.log(err)
							: files.forEach(file => {
								fsPromises.copyFile(existAssetsDirPath + file.name, newAssetsDirPath + file.name);
							});
					});
				});
		});
	}
	rmFiles();
	setTimeout(copy, 1000);
}

copyAssets(distPath, 'assets/');