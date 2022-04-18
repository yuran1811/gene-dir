const {
	defaultMes,
	runCpp,
	dirPath,
	batDefault,
} = require('./utils/default.js');
const { _fs } = require('./utils/fsHandle.js');

const extraOptions = {
	build: {
		name: 'build',
		desc: 'CMD file to build .cpp file',
		setup: (directory, name) => {
			_fs.f.write(dirPath(directory, `${name}.cmd`), runCpp(name));
		},
	},
	bat: {
		name: 'bat',
		desc: 'Add .bat file',
		setup: (directory, name) => {
			_fs.f.write(dirPath(directory, `test.bat`), batDefault);
		},
	},
	ans: {
		name: 'ans',
		desc: 'Add ans file',
		setup: (directory, name) => {
			_fs.f.write(dirPath(directory, `ans`), defaultMes);
		},
	},
};

module.exports = extraOptions;
