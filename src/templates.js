const { cppDefault, dirPath } = require('./utils/default.js');
const { _fs } = require('./utils/fsHandle.js');

const updateFiles = (directory, files) => {
	files.remove.forEach((file) => {
		_fs.f.rm(dirPath(directory, file));
	});

	Object.entries(files.write).forEach(([key, value]) => {
		_fs.f.write(dirPath(directory, key), value, { encoding: 'utf-8' });
	});
};

const templates = {
	fs: {
		desc: 'folder structure',
		name: 'fs',
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
