
var NoteDispenser = function (_20_dollar_notes, _50_dollar_notes) {
	this._20_dollar_notes = _20_dollar_notes;
	this._50_dollar_notes = _50_dollar_notes;
};

NoteDispenser.prototype.calculate = function (amount) {
	var amountLeft = amount;
	var result = {};

	var fiftiesCount = Math.min(Math.floor(amountLeft / 50), this._50_dollar_notes);
	do {
		result['50_dollar_notes'] = fiftiesCount;
		fiftiesCount--;
		var amountLeftOverDivideableBy20 = ((amountLeft - (result['50_dollar_notes'] * 50)) % 20 !== 0);
	} while ((result['50_dollar_notes'] > 0) && amountLeftOverDivideableBy20);
	amountLeft -= (result['50_dollar_notes'] * 50);

	result['20_dollar_notes'] = Math.min(Math.floor(amountLeft / 20), this._20_dollar_notes);
	amountLeft -= (result['20_dollar_notes'] * 20);

	if (amountLeft) {
		throw new Error('Amount can not be dispensed.');
	}

	return result;
};

module.exports = NoteDispenser;
