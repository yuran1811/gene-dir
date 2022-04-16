#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { program } = require('commander');
const templates = require('./templates');
const genOpts = require('./geneOptions');
const { cppDefault, dirPath } = require('./utils/default.js');

program
	.option('-n <name>', `Folder's name`)
	.option('-t', 'Use custom template')
	.option('-o, <option>', 'Gene with options');
program.parse();

const cmdOpts = program.opts();

let name = cmdOpts.n || '';
let genTp = cmdOpts.t || null;
let genOpt = cmdOpts.o || '';
let template;

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

	// If directory is not empty => clear all items
	if (fs.existsSync(directory) && fs.readdirSync(directory).length > 0) {
		const { rmFile } = await inquirer.prompt({
			name: 'rmFile',
			type: 'confirm',
			message:
				'Directory is not empty. Remove existing files and continue?',
		});

		if (rmFile) {
			fs.rmSync(directory, { recursive: true, force: true });
		} else {
			process.exit(1);
		}
	}
	fs.mkdirSync(directory);

	// Config template
	if (!template) {
		template = (
			await inquirer.prompt({
				name: 'template',
				type: 'list',
				message: 'Choose a template:',
				choices: Object.values(templates).map((_) => _.name),
			})
		).template;
	}
	const templateId = Object.entries(templates).find(
		([key, val]) => val.name === template
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
		(genOpt == key || val.desc === genOpt) && val.setup(directory, name);
	});

	// Config gene use custom template
	if (genTp === null) {
		genTp = (
			await inquirer.prompt({
				name: 'genTp',
				type: 'confirm',
				message: 'Gene from custom template ?',
			})
		).genTp;
	}

	if (genTp) {
		const newDir = dirPath(__dirname, '..');
		const tpDir = dirPath(newDir, '__template.cpp');

		if (!fs.existsSync(tpDir))
			fs.writeFileSync(tpDir, cppDefault('template'));

		fs.copyFileSync(tpDir, dirPath(newDir, name, `${name}.cpp`));
	}

	console.log(`\nSuccessfully!`);
})();
