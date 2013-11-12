itunescontrol
=================

Search and play tracks from local iTunes library.

###Requires
- Mac OS (wraps AppleScript)
- Local copy of iTunes


###Install
```shell
npm install itunescontrol
```

###Usage
```javascript
iTunesControl = require("itunescontrol");

iTunesControl.search("radiohead kid a right place", function (results) {

	console.log("RESULTS!", results);

	iTunesControl.play(results[0].id);

});
```