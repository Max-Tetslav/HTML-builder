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

const stylesDirPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/style.css');
const writeCssStream = fs.createWriteStream(bundlePath);

function mergeStyles(src, dest) {
	fs.readdir(src, { withFileTypes: true }, (err, files) => {
		if (err) console.log(err);

		const trueCss = files.filter(file => file.name.split('.')[1] === 'css');

		trueCss.forEach(file => {
			const filePath = path.join(src, file.name);

			const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

			readStream.on('data', (chunk) => {
				dest.write(chunk + '\n');
			});
		});
	});
}

mergeStyles(stylesDirPath, writeCssStream);

