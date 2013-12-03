#!/usr/bin/env node

var applescript = require("applescript");

//this should mirror order of fields in itunes-search.applescript
var FIELDMAP = [ "id", "name", "track number", "artist", "album artist", "album", "year", "duration", "album rating" ];

var search = function (query, callback) {
	applescript.execFile(__dirname + "/itunes-search.applescript", [ query ], function (err, raw) {
		if (err) {
			console.error(err);
			return;
		}

		if (!raw || raw.length == 0) {
			callback([]);
			return;
		}

		//7 = ----- + {TRACK}
		var pipetracks = raw.join("     ").substring(7).split("{TRACK}");

		var results = [];
		pipetracks.forEach(function (pipetrack) {
			var result = {};
			pipetrack.trim().split("     ").forEach(function (field, i) {
				result[FIELDMAP[i]] = field;
			})
			results.push(result);
		})

		callback(results);
	});
}

var play = function (id) {
	applescript.execFile(__dirname + "/itunes-play.applescript", [ id ], function (err, stdout) {
		if (err) {
			console.error(err);
		} else {
			console.log(stdout);
		}
	});
}

module.exports = {
	search: search,
	play: play
};

/* ALL FIELDS AVAILABLE:
{
	class: file track,
	id: 198114,
	index: 65014,
	name: "Witch Hunt",
	persistent ID: "5062EB2DD8B56B65",
	database ID: 121618,
	date added: date "Saturday,	June 18, 2011 at 1: 39: 08 PM",
	time: "1: 46",
	duration: 106.656997680664,
	artist: "Zomby",
	album artist: "",
	composer: "",
	album: "Dedication",
	genre: "Bass",
	bit rate: 301,
	sample rate: 44100,
	track count: 16,
	track number: 1,
	disc count: 0,
	disc number: 0,
	size: 4018194,
	volume adjustment: 0,
	year: 2011,
	comment: "",
	EQ: "",
	kind: "MPEG audio file",
	video kind: none,
	modification date: date "Thursday, December 13,	2012 at 9: 49: 48 PM",
	enabled: true,
	start: 0.0,
	finish: 106.656997680664,
	played count: 3,
	played date: date "Wednesday, September 21, 2011 at 10: 27: 32 PM",
	skipped count: 0,
	skipped date: missing value,
	compilation: false,
	gapless: missing value,
	rating: 80,
	bpm: 0,
	grouping: "",
	podcast: false,
	iTunesU: false,
	bookmarkable: false,
	bookmark: 0.0,
	shufflable: true,
	lyrics: "",
	category: "",
	description: "",
	long description: missing value,
	show: "",
	season number: 0,
	episode ID: "",
	episode number: 0,
	unplayed: false,
	sort name: "",
	sort album: "",
	sort artist: "",
	sort composer: "",
	sort album artist: "",
	sort show: "",
	release date: missing value
}
*/