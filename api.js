/*
    NOTES:
        -you do not have to specify co-star/no co-star, it automatically gets the leaderboard 
        of best times only regardless of mode: based on character filter
*/

const { formatISO8601Duration } = require('./utils');

//SRC's internal ID's for various parameters
const CHARACTER = 'var-kn0m3zl3';
const MARIO = '4lxrr2l2';
const LUIGI = '814880ld'

const MODE = 'var-r0nwg08q';
const COSTAR = 'g0q5n2qp';
const NOCOSTAR = 'y4lxp4q2';

const SMG1 = 'pd0wg21e';
const ANY = 'zd365vdn';

const SRC_BASE_URL = 'https://www.speedrun.com/api/v1';
const SMG1_LB_ANY_URL = `${SRC_BASE_URL}/leaderboards/${SMG1}/category/${ANY}`;


/*
    gets entire leaderboard data for category
*/
async function fetchLbData(endpoint, params) {
    
    const queryString = new URLSearchParams(params).toString();

    const url = `${endpoint}?${queryString}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const res = await response.json();
        return res;
        
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error('Error fetching leaderboard data:', error);
    }
}

/*
    returns array of objects {username: time} for specified category
    represents leaderboard
*/
async function getLbDataReduced(endpoint, params) {
    let lb = [];
    
    const res = await fetchLbData(endpoint, params);
    //res.data.players.data
    let playerIndex = 0;
    if (res && res.data && res.data.runs) {
        for(const pos of res.data.runs){
            let usernameLocation = null;
            try{
                usernameLocation = res.data.players.data[playerIndex].names.international;
            } catch(error){
            }
            
            const username = usernameLocation == null ? "unknown player" : usernameLocation;
            lb.push([username, formatISO8601Duration(pos.run.times.primary)])
            playerIndex++;
        };
    }
    return lb;
}

async function print(endpoint, params){
    const lb = await getLbDataReduced(endpoint, params);
    console.log(lb);
}
let params = {[CHARACTER]: LUIGI, embed: "players", top: 100}
print(SMG1_LB_ANY_URL, params)
