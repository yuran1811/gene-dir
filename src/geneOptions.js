const { defaultMes, cppDefault, dirPath } = require('./utils/default.js');
const { _fs } = require('./utils/fsHandle.js');

const getDir = (directory, aio) => ({
	inDir: aio ? directory : dirPath(directory, 'in'),
	outDir: aio ? directory : dirPath(directory, 'out'),
	testDir: aio ? directory : dirPath(directory, 'test'),
});

const makeDir = (dir) => {
	for (const key in dir) _fs.dir.md(dir[key]);
};

const geneOptions = {
	f: {
		name: 'f',
		desc: 'Full (includes: "sol.cpp, test.inp, in, out")',
		setup: (directory, name, aio = 0) => {
			const { inDir, outDir, testDir } = getDir(directory, aio);
			makeDir({ inDir, outDir, testDir });

			_fs.f.write(dirPath(directory, `sol.cpp`), cppDefault('sol', aio));

			// in dir
			_fs.f.write(dirPath(inDir, `${name}.INP`), defaultMes);
			for (let i = 0; i <= 3; i++)
				_fs.f.write(dirPath(inDir, `in${i ? i : ''}`), defaultMes);

			// out dir
			_fs.f.write(dirPath(outDir, `${name}.OUT`), defaultMes);
			_fs.f.write(dirPath(outDir, `out`), defaultMes);

			// test dir
			_fs.f.write(
				dirPath(testDir, `brute.cpp`),
				cppDefault('brute', aio, { type: 'brute' })
			);
			_fs.f.write(
				dirPath(testDir, `gen.cpp`),
				cppDefault('gen', aio, { type: 'gen' })
			);
		},
	},
	io: {
		name: 'io',
		desc: 'IO (includes: ".INP, .OUT")',
		setup: (directory, name, aio = 0) => {
			const { inDir, outDir } = getDir(directory, aio);
			makeDir({ inDir, outDir });

			_fs.f.write(dirPath(inDir, `${name}.INP`), defaultMes);
			_fs.f.write(dirPath(outDir, `${name}.OUT`), defaultMes);
		},
	},
	ct: {
		name: 'ct',
		desc: 'File for testing (includes: "brute.cpp, gen.cpp")',
		setup: (directory, name, aio = 0) => {
			const { inDir, outDir, testDir } = getDir(directory, aio);
			makeDir({ inDir, outDir, testDir });

			_fs.f.write(dirPath(directory, `sol.cpp`), cppDefault('sol', aio));

			// in , out
			_fs.f.write(dirPath(inDir, `${name}.INP`), defaultMes);
			_fs.f.write(dirPath(outDir, `${name}.OUT`), defaultMes);

			// test
			_fs.f.write(
				dirPath(testDir, `brute.cpp`),
				cppDefault('brute', aio, { type: 'brute' })
			);
			_fs.f.write(
				dirPath(testDir, `gen.cpp`),
				cppDefault('gen', aio, { type: 'gen' })
			);
		},
	},
};

module.exports = geneOptions;
