const { defaultMes, runCpp, dirPath } = require('./utils/default.js');
const { _fs } = require('./utils/fsHandle.js');

const extraOptions = {
	build: {
		name: 'build',
		desc: 'CMD file to build .cpp file',
		setup: (directory, name) => {
			_fs.f.write(dirPath(directory, `${name}.cmd`), runCpp(name));
		},
	},
};

module.exports = extraOptions;
