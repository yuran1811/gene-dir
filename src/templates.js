const fs = require('fs');
const path = require('path');
const { cppDefault, dirPath } = require('./utils/default.js');

const updateFiles = (directory, files) => {
	files.remove.forEach((file) => {
		fs.rmSync(dirPath(directory, file), {
			recursive: true,
			force: true,
		});
	});

	Object.entries(files.write).map(([key, value]) =>
		fs.writeFileSync(dirPath(directory, key), value, {
			encoding: 'utf-8',
		})
	);
};

const templates = {
	'gene-folder-structure': {
		name: 'gene folder structure',
		initial: (directory, name) => {
			updateFiles(directory, {
				remove: [],
				write: {
					[`${name}.cpp`]: cppDefault(name),
				},
			});
		},
	},
};

module.exports = templates;
