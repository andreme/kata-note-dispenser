var assert = require("assert");
var expect = require('chai').expect;

var dispenseHandler = require('../dispense-handler');

describe('/dispense', function () {
	it('returns error when invalid denomination count is given', function () {
		expect(function () {
			dispenseHandler({amount: 1, '20_dollar_notes': -1});
		}).to.throw(/Note count invalid/);
		expect(function () {
			dispenseHandler({amount: 1, '20_dollar_notes': 'a'});
		}).to.throw(/Note count invalid/);
	});

	it('returns error when invalid amount is given', function () {
		expect(function () {
			dispenseHandler({amount: -1});
		}).to.throw(/No amount to dispense given/);
		expect(function () {
			dispenseHandler({amount: 'b'});
		}).to.throw(/No amount to dispense given/);
	});

	it('returns 1 for a denomination when amount equals denomination', function () {
		expect(dispenseHandler({amount: 20, '20_dollar_notes': 1})).to.have.property('20_dollar_notes', 1);
		expect(dispenseHandler({amount: 50, '50_dollar_notes': 1})).to.have.property('50_dollar_notes', 1);
	});

	it('returns error when amount can not be dispensed', function () {
		expect(function () {
			dispenseHandler({amount: 20, '20_dollar_notes': 0});
		}).to.throw(/Amount can not be dispensed/);
		expect(function () {
			dispenseHandler({amount: 40, '20_dollar_notes': 1});
		}).to.throw(/Amount can not be dispensed/);
		expect(function () {
			dispenseHandler({amount: 50, '50_dollar_notes': 0});
		}).to.throw(/Amount can not be dispensed/);
		expect(function () {
			dispenseHandler({amount: 100, '50_dollar_notes': 1});
		}).to.throw(/Amount can not be dispensed/);
	});

	it('returns 2 for a denomination when amount equals double the denomination', function () {
		expect(dispenseHandler({amount: 40, '20_dollar_notes': 2})).to.have.property('20_dollar_notes', 2);
		expect(dispenseHandler({amount: 100, '50_dollar_notes': 2})).to.have.property('50_dollar_notes', 2);
	});

	it('returns only required denominations for amount', function () {
		expect(dispenseHandler({amount: 20, '20_dollar_notes': 2})).to.have.property('20_dollar_notes', 1);
		expect(dispenseHandler({amount: 50, '50_dollar_notes': 2})).to.have.property('50_dollar_notes', 1);
	});

	it('returns mixed denominations', function () {
		var result = dispenseHandler({amount: 70, '20_dollar_notes': 1, '50_dollar_notes': 1});
		expect(result).to.have.property('20_dollar_notes', 1);
		expect(result).to.have.property('50_dollar_notes', 1);
	});

	it('returns the smaller denomination when using the bigger denomination would make the amount not dispensable', function () {
		var result = dispenseHandler({amount: 60, '20_dollar_notes': 3, '50_dollar_notes': 1});
		expect(result).to.have.property('20_dollar_notes', 3);
		expect(result).to.satisfy(function (res) {
			return ((res['50_dollar_notes'] === undefined) || (res['50_dollar_notes'] === 0));
		});
	});

	it('works for special cases', function () {
		dispenseHandler({amount: 20, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 40, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 50, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 70, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 80, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 100, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 150, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 60, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 110, '20_dollar_notes': 10, '50_dollar_notes': 10});
		dispenseHandler({amount: 200, '20_dollar_notes': 8, '50_dollar_notes': 3});
	});
});
