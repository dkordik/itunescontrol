#!/usr/bin/env osascript

on run song_id
	tell application "iTunes"
		play (every track of first library playlist whose database ID is song_id)
	end tell
end run