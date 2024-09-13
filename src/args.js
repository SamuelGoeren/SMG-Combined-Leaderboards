const yargs = require('yargs');

const argv = yargs
  .option('character', {
    alias: 'c',
    description: 'Specify the character',
    type: 'string',
    demandOption: true,
  })
  .option('category', {
    alias: 'cat',
    description: 'Specify the category',
    type: 'string',
    demandOption: true,
  })
  .option('filename', {
    alias: 'f',
    description: "Specify the name of the output CSV file",
    type: "string",
    demandOption: true,
  })
  .help()
  .alias('help', 'h')
  .argv;

module.exports = {
    argv
}