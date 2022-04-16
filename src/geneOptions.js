const fs = require('fs');
const path = require('path');
const { defaultMes, cppDefault, dirPath } = require('./utils/default.js');

const geneOptions = {
	f: {
		name: 'f',
		desc: 'Full (includes: "sol.cpp, in1, in2, in3, out")',
		setup: (directory, name) => {
			fs.writeFileSync(dirPath(directory, `sol.cpp`), cppDefault('sol'));
			for (let i = 1; i <= 3; i++)
				fs.writeFileSync(dirPath(directory, `in${i}`), defaultMes);
			fs.writeFileSync(dirPath(directory, `out`), defaultMes);
		},
	},
	io: {
		name: 'io',
		desc: 'IO (includes: ".INP, .OUT")',
		setup: (directory, name) => {
			fs.writeFileSync(dirPath(directory, `${name}.INP`), defaultMes);
			fs.writeFileSync(dirPath(directory, `${name}.OUT`), defaultMes);
		},
	},
	m: {
		name: 'm',
		desc: 'Minimal (includes: "sol.cpp")',
		setup: (directory, name) => {
			fs.writeFileSync(dirPath(directory, `sol.cpp`), cppDefault('sol'));
		},
	},
};

module.exports = geneOptions;
