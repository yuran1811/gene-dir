#! /usr/bin/env node

const inquirer = require('inquirer');
const { program } = require('commander');
const templates = require('./templates');
const genOpts = require('./geneOptions');
const extraOpts = require('./extraOptions');
const { cppDefault, dirPath } = require('./utils/default.js');
const { _fs } = require('./utils/fsHandle.js');

program
	.option('-nf', `no folder inside`)
	.option('-n <name>', `Folder's name`)
	.option('-tp, <file>', 'Use custom template')
	.option('-o, <option>', 'Gene with options')
	.option('-t, <template>', 'Gene with templates')
	.option('-y', 'Finish');
program.parse();

const cmdOpts = program.opts();

let name = cmdOpts.n || '';
let noFolderIn = cmdOpts.Nf || null;
let genUseTp = cmdOpts.Tp || null;
let genOpt = cmdOpts.o || '';
let genFromTp = cmdOpts.t || '';
let genFinish = cmdOpts.y || 0;

(async () => {
	// Config folder's name
	if (!name) {
		name = (
			await inquirer.prompt({
				name: 'name',
				type: 'input',
				message: `Folder's name`,
				default: 'new-folder',
			})
		).name;
	}

	const directory = dirPath(process.cwd(), name);

	if (_fs.dir.exist(directory) && _fs.dir.read(directory).length > 0) {
		const { rmFile } = await inquirer.prompt({
			name: 'rmFile',
			type: 'confirm',
			message:
				'Directory is not empty. Remove existing files and continue?',
		});

		if (rmFile) _fs.dir.rd(directory);
		else process.exit(1);
	}
	if (!_fs.dir.exist(directory)) _fs.dir.md(directory);

	// Confirm all files are in root folder
	if (noFolderIn === null) {
		noFolderIn = genFinish
			? 1
			: (
					await inquirer.prompt({
						name: 'noFolderIn',
						type: 'confirm',
						message: `Are all files in the root folder ?`,
						default: false,
					})
			  ).noFolderIn;
	}

	// Config template
	if (!genFromTp) {
		genFromTp = (
			await inquirer.prompt({
				name: 'genFromTp',
				type: 'list',
				message: 'Choose a template:',
				choices: Object.values(templates).map((_) => _.desc),
			})
		).genFromTp;
	}
	const templateId = Object.entries(templates).find(
		([key, val]) => genFromTp == key || val.desc === genFromTp
	)[0];
	templates[templateId].initial(directory, name);

	// Config gene options
	if (!genOpt) {
		genOpt = (
			await inquirer.prompt({
				name: 'genOpt',
				type: 'list',
				loop: true,
				message: 'Choose one of these options',
				choices: Object.values(genOpts).map((_) => _.desc),
			})
		).genOpt;
	}
	Object.entries(genOpts).forEach(([key, val]) => {
		(genOpt == key || val.desc === genOpt) &&
			val.setup(directory, name, noFolderIn);
	});

	// Config gene use custom template
	if (genUseTp === null) {
		genUseTp = (
			await inquirer.prompt({
				name: 'genUseTp',
				type: 'input',
				message: 'Gene from custom template ?',
			})
		).genUseTp;
	}

	if (!!genUseTp) {
		const tpDir = dirPath(process.cwd(), `${genUseTp}.cpp`);

		if (!_fs.dir.exist(tpDir)) _fs.f.write(tpDir, cppDefault(genUseTp));

		_fs.f.copy(tpDir, dirPath(process.cwd(), name, `${name}.cpp`));
	}

	// Extra Options
	if (!genFinish) {
		const { extras } = await inquirer.prompt({
			name: 'extras',
			type: 'checkbox',
			message: 'Gene extra files',
			choices: Object.entries(extraOpts).map(([key, val]) => val.desc),
		});
		Object.entries(extraOpts).forEach(([key, val]) => {
			extras.includes(val.desc) && val.setup(directory, name);
		});
	}

	console.log(`\nSuccessfully!`);
})();
