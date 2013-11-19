#!/usr/bin/env osascript

on run arg
	tell application "iTunes"
		set results to (search playlist "Library" for arg)
		
		set serialized to {}
		
		repeat with result in results
			set serialized to serialized & {"{TRACK}", database ID of result, name of result, track number of result, artist of result, album artist of result, album of result, year of result, duration of result}
		end repeat
		
		return serialized
	end tell
end run