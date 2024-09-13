Readme will be updated for non-technical users soon. I have to go to bed now.

This program basically gets you a combined Co-Star/No Co-Star (1p/2p)
leaderboard for any category.

If you're more experienced here a quick rundown:

Make sure to have nodejs installed.
Clone the repository, then run 

`npm install`

`node .\main.js --character [CHARACTER] --category [CATEGORY]`

Where [CHARACTER] is either Mario or Luigi and [CATEGORY] is either any, 120 or 242.
Note that while 242 does not have different characters, you can't leave the parameter out as of now.
The leaderboard will generate correctly either way, but you still must set it as Mario or Luigi.

You will get an output file leaderboard.csv which you can then import in Excel, Google Sheets etc.

(WIP):
  -exe file and easily configurable config
  -more values than just runner and time (date, mode)
