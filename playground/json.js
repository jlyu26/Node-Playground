const fs = require('fs');

var origionalNote = {
	title: 'Some Title',
	body: 'Some Body'
};

var origionalNoteString = JSON.stringify(origionalNote);
fs.writeFileSync('notes.json', origionalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);