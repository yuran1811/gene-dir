const { defaultMes, cppDefault, dirPath } = require('./utils/default.js');
const { _fs } = require('./utils/fsHandle.js');

const getDir = (directory) => ({
	inDir: dirPath(directory, 'in'),
	outDir: dirPath(directory, 'out'),
	testDir: dirPath(directory, 'test'),
});

const makeDir = ({ inDir, outDir, testDir }) => {
	_fs.dir.md(inDir);
	_fs.dir.md(outDir);
	_fs.dir.md(testDir);
};

const geneOptions = {
	f: {
		name: 'f',
		desc: 'Full (includes: "sol.cpp, test.inp, in, out")',
		setup: (directory, name) => {
			const allDir = ({ inDir, outDir, testDir } = getDir(directory));
			makeDir(allDir);

			_fs.f.write(dirPath(directory, `sol.cpp`), cppDefault('sol'));

			// in dir
			_fs.f.write(dirPath(inDir, `${name}.INP`), defaultMes);
			for (let i = 1; i <= 3; i++)
				_fs.f.write(dirPath(inDir, `in${i}`), defaultMes);

			// out dir
			_fs.f.write(dirPath(outDir, `${name}.OUT`), defaultMes);
			_fs.f.write(dirPath(outDir, `out`), defaultMes);

			// test dir
			_fs.f.write(
				dirPath(testDir, `brute.cpp`),
				cppDefault('brute', { type: 'brute' })
			);
			_fs.f.write(
				dirPath(testDir, `gen.cpp`),
				cppDefault('gen', { type: 'gen' })
			);
		},
	},
	io: {
		name: 'io',
		desc: 'IO (includes: ".INP, .OUT")',
		setup: (directory, name) => {
			const allDir = ({ inDir, outDir } = getDir(directory));
			makeDir(allDir);

			_fs.f.write(dirPath(inDir, `${name}.INP`), defaultMes);
			_fs.f.write(dirPath(outDir, `${name}.OUT`), defaultMes);
		},
	},
	m: {
		name: 'm',
		desc: 'Minimal (includes: "sol.cpp")',
		setup: (directory, name) => {
			_fs.f.write(dirPath(directory, `sol.cpp`), cppDefault('sol'));
		},
	},
	ct: {
		name: 'ct',
		desc: 'File for testing (includes: "brute.cpp, gene.cpp")',
		setup: (directory, name) => {
			const allDir = ({ inDir, outDir, testDir } = getDir(directory));
			makeDir(allDir);

			// in , out
			_fs.f.write(dirPath(inDir, `${name}.INP`), defaultMes);
			_fs.f.write(dirPath(outDir, `${name}.OUT`), defaultMes);

			// test
			_fs.f.write(
				dirPath(testDir, `brute.cpp`),
				cppDefault('brute', { type: 'brute' })
			);
			_fs.f.write(
				dirPath(testDir, `gen.cpp`),
				cppDefault('gen', { type: 'gen' })
			);
		},
	},
};

module.exports = geneOptions;
