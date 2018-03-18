const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
};

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions
	})
	.command('delete', 'Delete a note', {
		title: titleOptions
	})
	.help()
	.argv;

var command = argv._[0];

switch (command) {
	case 'add':
		notes.addNote(argv.title, argv.body);
		break;
	case 'list':
		notes.getAll();
		break;
	case 'read':
		notes.getNote(argv.title);
		break;
	case 'delete':
		notes.removeNote(argv.title);
		break;
	default:
		console.log('Command not recognized...');
}