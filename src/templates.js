const { cppDefault, dirPath } = require('./utils/default');
const { _fs } = require('./utils/fsHandle');

const updateFiles = (directory, files) => {
	files.remove.forEach((file) => _fs.f.rm(dirPath(directory, file)));
	for (const key in files.write)
		_fs.f.write(dirPath(directory, key), files.write[key], {
			encoding: 'utf-8',
		});
};

const templates = {
	fs: {
		desc: 'folder structure',
		name: 'fs',
		initial: (directory, name, aio = 0) => {
			updateFiles(directory, {
				remove: [],
				write: {
					[`${name}.cpp`]: cppDefault(name, aio),
				},
			});
		},
	},
};

module.exports = templates;
