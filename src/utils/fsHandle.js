const fs = require('fs');
const inquirer = require('inquirer');

const _fs = {
	f: {
		write: (file, data, options = {}) => {
			fs.writeFileSync(file, data, options);
		},
		read: (path) => {
			return fs.readFileSync(path);
		},
		copy: (src, dest) => {
			fs.copyFileSync(src, dest);
		},
		rm: (path, options = {}) => {
			fs.rmSync(path, options);
		},
	},
	dir: {
		exist: (directory) => fs.existsSync(directory),
		read: (directory) => fs.readdirSync(directory),
		md: (directory, options = { recursive: true }) => {
			fs.mkdirSync(directory, options);
		},
		rd: (directory, options = { recursive: true, force: true }) => {
			fs.rmSync(directory, options);
		},
	},
};

const validateDir = async (directory) => {
	if (_fs.dir.exist(directory) && _fs.dir.read(directory).length > 0) {
		const { rmFile } = await inquirer.prompt({
			name: 'rmFile',
			type: 'confirm',

			message:
				'Directory is not empty. Remove existing files and continue?',
		});

		if (rmFile) _fs.dir.rm(directory);
		else process.exit(1);
	}
	_fs.dir.md(directory);
};

module.exports = { validateDir, _fs };
