
var NoteDispenser = function (availableDenominations) {
	this._availableDenominations = availableDenominations;
};

NoteDispenser.prototype.calculate = function (amount) {

	var result = this._calc(this._availableDenominations, amount);

	if (!result) {
		throw new Error('Amount can not be dispensed.');
	}

	return result;
};

NoteDispenser.prototype._calc = function (availableDenominations, amount) {
	if (!availableDenominations.length) {
		return (amount ? null : {}); // no amount left - success
	}
	var currentDenom = availableDenominations[0];

	var noteCount = Math.min(Math.floor(amount / currentDenom.value), currentDenom.count);
	while (noteCount > 0) {
		var result = this._calc(availableDenominations.slice(1), amount - (noteCount * currentDenom.value));
		if (result) {
			result[currentDenom.value + '_dollar_notes'] = noteCount;
			return result;
		}

		noteCount--;
	};

	return this._calc(availableDenominations.slice(1), amount);
};

module.exports = NoteDispenser;
