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

// Export the function for use in other files
module.exports = {
    formatISO8601Duration
};
