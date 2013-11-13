#!/usr/bin/env node

iTunesControl = require("./index.js");

iTunesControl.search(process.argv[2] || "radiohead kid a right place", function (results) {

	if (results.length > 0) {
		console.log("RESULTS!", results);
		iTunesControl.play(results[0].id);
	} else {
		console.log("No results.");
	}

});