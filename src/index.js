#! /usr/bin/env node
const inquirer = require('inquirer');
const { program } = require('commander');
const templates = require('./templates');
const genOpts = require('./geneOptions');
const extraOpts = require('./extraOptions');
const { cppDefault, dirPath } = require('./utils/default');
const { _fs } = require('./utils/fsHandle');

program
	.option('-y', `No anything else`)
	.option('-nf, --no-folder-inside', `No folder inside`)
	.option('-p, --path <path>', `Folder's directory`)
	.option('-n, --name <name>', `Folder's name`)
	.option('-tp, --custom-template <file>', 'Use custom template')
	.option('-t, --template <template>', 'Gene with templates')
	.option('-o, --option <option>', 'Gene with options')
	.showHelpAfterError('( Add --help for additional information )')
	.parse();

const cmdOpts = program.opts();
const defaultPath = () => process.cwd();

console.log(cmdOpts);

let path = cmdOpts.path || null;
let name = cmdOpts.name || null;
let noFolderIn = !cmdOpts.folderInside || null;
let genUseTp = cmdOpts.customTemplate || null;
let genOpt = cmdOpts.option || null;
let genFromTp = cmdOpts.template || null;
let genFinish = cmdOpts.y || 0;

(async () => {
	// Config path & folder's name
	if (path == null) {
		path = genFinish
			? defaultPath()
			: (
					await inquirer.prompt({
						name: 'path',
						type: 'input',
						message: `Folder's directory`,
						default: defaultPath(),
					})
			  ).path;
	}
	if (name == null) {
		name = (
			await inquirer.prompt({
				name: 'name',
				type: 'input',
				message: `Folder's name`,
				default: 'new-folder',
			})
		).name;
	}
	const directory = dirPath(path, name);
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
			? 0
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
	if (genFromTp == null) {
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
	templates[templateId].initial(directory, name, noFolderIn);

	// Config gene options
	if (genOpt == null) {
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
	for (const key in genOpts)
		(key == genOpt || genOpts[key].desc === genOpt) &&
			genOpts[key].setup(directory, name, noFolderIn);

	// Config gene use custom template
	if (genUseTp === null) {
		genUseTp = genFinish
			? ''
			: (
					await inquirer.prompt({
						name: 'genUseTp',
						type: 'input',
						message: 'Gene from custom template ?',
					})
			  ).genUseTp;
	}
	if (!!genUseTp) {
		const tpDir = dirPath(path, `${genUseTp}.cpp`);

		if (!_fs.dir.exist(tpDir))
			_fs.f.write(tpDir, cppDefault(genUseTp, noFolderIn));
		_fs.f.copy(tpDir, dirPath(path, name, `${name}.cpp`));
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
			extras.includes(val.desc) && val.setup(directory, name, noFolderIn);
		});
	}

	// End Process
	console.log(`\nAll things done!`);
})();

/**** Helpful Inquirer Plugins
	- autocomplete
	- inquirer-fuzzy-path
	- inquirer-search-checkbox
	- inquirer-search-list
	- inquirer-tree-prompt

	* Test commands
	node src --path C:\\Users\\Admin\\Desktop\\test --name test_1 --template fs --option f -y
	node src -p C:\\Users\\Admin\\Desktop\\test -n test_1 -tp tplate -t fs -o f -y
****/
