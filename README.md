# Super Mario Galaxy combined leaderboards

  Get a csv file representing a combined (Co-Star/No Co-Star) leaderboard of a specific SMG speedrun category.
  You can then import it in any sheet editor (Excel, Google Sheets etc.)

## Setup

You don't have to know anything about git. Literally get the download for the executable <a href="https://drive.google.com/file/d/1dgUnkdk3oaWY60WOtf2eX6ynry9hMvRV/view?usp=sharing" target="_blank">here</a>

## How To Use

Unzip the file and open `config.json`

You will see something like this:
<pre> {
  "filename" : "leaderboard.csv",
  "category" : "any",
  "character": "luigi",
  }
</pre>

The filename property refers to the output csv file you will get.

Simply edit the values to get the desired leaderboard.

You can set

 `category: (any, 120, 242)`
 
 `character: (mario, luigi)`

Note that the 242 leaderboard will generate correctly no matter what character you set. But do not remove the property altogether.

After that just run `run.bat` and you will get the desired file.

Make sure to not just double-click run `main.exe` because you'd need to add command-line parameters. The `run.bat`file takes care of everything.

## Explanation for usual GitHub Users

This repository is aimed at non-technical users, hence the direct download link and exe build.

Here's a quick explanation of how this application works.

I use the [speedrun.com api](https://github.com/speedruncomorg/api) to retrieve leaderboards for SMG based on the `category` and `character` parameters.

Initially there was a problem: The leaderboard api response did not include player names, only user IDs. I thought I'd have to send individual requests for each runner to get their username from ID which...would have absolutely demolished their rate limit.

Luckily adding the `&embed=players` query parameter takes care of that in a single request.

If for some reason you do not want to use the exe build and batch script (or you're not on Windows) just do the usual workflow:

```bash
#1. Clone the repository
git clone https://github.com/SamuelGoeren/SMG-Combined-Leaderboards

#2. Navigate to the source files
cd SMG-Combined-Leaderboard/src

#3. Make sure to have node installed and install dependencies
npm install

#4. Run the main.js file with command line parameters.
#The possible values are explained above.
node .\main.js --filename leaderboard.csv --character luigi --category any

#5. Enjoy your leaderboard!
```
[nodejs](https://nodejs.org/)
