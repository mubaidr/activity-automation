/**
 * Not so secret options
 */
const options = require('./options')

module.exports = {
  options: {
    ...options,
    iss: 'ors-node'
  }
}
