var express = require('express');

var dispenseHandler = require('./dispense-handler');

var app = express();

app.get('/dispense', function (req, res) {
	try {
		res.send(dispenseHandler(req.query));
	} catch (e) {
		console.log(e);
		res.send({Error: e + ""});
	}
});

app.get('*', function (req, res) {
	res.send(404);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Note dispenser listening at http://%s:%s/dispense', host, port);
});
