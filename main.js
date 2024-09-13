/*
    NOTES:
        -you do not have to specify co-star/no co-star, it automatically gets the leaderboard 
        of best times only regardless of mode: based on character filter
*/

const { argv } = require('./args');
const { SMG1, CAT_NAME_TO_ID, formatISO8601Duration, arrayToCSV, writeCSVToFile, CAT_ANY, CHAR_NAME_TO_ID_ANY, CHARACTER_ANY, CAT_120, CHARACTER_120, CHAR_NAME_TO_ID_120 } = require('./utils');
const SRC_BASE_URL = 'https://www.speedrun.com/api/v1';
const CATEGORY_NAME = argv.category.toLowerCase();
const CHARACTER_NAME = argv.character.toLowerCase();
const SMG1_LB_URL = `${SRC_BASE_URL}/leaderboards/${SMG1}/category/${CAT_NAME_TO_ID[CATEGORY_NAME]}`;


/*
    gets entire leaderboard data for category
*/
async function fetchLbData(endpoint, params) {
    
    const queryString = new URLSearchParams(params).toString();

    const url = `${endpoint}?${queryString}`;

    console.log("Retrieving leaderboard...");
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}\nInvalid response from speedrun.com\n
            If you think this problem is not caused by speedrun.com contact HardcoreGaming on Discord or open an issue on Github`);
        }
        const res = await response.json();
        return res;
        
    } catch (error) {
        console.error("\nError fetching leaderboard data: Did you set the characters and category correctly?")
        console.error(`You set character: ${argv.character}, category: ${argv.category}`);
        console.error("Values allowed are (case-insensitive): [character]=(mario, luigi), [category]=(any, 120, 242)");
        console.error("If you did set them correctly, the issue might be with speedrun.com or your internet connection.");
        process.exit(1);
    }
}

/*
    returns array of objects {username: time} for specified category
    represents leaderboard
*/
async function getLbDataReduced(endpoint, params) {
    let lb = [];
    const res = await fetchLbData(endpoint, params);
    let playerIndex = 0;
    let unknownPlayers = false;
    if (res && res.data && res.data.runs) {
        for(const pos of res.data.runs){
            let usernameLocation = null;

            try{
                usernameLocation = res.data.players.data[playerIndex].names.international;
            } catch(error){
                unknownPlayers = true;
            }
            
            const username = usernameLocation == null ? "unknown player" : usernameLocation;
            lb.push([username, formatISO8601Duration(pos.run.times.primary)])
            playerIndex++;
        };
    }

    if(unknownPlayers){
        console.log("Some players will be marked as \"unknown\" because they might have deleted their speedrun.com account.")
    }

    return lb;
}

async function run(endpoint, params){
    const lb = await getLbDataReduced(endpoint, params);
    const csvContent = arrayToCSV(lb);
    writeCSVToFile("leaderboard.csv", csvContent);
}


function generateQueryParameters(){
    let params = {embed: "players"};
    const categoryId = CAT_NAME_TO_ID[CATEGORY_NAME];

    if(categoryId === CAT_ANY){
        params[CHARACTER_ANY] = CHAR_NAME_TO_ID_ANY[CHARACTER_NAME];
    }
    else if(categoryId === CAT_120){
        params[CHARACTER_120] = CHAR_NAME_TO_ID_120[CHARACTER_NAME]
    }

    return params;
}

let params = generateQueryParameters();
run(SMG1_LB_URL, params);
