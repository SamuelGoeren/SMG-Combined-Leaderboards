const path = require('path');
const fs = require('fs');

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
    console.log(`CSV file written to ${filePath}`);
}

module.exports = {
    formatISO8601Duration,
    arrayToCSV,
    writeCSVToFile
};
