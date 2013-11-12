#!/usr/bin/env osascript

on run song_id
	tell application "iTunes"
		play (every track of playlist "Library" whose database ID is song_id)
	end tell
end run