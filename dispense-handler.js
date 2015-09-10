
var NoteDispenser = require('./note-dispenser');

function dispenseHandler(query) {

	var note_20_count = parseInt(query['20_dollar_notes'] || 0, 10);
	var note_50_count = parseInt(query['50_dollar_notes'] || 0, 10);
	var amount = parseInt(query['amount'], 10);

	if (isNaN(amount) || (amount < 1)) {
		throw new Error('No amount to dispense given.');
	}

	if (isNaN(note_20_count) || (note_20_count < 0) || isNaN(note_50_count) || (note_50_count < 0)) {
		throw new Error('Note count invalid.');
	}

	var nd = new NoteDispenser(note_20_count, note_50_count);
	return nd.calculate(amount);
}

module.exports = dispenseHandler;
