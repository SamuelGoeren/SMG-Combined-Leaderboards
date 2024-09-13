const path = require('path');
const fs = require('fs');

//SRC's internal ID's for various parameters
const CHARACTER_ANY = 'var-kn0m3zl3';
const CHAR_MARIO_ANY = '4lxrr2l2';
const CHAR_LUIGI_ANY = '814880ld';

const CHARACTER_120 = 'var-ql61m789';
const CHAR_MARIO_120 = 'z1966014';
const CHAR_LUIGI_120 = 'p12rr7lx';

const SMG1 = 'pd0wg21e';
const CAT_ANY = 'zd365vdn';
const CAT_120 = 'rklq0n2n';
const CAT_242 = 'wkplz02r';

const CAT_NAME_TO_ID = {
    'any' : CAT_ANY,
    '120' : CAT_120,
    '242' : CAT_242,
}

const CHAR_NAME_TO_ID_ANY = {
    'mario' : CHAR_MARIO_ANY,
    'luigi' : CHAR_LUIGI_ANY
}

const CHAR_NAME_TO_ID_120 = {
    'mario' : CHAR_MARIO_120,
    'luigi' : CHAR_LUIGI_120
}

//modes do not need to be specified because we want combined lbs
//but we need them to display in the output csv file
const MODE = 'r0nwg08q';
const COSTAR = 'g0q5n2qp';
const NOCOSTAR = 'y4lxp4q2';

const MODE_ID_TO_NAME = {
    [COSTAR] : 'Co-Star',
    [NOCOSTAR] : "No Co-Star"
}

/**
 * Converts an ISO 8601 duration string to a readable format (hh:mm:ss[.SSS]).
 * @param {string} duration - The ISO 8601 duration string (e.g., PT2H34M55.730S).
 * @returns {string} The formatted time string.
 */
function formatISO8601Duration(duration) {
    // Regex to capture hours, minutes, seconds, and optional milliseconds
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d+))?S)?/;
    const matches = duration.match(regex);

    if (!matches) {
        throw new Error("Invalid ISO 8601 duration format");
    }

    // Extract hours, minutes, seconds, and milliseconds (if they exist)
    const hours = parseInt(matches[1] || 0, 10);
    const minutes = parseInt(matches[2] || 0, 10);
    const seconds = parseInt(matches[3] || 0, 10);
    const milliseconds = matches[4] ? parseInt(matches[4].padEnd(3, '0'), 10) : null;

    // Format the values as hh:mm:ss (pad hours, minutes, seconds with leading zeros if necessary)
    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    ].join(':');

    // Append milliseconds only if they are present
    return milliseconds !== null ? `${formattedTime}.${milliseconds}` : formattedTime;
}

/**
 * Converts an array of arrays to a CSV formatted string.
 * @param {Array<Array<any>>} array - The array of arrays to convert to CSV.
 * @returns {string} The CSV formatted string.
 */
function arrayToCSV(array) {
    console.log("Creating CSV output file...");
    return array.map(row => 
        row.map(cell => 
            // Escape quotes and commas and wrap in double quotes
            `"${String(cell).replace(/"/g, '""')}"`
        ).join(',')
    ).join('\n');
}

/**
 * Writes a CSV formatted string to a file.
 * @param {string} filename - The name of the file to write.
 * @param {string} csvContent - The CSV formatted string.
 */
function writeCSVToFile(filename, csvContent) {
    const filePath = path.join(__dirname, filename);
    fs.writeFileSync(filePath, csvContent, 'utf8');
    console.log(`Done! CSV file written to ${filePath}`);
}

module.exports = {
    formatISO8601Duration,
    arrayToCSV,
    writeCSVToFile,
    SMG1,
    CHARACTER_ANY,
    CHARACTER_120,
    CAT_ANY,
    CAT_120,
    CAT_242,
    CHAR_LUIGI_120,
    CHAR_MARIO_120,
    CHAR_MARIO_ANY,
    CHAR_LUIGI_ANY,
    CAT_NAME_TO_ID,
    CHAR_NAME_TO_ID_120,
    CHAR_NAME_TO_ID_ANY,
    MODE,
    MODE_ID_TO_NAME,
    COSTAR,
    NOCOSTAR
}
