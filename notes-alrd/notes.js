const fs = require('fs');

// fetchNotes(), saveNotes(), printNote() are utility functions
var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (err) {
		console.log(err);
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));

};

var printNote = (note) => {
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}


// command 'add': add new note
var addNote = (title, body) => {
	console.log('[--- Adding Note ---]')
	
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) =>  note.title === title);
	
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		console.log('[√] Note Created!');
		printNote(note);
		return note;
	} else {
		console.log('[×] Note Title Already in Use...');
	}
};

// command 'list': list all notes
var getAll = () => {
	console.log('[--- Getting All Notes ---]');
	var notes = fetchNotes();
	console.log(`[√] Printing ${notes.length} Note(s):`);
	notes.forEach((note) => printNote(note));
}

// command 'read': get single note by title
var getNote = (title) => {
	console.log('[--- Getting Note ---]');

	var notes = fetchNotes();
	var noteToRead = notes.filter((note) =>  note.title === title);

	if (noteToRead.length !== 0) {
		console.log('[!] Find Note:');
		printNote(noteToRead[0]);
	} else {
		console.log('[×] Note Dosen\'t Exist...');
	}
}

// command 'delete': delete single note by title
var removeNote = (title) => {
	console.log('[--- Removing Note ---]');
	
	var notes = fetchNotes();
	var noteToRemove = notes.filter((note) =>  note.title === title);
	
	if (noteToRemove.length !== 0) {
		console.log('[!] Find Note:');
		printNote(noteToRemove[0]);
		notes = notes.filter((note) =>  note.title !== title);
		saveNotes(notes);
		console.log('[√] Note Removed!')
	} else {
		console.log('[×] Note Dosen\'t Exist...');
	}
}


module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};